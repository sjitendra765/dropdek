import { Transforms } from 'slate';
import { getPointBefore } from "../queries/getPointBefore";
import { getText } from "../queries/getText";

export const autoformatInline = (
  editor,
  {
    type,
    between,
    markup,
    ignoreTrim,
  }
) => {
  const { selection } = editor;

  const startMarkup = between ? between[0] : markup;
  const endMarkup = between ? between[1] : '';

  let endMarkupPointBefore = selection.anchor;
  if (endMarkup) {
    endMarkupPointBefore = getPointBefore(editor, selection, {
      matchString: endMarkup,
    });
    if (!endMarkupPointBefore) return false;
  }

  const startMarkupPointAfter = getPointBefore(editor, endMarkupPointBefore, {
    matchString: startMarkup,
    skipInvalid: true,
    afterMatch: true,
  });

  if (!startMarkupPointAfter) return false;

  // found

  const markupRange = {
    anchor: startMarkupPointAfter,
    focus: endMarkupPointBefore,
  };

  if (!ignoreTrim) {
    const markupText = getText(editor, markupRange);
    if (markupText.trim() !== markupText) return false;
  }

  // delete end markup
  if (endMarkup) {
    endMarkupPointBefore = getPointBefore(editor, selection, {
      matchString: endMarkup,
    });
    Transforms.delete(editor, {
      at: {
        anchor: endMarkupPointBefore,
        focus: selection.anchor,
      },
    });
  }

  // add mark to the text between the markups
  Transforms.select(editor, markupRange);
  editor.addMark(type, true);
  Transforms.collapse(editor, { edge: 'end' });
  editor.removeMark(type);

  // delete start markup
  const startMarkupPointBefore = getPointBefore(editor, selection, {
    matchString: startMarkup,
    skipInvalid: true,
  });
  Transforms.delete(editor, {
    at: {
      anchor: startMarkupPointBefore,
      focus: startMarkupPointAfter,
    },
  });

  return true;
};
