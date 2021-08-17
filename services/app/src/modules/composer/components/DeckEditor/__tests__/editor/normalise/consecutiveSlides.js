/** @jsx jsx */

import { jsx } from '../../index';

export const input = (
  <editor>
    <slide>
      <paragraph>
        First slide
      </paragraph>
    </slide>
    <slide>
      <paragraph>
        Second slide
      </paragraph>
    </slide>
  </editor>
);

export const run = (editor) => {
  editor.normalizeNode([editor, []]);
};

export const output = (
  <editor>
    <slide>
      <paragraph>
        First slide
      </paragraph>
      <paragraph>
        Second slide
      </paragraph>
    </slide>
  </editor>
);
