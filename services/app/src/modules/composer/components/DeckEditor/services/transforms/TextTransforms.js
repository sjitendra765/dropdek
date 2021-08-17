import { Editor, Node, Path, Range, Transforms } from "slate";
import { EditorTransforms } from "./EditorTransforms";
import ComponentService from "../../../../../../common/api/plugins/ComponentService";
import { SLIDE } from "../../modules/plugins/component/slide/type";
import { PARAGRAPH } from "../../modules/plugins/component/paragraph/type";
import { GROUP } from "../../modules/plugins/component/groups/components/group/type";

const SLIDE_PATH_INDEX = 0;
const SLIDE_PATH_COMPONENT_INDEX = 1;
const GROUP_PATH_INDEX = 2;
const GROUP_PATH_COMPONENT_INDEX = 3;

/**
 * Handle delete action at slide boundaries.
 *
 * @param backwards
 * @param currentContainer
 * @param currentContainerPath
 * @param currentElement
 * @param currentElementPath
 * @param editor
 * @param selection
 * @returns {boolean} whether or not we performed an action.
 */
const deleteInContainer = ({
  backwards,
  currentContainer,
  currentContainerPath,
  currentElementPath,
  editor,
  containerPathIndex,
  componentPathIndex,
  processBoundaryElement
}) => {

  let handled = false;

  // Calculate the path to the preceding/next slide break element.
  const [parentCollection] = currentContainerPath.length > 1 ? Editor.parent(editor, currentContainerPath) : [editor];
  const isBoundaryContainer = (backwards && currentContainerPath[containerPathIndex] === 0) ||
    (!backwards && currentContainerPath[0] === parentCollection.children.length - 1);

  const isBoundaryElementInContainer = currentElementPath.length > componentPathIndex && currentContainer && (
    (backwards && currentElementPath[componentPathIndex] === 0) ||
    (!backwards && currentElementPath[componentPathIndex] === currentContainer.children.length - 1)
  );
  if (isBoundaryElementInContainer) {
    handled = processBoundaryElement(isBoundaryContainer);
  }
  return handled;
};

/**
 * Handle delete action at slide boundaries.
 *
 * @param backwards
 * @param currentContainer
 * @param currentContainerPath
 * @param currentElement
 * @param currentElementPath
 * @param editor
 * @param selection
 * @returns {boolean} whether or not we performed an action.
 */
const deleteInSlideContainer = ({
  backwards,
  currentContainer,
  currentContainerPath,
  currentElement,
  currentElementPath,
  editor,
  selection,
}) => deleteInContainer({
  backwards,
  currentContainer,
  currentContainerPath,
  currentElementPath,
  editor,
  containerPathIndex: SLIDE_PATH_INDEX,
  componentPathIndex: SLIDE_PATH_COMPONENT_INDEX,
  processBoundaryElement: (boundaryContainer) => {
    let hasHandled = false;
    let slideBreakPath;
    if (!boundaryContainer) {
      [, slideBreakPath] = Editor.node(editor, backwards ?
        Path.previous(currentContainerPath) : Path.next(currentContainerPath));
    }

    if (EditorTransforms.isNodeEmpty(editor, currentElement)) {

      // More than 1 element on the slide:
      if (currentContainer.children.length > 1) {
        Transforms.removeNodes(editor, {
          at: selection,
          hanging: true
        });
        hasHandled = true;

        // The slide is empty so we delete it and the previous/next slide break, where applicable,
        // if there is a previous/next slide, respectively.
      } else if (slideBreakPath && Path.isPath(slideBreakPath)) {
        Editor.withoutNormalizing(editor, () => {
          // Delete the slide:
          Transforms.removeNodes(editor, {
            at: currentContainerPath,
            hanging: true
          });
        });
        return false; // not handled; continue deleting
      }
    }

    // Highlight the previous/next slide break, where applicable.
    if (!boundaryContainer) {
      if (slideBreakPath && Path.isPath(slideBreakPath)) {
        Transforms.select(editor, slideBreakPath); // Select/highlight the preceding capability element.
        hasHandled = true;
      }
    }
    return hasHandled;
  }
});

const deleteInGroupContainer = ({
  backwards,
  currentContainer,
  currentContainerPath,
  currentElement,
  currentElementPath,
  editor,
  selection,
}) => deleteInContainer({
  backwards,
  currentContainer,
  currentContainerPath,
  currentElementPath,
  editor,
  containerPathIndex: GROUP_PATH_INDEX,
  componentPathIndex: GROUP_PATH_COMPONENT_INDEX,
  processBoundaryElement: (boundaryContainer) => {
    let hasHandled = false;
    if (EditorTransforms.isNodeEmpty(editor, currentElement)) {

      // More than 1 element in the group container:
      if (currentContainer.children.length > 1) {
        Transforms.removeNodes(editor, {
          at: selection,
          hanging: true
        });
        hasHandled = true;

      // The group container is empty so we delete it
      } else {
        const [parentNode, parentPath] = Editor.node(editor, Path.parent(currentContainerPath));
        if (parentNode && parentNode.children) {
          // If this group is the only group in a collection, we delete the collection.
          if (parentNode.children.length === 1) {
            Editor.withoutNormalizing(editor, () => {
              // Delete the parent container:
              Transforms.removeNodes(editor, {
                at: parentPath,
                hanging: true
              });
            });
            hasHandled = true;
          } else if (!boundaryContainer) {
            Editor.withoutNormalizing(editor, () => {
              // Delete the container:
              Transforms.removeNodes(editor, {
                at: currentContainerPath,
                hanging: true
              });
            });
            hasHandled = true; // do not continue deleting
          }
        }
      }
    }

    return hasHandled;
  }
});

