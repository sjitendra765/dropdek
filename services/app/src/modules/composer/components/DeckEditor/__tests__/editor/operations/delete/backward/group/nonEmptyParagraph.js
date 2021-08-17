/** @jsx jsx */

import { jsx } from '../../../../../index';

export const input = (
  <editor>
    <slide>
      <collection>
        <group>
          <paragraph>A</paragraph>
        </group>
        <group>
          <paragraph>B<cursor /></paragraph>
        </group>
      </collection>
    </slide>
  </editor>
);

export const run = (editor) => {
  editor.deleteBackward();
  editor.deleteBackward();
};

export const output = (
  <editor>
    <slide>
      <collection>
        <group>
          <paragraph>A<cursor /></paragraph>
        </group>
      </collection>
    </slide>
  </editor>
);
