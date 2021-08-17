import { Node, Path, Editor, Transforms } from "slate";
import { isPlainText } from "../deserializers/transforms/isPlainText";
import { logger } from "../../../../../../../common/util/logger";
import { PARAGRAPH } from "../component/paragraph/type";

/**
 * Ensures that all elements whose type is one of the ones listed, are always preceded and followed
 * by a text element.
 *
 * @param types types of elements we should normalize.
 */
export const withSurroundingParagraphs = (types) => (editor) => {
  const { normalizeNode } = editor;

  editor.normalizeNode = ([node, path]) => {
    // Analyse a whole slide
    if (path.length === 1) {
      for (const [currentNode, currentPath] of Node.children(editor, path)) {
        if (currentNode && currentNode.type && types.includes(currentNode.type)) {
          logger.trace(`Inspecting table element at ${currentPath}`);

          let insertLeadingParagraph = false;
          try {
            const previousSiblingPath = Path.previous(currentPath);
            insertLeadingParagraph = previousSiblingPath === undefined;
            if (previousSiblingPath) {
              const previousSibling = Node.get(editor, previousSiblingPath);
              if (!previousSibling || !isPlainText(previousSibling)) {
                insertLeadingParagraph = true;
              }
            }
          } catch (e) {
            insertLeadingParagraph = true;
          }

          let insertTrailingParagraph = false;
          try {
            const nextSiblingPath = Path.next(currentPath);
            insertTrailingParagraph = nextSiblingPath === undefined;
            if (nextSiblingPath) {
              const nextSibling = Node.get(editor, nextSiblingPath);
              if (!nextSibling || !isPlainText(nextSibling)) {
                insertTrailingParagraph = true;
              }
            }
          } catch (e) {
            insertTrailingParagraph = true;
          }

          Editor.withoutNormalizing(editor, () => {
            if (insertLeadingParagraph) {
              logger.trace(`Inserting a paragraph before table at ${currentPath}`);
              Transforms.insertNodes(editor, {
                type: PARAGRAPH,
                children: [{ text: '' }],
              }, { at: currentPath });
            }
            if (insertTrailingParagraph) {
              logger.trace(`Inserting a paragraph after table at ${currentPath}`);
              Transforms.insertNodes(editor, {
                type: PARAGRAPH,
                children: [{ text: '' }],
              }, { at: Path.next(currentPath) });
            }
          });
        }
      }
    }

    return normalizeNode([node, path]);
  };

  return editor;
};
