/** @jsx jsx */

import { jsx } from '../../../../index';

export const input = (
  <editor>
    <slide>
      <paragraph>
        First slide
      </paragraph>
      <paragraph>
        <cursor/>
      </paragraph>
    </slide>
    <slideBreak><text /></slideBreak>
    <slide>
      <paragraph>
        Second slide
      </paragraph>
    </slide>
  </editor>
);

export const run = (editor) => {
  editor.insertSlide({ position: 1 });
};

export const output = (
  <editor>
    <slide>
      <paragraph>
        First slide
      </paragraph>
      <paragraph>
        <cursor/>
      </paragraph>
    </slide>
    <slideBreak><text /></slideBreak>
    <slide settings={{}}>
      <title><text /></title>
    </slide>
    <slideBreak><text /></slideBreak>
    <slide>
      <paragraph>
        Second slide
      </paragraph>
    </slide>
  </editor>
);
