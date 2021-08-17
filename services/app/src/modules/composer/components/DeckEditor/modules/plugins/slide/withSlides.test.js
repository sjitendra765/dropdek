import { createEditor, Editor, Node, Text, Transforms } from "slate";
import { withSlides } from "./withSlides";
import { withSettings } from "../settings/withSettings";
import { SLIDE } from "../component/slide/type";
import { SLIDE_BREAK } from "../component/slideBreak/type";
import { PARAGRAPH } from "../component/paragraph/type";
import { componentBuilder } from "../../../../../../../common/api/plugins/builder/ComponentBuilder";

it('retrieves a slide', () => {
  const editor = withSlides(withSettings(createEditor()));

  // Ensure the deck is not empty.
  Editor.insertNode(editor, componentBuilder().slide().paragraph().build());

  editor.splitSlide();
  const index = editor.children.length - 1;
  const path = [index];
  const node = Node.get(editor, path);
  expect(editor.slide(index)).toEqual(node);

});

it('does not inherit of the slide being split', () => {
  const editor = withSlides(withSettings(createEditor()));

  // Ensure the deck is not empty.
  Editor.insertNode(editor, componentBuilder().slide().paragraph().build());

  editor.splitSlide();
  const index = editor.children.length - 1;
  const path = [index];
  const node = Node.get(editor, path);
  expect(editor.slide(index))
    .toEqual(node);
  expect(node.children.length)
    .toEqual(1);
  expect(node.children[0].type)
    .toEqual(PARAGRAPH);

});

it('normalizes the slide structure', () => {
  const editor = withSlides(createEditor());

  editor.children = [
    {
      type: SLIDE,
      children: [
        {
          type: PARAGRAPH,
          children: [{ text: 'An opening paragraph' }],
        },
      ],
    },
    {
      type: SLIDE_BREAK,
      children: [
        {
          type: PARAGRAPH,
          children: [{ text: '' }],
        },
      ],
    },
    {
      type: SLIDE,
      children: [
        {
          type: PARAGRAPH,
          children: [{ text: 'An opening paragraph' }],
        },
      ],
    },
    {
      type: SLIDE_BREAK,
      children: [],
    },
    {
      type: SLIDE,
      children: [
        {
          type: PARAGRAPH,
          children: [{ text: 'An opening paragraph' }],
        },
      ],
    },
  ];

  // Before normalization
  expect(editor.children[1].type).toEqual(SLIDE_BREAK);
  expect(editor.children[1].children.length).toEqual(1);
  expect(editor.children[1].children[0].type).toEqual(PARAGRAPH);
  expect(Text.isText(editor.children[1].children[0])).toBeFalsy();

  expect(editor.children[3].type).toEqual(SLIDE_BREAK);
  expect(editor.children[3].children.length).toEqual(0);

  Editor.normalize(editor, { force: true });

  // After normalization
  expect(editor.children[1].type).toEqual(SLIDE_BREAK);
  expect(editor.children[1].children.length).toEqual(1);
  expect(editor.children[1].children[0].type).toBeUndefined();
  expect(Text.isText(editor.children[1].children[0])).toBeTruthy();

  expect(editor.children[3].type).toEqual(SLIDE_BREAK);
  expect(editor.children[3].children.length).toEqual(1);
  expect(Text.isText(editor.children[3].children[0])).toBeTruthy();
});
