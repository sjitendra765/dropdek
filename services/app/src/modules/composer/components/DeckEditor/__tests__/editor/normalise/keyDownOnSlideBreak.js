/** @jsx jsx */

import { jsx } from '../../index';

export const input = (
  <editor>
    <slide>
      <paragraph>
        First slide
      </paragraph>
    </slide>
    <slideBreak><text><cursor /></text></slideBreak>
    <slide settings="should stay the same">
      <paragraph>
        Second slide
      </paragraph>
    </slide>
  </editor>
);

export const run = (editor) => {
  editor.insertBreak(); // simulate the user pressing line break
};

export const output = (
  <editor>
    <slide>
      <paragraph>
        First slide
      </paragraph>
    </slide>
    <slideBreak><text/></slideBreak>
    <slide settings="should stay the same">
      <paragraph>
        <cursor />
      </paragraph>
      <paragraph>
        Second slide
      </paragraph>
    </slide>
  </editor>

);
