import { toHtml } from "./toHtml";
import { BULLETED_LIST } from "../../../modules/composer/components/DeckEditor/modules/plugins/component/list/bulleted/type";
import { BLOCK_QUOTE } from "../../../modules/composer/components/DeckEditor/modules/plugins/component/quote/type";
import { LIST_ITEM } from "../../../modules/composer/components/DeckEditor/modules/plugins/component/list/type";
import { PARAGRAPH } from "../../../modules/composer/components/DeckEditor/modules/plugins/component/paragraph/type";

const root = {
  children: [
    {
      type: PARAGRAPH,
      children: [
        { text: 'An opening paragraph.' },
      ],
    },
    {
      type: BLOCK_QUOTE,
      children: [{ text: 'A wise quote.' }],
    },
    {
      type: PARAGRAPH,
      children: [{ text: 'A closing paragraph!' }],
    },
    {
      type: BULLETED_LIST,
      children: [
        {
          type: LIST_ITEM,
          children: [{ text: 'List item 1' }],
        },
        {
          type: LIST_ITEM,
          children: [{ text: 'List item 2' }],
        },
      ],
    }
  ]
};
it('serializes to HTML', () => {
  expect(toHtml(root)).toEqual('<p>An opening paragraph.</p><blockquote><p>A wise quote.</p></blockquote><p>A closing paragraph!</p><ul data-length="2"><li>List item 1</li><li>List item 2</li></ul>');
});
