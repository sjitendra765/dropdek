/** @jsx jsx */

import { jsx } from '../../../../index';
import { SlideTransforms } from "../../../../../services/transforms/SlideTransforms";

export const input = (
  <editor>
    <slide id="a">
      <paragraph>
        Slide 1
      </paragraph>
    </slide>
    <slideBreak><text /></slideBreak>
    <slide id="b" settings={{ foo: 'bar' }}>
      <paragraph>
        Slide 2
      </paragraph>
    </slide>
    <slideBreak><text /></slideBreak>
    <slide id="c">
      <paragraph>
        Slide 3
      </paragraph>
    </slide>
  </editor>
);

export const run = (editor) => {
  SlideTransforms.duplicateSlide(editor, "b");
};

export const output = (
  <editor>
    <slide id="a">
      <paragraph>
        Slide 1
      </paragraph>
    </slide>
    <slideBreak><text /></slideBreak>
    <slide id="b" settings={{ foo: 'bar' }}>
      <paragraph>
        Slide 2
      </paragraph>
    </slide>
    <slideBreak><text /></slideBreak>
    <slide id="b" settings={{ foo: 'bar' }}>
      <paragraph>
        <anchor/>Slide 2<focus/>
      </paragraph>
    </slide>
    <slideBreak><text /></slideBreak>
    <slide id="c">
      <paragraph>
        Slide 3
      </paragraph>
    </slide>
  </editor>
);
