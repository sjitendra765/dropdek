/** @jsx jsx */

import { jsx } from '../index';
import { setScaling } from "../../../scaling/setScaling";

export const input = (
  <editor>
    <slide>
      <paragraph>Paragraph</paragraph>
      <paragraph><cursor/></paragraph>
    </slide>
  </editor>
);

export const run = (editor) => {
  // Let's make a change (delete) and then set font scaling. This should only count as a
  // SINGLE user operation and therefore, a single UNDO should reset back to the original input,
  // without affecting the auto-scaling.
  editor.deleteBackward();
  setScaling(editor)({ path: [0] }, 1.5);
};

export const output = (
  <editor>
    <slide settings={{ scaling: 1.5 }}>
      <paragraph>Paragraph</paragraph>
      <paragraph><cursor/></paragraph>
    </slide>
  </editor>
);
