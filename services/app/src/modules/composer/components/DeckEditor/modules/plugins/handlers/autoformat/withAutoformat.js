import castArray from 'lodash/castArray';
import { autoformatBlock } from './transforms/autoformatBlock';
import { autoformatInline } from './transforms/autoformatInline';
import { autoformatInlineBlock } from './transforms/autoformatInlineBlock';
import { getRangeFromBlockStart } from "./queries/getRangeFromBlockStart";
import { isCollapsed } from "./queries/isCollapsed";
import { getText } from "./queries/getText";

/**
 * Enables support for autoformatting actions.
 * Once a markup rule is validated, it does not check the following rules.
 */
export const withAutoformat = (rules) => (editor) => {
  const { insertText } = editor;

  editor.insertText = (text) => {
    if (!isCollapsed(editor.selection)) return insertText(text);

    // eslint-disable-next-line no-unused-vars
    for (const rule of rules) {
      const {
        trigger = ' ',
        type,
        markup,
        preFormat,
        format,
        mode,
        between,
        ignoreTrim,
        insertTrigger,
      } = rule;
      const triggers = castArray(trigger);

      // Check trigger
      if (!triggers.includes(text)) continue;

      const markups = castArray(markup);

      const rangeFromBlockStart = getRangeFromBlockStart(editor);
      const textFromBlockStart = getText(editor, rangeFromBlockStart);

      const valid = () => insertTrigger && insertText(text);

      if (markups.includes(textFromBlockStart)) {
        // Start of the block
        autoformatBlock(editor, type, rangeFromBlockStart, {
          preFormat,
          format,
        });
        return valid();
      }

      if (mode === 'inline-block') {
        if (
          autoformatInlineBlock(editor, { preFormat, markup, format, type })
        ) {
          return valid();
        }
      }

      if (mode === 'inline') {
        if (
          autoformatInline(editor, {
            type,
            between,
            ignoreTrim,
            markup: Array.isArray(markup) ? markup[0] : markup,
          })
        ) {
          return valid();
        }
      }
    }

    insertText(text);
  };

  return editor;
};
