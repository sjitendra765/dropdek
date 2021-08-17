import uuid from 'react-uuid';
import { SLIDE } from "../modules/plugins/component/slide/type";
import { SLIDE_BREAK } from "../modules/plugins/component/slideBreak/type";

export const initialDeckState = () => ([
  {
    type: SLIDE,
    id: uuid(),
    children: [
      {
        type: 'heading-one',
        children: [{ text: 'Welcome to Dropdeck' },],
      },
      {
        type: 'paragraph',
        children: [{ text: 'Still creating the same old decks? Time to drop the habit.' }],
      },
    ],
  },
  {
    type: SLIDE_BREAK,
    children: [{ text: '' }],
  },
  {
    type: SLIDE,
    id: uuid(),
    children: [
      {
        type: 'heading-one',
        children: [{ text: 'Mic Drop' },],
      },
      {
        type: 'paragraph',
        children: [{ text: '@giphy of obama mic drop' }],
      },
    ],
  },
  {
    type: SLIDE_BREAK,
    children: [{ text: '' }],
  },
  {
    type: SLIDE,
    id: uuid(),
    children: [
      {
        type: 'heading-one',
        children: [{ text: 'Create stunning decks in minutes' },],
      },
      {
        type: 'bulleted-list',
        children: [
          {
            type: 'list-item',
            children: [{ text: 'Focus on the main points of your deck' }],
          },
          {
            type: 'list-item',
            children: [{ text: 'Without thinking about layout' }],
          },
          {
            type: 'list-item',
            children: [{ text: 'Dropdeck does everything else for you' }],
          },
          {
            type: 'list-item',
            children: [{ text: 'That\'s it' }],
          },
        ],
      },
    ],
  },
  {
    type: SLIDE_BREAK,
    children: [{ text: '' }],
  },
  {
    type: SLIDE,
    id: uuid(),
    children: [
      {
        type: 'heading-one',
        children: [{ text: 'Dropdeck USPs' },],
      },
      {
        type: 'bulleted-list',
        children: [
          {
            type: 'list-item',
            children: [{ text: 'Zero barrier to entry' }],
          },
          {
            type: 'list-item',
            children: [{ text: 'Automatic, intelligent company branding' }],
          },
          {
            type: 'list-item',
            children: [{ text: 'Live, real-time data' }],
          },
          {
            type: 'list-item',
            children: [{ text: 'Advanced deck analytics' }],
          },
        ],
      },
      {
        type: 'paragraph',
        children: [{ text: 'And much more' }],
      },
    ],
  },
  {
    type: SLIDE_BREAK,
    children: [{ text: '' }],
  },
  {
    type: SLIDE,
    id: uuid(),
    children: [
      {
        type: 'heading-one',
        children: [{ text: 'Key Milestones' },],
      },
      {
        type: 'bulleted-list',
        children: [
          {
            type: 'list-item',
            children: [{ text: 'Jan 08 2020 - Dropdeck v1.0 releases' }],
          },
          {
            type: 'list-item',
            children: [{ text: 'Jan 01 2020 - Dropdeck v0.9 releases' }],
          },
          {
            type: 'list-item',
            children: [{ text: 'Dec 28 2019 - Dropdeck v0.81 releases' }],
          },
          {
            type: 'list-item',
            children: [{ text: 'Dec 28 2019 - Dropdeck v0.8 releases' }],
          },
        ],
      },
    ],
  },
  {
    type: SLIDE_BREAK,
    children: [{ text: '' }],
  },
  {
    type: SLIDE,
    id: uuid(),
    children: [
      {
        type: 'heading-one',
        children: [{ text: 'Who Uses Dropdeck?' },],
      },
      {
        type: 'bulleted-list',
        children: [
          {
            type: 'list-item',
            children: [{ text: 'apple.com' }],
          },
          {
            type: 'list-item',
            children: [{ text: 'slack.com' }],
          },
          {
            type: 'list-item',
            children: [{ text: 'microsoft.com' }],
          },
          {
            type: 'list-item',
            children: [{ text: 'google.com' }],
          },
          {
            type: 'list-item',
            children: [{ text: 'amazon.com' }],
          },
          {
            type: 'list-item',
            children: [{ text: 'uber.com' }],
          },
          {
            type: 'list-item',
            children: [{ text: 'nasa.gov' }],
          },
        ],
      },
    ],
  },
  {
    type: SLIDE_BREAK,
    children: [{ text: '' }],
  },
  {
    type: SLIDE,
    id: uuid(),
    children: [
      {
        type: 'heading-one',
        children: [{ text: 'A Splinter Group Venture' },],
      },
      {
        type: 'bulleted-list',
        children: [
          {
            type: 'list-item',
            children: [{ text: 'Hjortur Stefan Olafsson' }],
          },
          {
            type: 'list-item',
            children: [{ text: 'Bjarki Holm' }],
          },
          {
            type: 'list-item',
            children: [{ text: 'Theo Bonham Carter' }],
          },
        ],
      },
    ],
  },
  {
    type: SLIDE_BREAK,
    children: [{ text: '' }],
  },
  {
    type: SLIDE,
    id: uuid(),
    children: [
      {
        type: 'heading-one',
        children: [{ text: 'Thank you' },],
      },
    ]
  },
]);
