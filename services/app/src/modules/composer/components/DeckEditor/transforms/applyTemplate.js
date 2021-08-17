import { Editor, Transforms } from "slate";
import { ReactEditor } from "slate-react";
import { SlideTransforms } from "../services/transforms/SlideTransforms";
import { setRemix } from "../../../transforms/remix/shiftRemix";
import { setPaletteForSlide } from "../../../../../common/slide/transforms/palette/setPaletteForSlide";
import { logger } from "../../../../../common/util/logger";
import { NodeTransforms as EditorTransforms } from "../services/transforms/NodeTransforms";
import { isPlainText } from "../modules/plugins/deserializers/transforms/isPlainText";
import { PARAGRAPH } from "../modules/plugins/component/paragraph/type";
import { SelectionTransforms } from "../services/transforms/SelectionTransforms";
import { LazyDataProvider } from "../../../../../common/api/plugins/template/LazyDataProvider";
import { isDynamicTemplate } from "../../../../../common/api/plugins/template/queries/isDynamicTemplate";

export const applyTemplate = (editor, themeName, template, slidePath) => {
  if (template) {
    let slideNode;
    if (!slidePath) {
      [slideNode, slidePath] = SlideTransforms.currentSlide(editor);
    } else {
      [slideNode] = Editor.node(editor, slidePath);
    }
    if (slidePath) {
      const slide = { path: slidePath };

      // Evaluate the template build with dynamic arguments.
      if (isDynamicTemplate(template)) {
        const dataProvider = new LazyDataProvider(slideNode);
        template = template(dataProvider);
      }

      const { remixName, palette } = template;
      template.extendFrom(slideNode, (nodes) => {
        if (!nodes || nodes.length === 0) {
          logger.warn(`Incompatible structure: slide is not a prefix of the template`);
          return;
        }
        Editor.withoutNormalizing(editor, () => {

          const [, lastPosition] = Editor.last(editor, slidePath);
          Transforms.select(editor, lastPosition);

          // Ensure that the active node is set to plain text, if empty.
          const [activeNode] = Editor.node(editor, SelectionTransforms.componentElementAncestorPath(editor, lastPosition));
          if (
            activeNode &&
            EditorTransforms.isNodeEmpty(editor, activeNode) &&
            !editor.isVoid(activeNode) &&
            isPlainText(activeNode) &&
            activeNode.type !== PARAGRAPH) {

            editor.toggleType(activeNode.type);
          }

          const insertNewLine = activeNode && (
            !EditorTransforms.isNodeEmpty(editor, activeNode) || editor.isVoid(activeNode)
          );
          let n = slideNode.children.length - 1;
          if (insertNewLine) {
            editor.insertParagraph();
            n++;
          }

          // Insert the template elements
          const at = slidePath.concat(n);
          Transforms.insertNodes(editor, nodes, { at, select: true });

          // Apply a remix, if applicable.
          if (remixName) {
            setRemix(editor)(slide, remixName);
          }

          // Apply a palette, if applicable.
          if (palette !== undefined) {
            setPaletteForSlide(editor)(slide, themeName, palette);
          }

        });

        // Finally, select the last element of the the new template.
        const [, lastPosition] = Editor.last(editor, slidePath);
        Transforms.select(editor, lastPosition);
        ReactEditor.focus(editor);
      });

    } else {
      logger.warn(`No active slide when applying template`);
    }
  }
};
