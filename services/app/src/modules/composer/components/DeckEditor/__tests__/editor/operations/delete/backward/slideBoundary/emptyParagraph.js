/** @jsx jsx */

import { jsx } from '../../../../../index';

export const input = (
  <editor>
    <slide>
      <paragraph>
        First slide
      </paragraph>
    </slide>
    <slideBreak><text /></slideBreak>
    <slide>
      <paragraph>
        <cursor />
      </paragraph>
      <paragraph>
        Second slide
      </paragraph>
    </slide>
  </editor>
);

export const run = (editor) => {
  editor.deleteBackward();
};

export const output = (
  <editor>
    <slide>
      <paragraph>
        First slide
      </paragraph>
    </slide>
    <slideBreak><text><cursor /></text></slideBreak>
    <slide>
      <paragraph>
        Second slide
      </paragraph>
    </slide>
  </editor>
);
