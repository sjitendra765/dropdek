import { Editor, Transforms, Node } from "slate";
import { LINK } from "../type";
import { isValidLinkSelection } from "../queries/isValidLinkSelection";
import { EditorTransforms } from "../../../../../services/transforms/EditorTransforms";

export const setLinkAtSelection = (editor, url, text) => {
  if (isValidLinkSelection(editor)) {
    const [node, path] = EditorTransforms.activeElement(editor);
    if (node && node.type === LINK) {
      Editor.withoutNormalizing(editor, () => {
        Transforms.setNodes(editor, { url }, { at: path });
        if (text && Node.string(node) !== text) {
          Editor.insertText(editor, text);
        }
      });

    } else {
      Transforms.insertNodes(editor, {
        type: LINK,
        url,
        children: [{ text: text || 'link' }],
      });
      Transforms.move(editor);
    }
  }
};