export const TextTransforms = {
  /**
   * Delete content in the editor.
   */
  delete(editor, unit, backwards) {

    const capabilityManager = ComponentService.instance();
    const { selection } = editor;
    const { anchor } = selection;
    const { offset } = anchor; // ensures we only consider offset=0 with no actual selection
    const emptySelection = Range.isCollapsed(selection); // if the user hasn't selected anything
    const [currentElement, currentElementPath] = EditorTransforms.componentElement(editor);
    // const currentElementPath = EditorTransforms.componentElementPath(editor);
    const currentElementType = currentElement !== undefined ? currentElement.type : undefined;
    const nodeValue = currentElement !== undefined && Node.isNode(currentElement) ? Node.string(currentElement) : '';
    const cursorAtBoundary = (backwards && offset === 0) || (!backwards && offset === nodeValue.length);

    // We consider what should happen when the user presses delete at the beginning of a node (offset = 0,
    // delete backwards) or the end of a node (offset = max, delete forward), with no characters selected
    // (Range.isCollapsed(selection)). Here we look at two cases:
    //
    // - Case 1: Going from a non-void node to a void node (preceding or successive sibling).
    // - Case 2: Deleting from a node at the top of a container (delete backwards) or the end of a container (delete forward).
    // - Case 3: Delete backward in an empty non-paragraph node => remove formatting if the node does not have a
    //    previous sibling of the same type.
    if (emptySelection && cursorAtBoundary && currentElement !== undefined) {

      // eslint-disable-next-line prefer-const
      let [containerAncestor, containerAncestorPath] = backwards ?
        EditorTransforms.previousContainerAncestor(editor) :
        EditorTransforms.nextContainerAncestor(editor);

      // Case 1: Current node is non-void and the previous/next node is a non-editable capability node
      // => select/highlight the previous/next node and remove the current paragraph node.
      if (
        !Editor.isVoid(editor, currentElement) &&
        containerAncestor !== undefined && capabilityManager.has(containerAncestor.type)) {

        if (editor.isVoid(containerAncestor)) {

          const emptyNode = EditorTransforms.isNodeEmpty(editor, currentElement);

          // When deleting forwards, we need to shift the index of the "next ancestor" as
          // it will go back one element, after we've deleted the current node.
          if (!backwards && emptyNode && containerAncestorPath.length === 2 && containerAncestorPath[1] > 0) {
            containerAncestorPath = [containerAncestorPath[0], containerAncestorPath[1] - 1];
          }

          Editor.withoutNormalizing(editor, () => {
            if (emptyNode) {
              Transforms.removeNodes(editor);
            }
            Transforms.select(editor, containerAncestorPath); // Select/highlight the preceding/next capability element.
          });
          return false;
        }
      }

      // Case 3 (backwards only): Current node is not a paragraph and is empty  => remove formatting if the node does not have a previous
      // sibling of the same type. The idea is that if we have a preceding sibling (of the same type) then we merge
      // the current node with that sibling node (which is the default Slate behaviour).
      if (backwards) {
        const nodeIsEmpty = EditorTransforms.isNodeEmpty(editor, currentElement);
        if (currentElementType !== PARAGRAPH && nodeIsEmpty) {
          const previousSibling = EditorTransforms.previousSibling(editor);
          if (previousSibling === undefined || !previousSibling.type || previousSibling.type !== currentElementType) {

            const currentElementParent = EditorTransforms.parentOfCurrentElement(editor);
            if (!Node.isNode(currentElementParent) || !currentElementParent.type ||
              currentElementParent.type === SLIDE) {

              // We replace the node just removed with a paragraph node.
              Editor.withoutNormalizing(editor, () => {
                Transforms.setNodes(editor, { type: PARAGRAPH }, { at: selection });
              });
            } else {
              const [start,] = Range.edges(selection);
              const parentPath = Path.parent(start.path);
              const parentSelection = {
                focus: {
                  path: parentPath,
                  offset: 0
                },
                anchor: {
                  path: parentPath,
                  offset: 0
                }
              };
              Editor.withoutNormalizing(editor, () => {
                Transforms.removeNodes(editor, { at: selection, hanging: true });
              });
              Transforms.select(editor, parentSelection);
            }
            return false;
          }
        }
      }

      // Case 2: Current node is a node at the top/bottom of a container (slide or a group) and the cursor is at a container boundary
      // (last/first position, respectively). If the element is the only node in the container, then we highlight/select
      // the preceding/next slide break (if any); if there are other elements in the container, we delete the current element.
      const [currentContainer, currentContainerPath] = EditorTransforms.currentContainer(editor);

      let handled;
      if (currentContainer) {
        if (currentContainer.type === SLIDE) {
          handled = deleteInSlideContainer({
            backwards,
            currentContainer,
            currentContainerPath,
            currentElement,
            currentElementPath,
            editor,
            selection,
          });
        } else if (currentContainer.type === GROUP) {
          handled = deleteInGroupContainer({
            backwards,
            currentContainer,
            currentContainerPath,
            currentElement,
            currentElementPath,
            editor,
            selection,
          });
        }
      }
      if (handled) {
        return false;
      }
    }
    return true;
  },

};
