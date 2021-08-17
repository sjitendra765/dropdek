import { ReactEditor } from "slate-react";
import { insertSlideBreak } from "../transforms/insertSlideBreak";

export const slideBreakConfigurator = (editor, node, path, resolve) => {
  insertSlideBreak(editor, path);
  ReactEditor.focus(editor);
  resolve();
};
