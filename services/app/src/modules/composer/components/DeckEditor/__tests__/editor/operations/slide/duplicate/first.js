/** @jsx jsx */

import { jsx } from '../../../../index';
import { SlideTransforms } from "../../../../../services/transforms/SlideTransforms";

export const input = (
  <editor>
    <slide id="a" settings={{ foo: 'bar' }}>
      <paragraph>
        Slide 1
      </paragraph>
    </slide>
    <slideBreak><text /></slideBreak>
    <slide id="b">
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
  SlideTransforms.duplicateSlide(editor, "a");
};

export const output = (
  <editor>
    <slide id="a" settings={{ foo: 'bar' }}>
      <paragraph>
        Slide 1
      </paragraph>
    </slide>
    <slideBreak><text /></slideBreak>
    <slide id="a" settings={{ foo: 'bar' }}>
      <paragraph>
        <anchor/>Slide 1<focus/>
      </paragraph>
    </slide>
    <slideBreak><text /></slideBreak>
    <slide id="b">
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
