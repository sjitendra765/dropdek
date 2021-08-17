import React, { useCallback, useEffect, useState, useRef } from 'react';
import { ReactEditor } from 'slate-react';
import { useTheme } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { Editor, Node, Path, Range, Text, Transforms } from 'slate';
import "./Suggestions.scss";
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import { makeStyles } from "@material-ui/styles";
import { showSuggestionsForNode } from "../onKeyDownSuggestionsMenu";
import { EditorTransforms } from "../../../../services/transforms/EditorTransforms";
import { hasActivePrompt } from "../../../prompt/transforms/hasActivePrompt";
import { SuggestedMatch } from "../SuggestedMatch";
import Popup from "../../../../../../../../common/components/popup/Popup/Popup";

const useStylesGenerator = () => makeStyles((theme) => ({
  context: {
    opacity: 1,
    borderRadius: `4px !important`,
    backgroundColor: theme.dark() ? theme.palette.background.elev00 : theme.palette.background.elev02,
    color: theme.palette.primary.main,
    "& .context svg": {
      color: theme.palette.primary.main
    },
  },
  root: {
    borderRadius: `4px !important`,
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.elev01,
    border: `1px solid ${theme.palette.background.elev00}`,
    transition: 'all 300ms ease-in-out 0',
    "& .suggestions": {
      border: `1px solid transparent`,
      background: 'transparent',
    },
    "& .suggestions.active": {
      color: "#06a1ec",
      borderRadius: `4px !important`,
      backgroundColor: theme.dark() ? theme.palette.background.elev00 : theme.palette.background.elev02,
      "& svg:last-of-type": {
        color: theme.palette.secondary.main,
      },
      "& .synonym + .label": {
        border: `1px solid #06a1ec`,
        color: theme.palette.secondary.main,
      }
    },
    "& .synonym + .label": {
      border: `1px solid ${theme.palette.text.secondary}`,
      "& .active": {
        color: theme.palette.secondary.main,
        border: `1px solid #06a1ec`,
      }
    }
  },
  boundary: {
    opacity: 0.7,
    "& div.boundary-line": {
      borderTop: `1px solid`,
      borderColor: theme.dark() ? theme.palette.background.border03 : theme.palette.background.elev02,
      height: 1
    },
    padding: 14
  }
}), { meta: 'Suggestions' });

export const Suggestions = ({ editor, match, setMatch, onSelectionTrigger }) => {
  const suggestions = match.suggestions();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const activeItemRef = useRef();
  const containerRef = useRef();

  const { target, index, keyboardIndex, anchor } = match;

  useEffect(() => {
    if (target && suggestions.length > 0) {
      if (anchor) {
        setAnchorEl(anchor);
        return;
      }
      const node = EditorTransforms.activeNode(editor);
      if (!node) {
        return;
      }
      const el = ReactEditor.toDOMNode(editor, node);
      if (!el) {
        return;
      }
      setAnchorEl(el);
    } else {
      setAnchorEl(null);
    }
  }, [suggestions, match, anchor]);

  useEffect(() => {
    if (activeItemRef.current && containerRef.current) {
      const { offsetTop } = activeItemRef.current;
      const computedStyle = window.getComputedStyle(containerRef.current);

      if (offsetTop < containerRef.current.scrollTop) {
        const paddingTop = parseFloat(computedStyle.getPropertyValue('padding-top').replace('px', ''));
        containerRef.current.scrollTo({ top: offsetTop - paddingTop });
      } else if (offsetTop - containerRef.current.scrollTop + activeItemRef.current.clientHeight > containerRef.current.clientHeight) {
        const paddingBottom = parseFloat(computedStyle.getPropertyValue('padding-bottom').replace('px', ''));
        containerRef.current.scrollTo({ top: offsetTop - containerRef.current.clientHeight + activeItemRef.current.clientHeight + paddingBottom });
      }
    }
  }, [activeItemRef.current]);

  const onClose = () => {
    setAnchorEl(null);
    setMatch(new SuggestedMatch({}));
  };

  const onClick = (index) => (event) => {
    const { link } = suggestions[index];
    event.preventDefault();
    if (link) {
      window.open(
        link,
        '_blank',
      );
      setMatch(new SuggestedMatch({}));
    } else {
      match.index = index;
      onSelectionTrigger(match);
      const focus = match.focus || target;
      try {
        const [lastNode, lastPath] = Editor.last(editor, focus);
        if (lastNode && lastPath) {
          Transforms.select(editor, { path: lastPath, offset: Node.string(lastNode).length });
        }
      } catch (e) {
        // could be that the focus is no longer valid
      }
    }
    ReactEditor.focus(editor);

  };

  // Triggering context specific action.
  const contextClick = (context) => (event) => {
    context.handler();
    setAnchorEl(null);
    const focus = match.focus || target;
    setMatch(new SuggestedMatch({}));
    try {
      const [lastNode, lastPath] = Editor.last(editor, focus);
      if (lastNode && lastPath) {
        Transforms.select(editor, { path: lastPath, offset: Node.string(lastNode).length });
      }
    } catch (e) {
      // could be that the focus is no longer valid
    }
    ReactEditor.focus(editor);
    event.preventDefault();
  };

  const useStyles = useCallback(useStylesGenerator(), []);
  const classes = useStyles();

  return (target && suggestions.length > 0) ? (
    <Popup
      instant
      defaultPlacement="bottom"
      anchor={anchorEl}
      setAnchor={setAnchorEl}
      onClose={onClose}
      open={open}
      width={266}
      color={theme.palette.popover.chevronAlt}>

      {match.context !== null ? (
        <div className={`${classes.context} context-container`}>
          {match.context.map((context) => (
            <div key={`context-option-${context.label}`}>
              <Button color="primary" variant="text" size="small" startIcon={context.icon} onClick={contextClick(context)}>{context.label}</Button>
            </div>
          ))}
        </div>
      ) : (
        <div className={`${classes.root} suggestionsDropdown`} ref={containerRef}>
          {suggestions.map((suggestion, i) => {
            const lastHighlighted = (suggestion.highlight && i < suggestions.length - 1 && !suggestions[i + 1].highlight);
            return (
              <div key={suggestion.displayName}>
                {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events */}
                <div
                  onClick={onClick(i)}
                  className={`suggestions ${i === index ? 'active' : ''} ${i === keyboardIndex ? 'keyboard' : ''}`}
                  ref={i === index ? activeItemRef : null}
                >
                  {suggestion.icon ? suggestion.icon : null}
                  <div className="synonym">{suggestion.displayName}</div>
                  {suggestion.synonym ? (
                    <div className="label">
                      {suggestion.synonym.prefix}{suggestion.synonym.suffix}
                    </div>
                  ) : null}
                  {suggestion.description ? (
                    <div className="description">{suggestion.description}</div>
                  ) : null}
                  <KeyboardReturnIcon/>
                </div>
                {lastHighlighted ? (
                  <div className={classes.boundary}><div className="boundary-line"> </div></div>
                ) : null}
              </div>
            );
          })}
        </div>
      )}
    </Popup>
  ) : null;
};

/**
 * Determine the search term to use to search for suggested keywords, to trigger components.
 * Returns a pair of { search, target } which includes the string to search with and the Slate
 * location (Range element) that highlights that search string.
 *
 * @param editor
 * @returns {{search: string | string, target: {anchor: {path: number[], offset: number}, focus: {path: number[], offset: number}}}}
 */
const typeAheadQuery = (editor) => {
  const { selection } = editor;
  const focus = selection && selection.focus ? selection.focus : {
    path: [0, 0],
    offset: 0
  };
  const anchor = {
    path: focus.path,
    offset: 0
  }; // note that this won't necessarily work for a right-to-left language
  const target = {
    anchor,
    focus
  };

  const currentNode = Node.get(editor, focus.path);
  const parentNode = Node.parent(editor, focus.path);
  const parentPath = Path.parent(focus.path);

  // We only show suggestions in text nodes at the beginning of a text block (that is, the text node
  // has to be the first child of a text block).
  const validNode = currentNode && Text.isText(currentNode) && focus.path[focus.path.length - 1] === 0;
  const validFocus = validNode && parentNode && parentNode.type && showSuggestionsForNode(editor, parentNode, parentPath);
  const search = validFocus ? Editor.string(editor, target) : '';
  return {
    search,
    target,
    currentNode: parentNode
  };
};

const getTypeAheadQuery = (editor, promptSession) => {
  const { selection } = editor;
  if (selection && Range.isRange(selection) && Range.isCollapsed(selection)) {
    const activeElement = EditorTransforms.activeElementNode(editor);
    const activeElementPath = EditorTransforms.activeElementPath(editor);
    if (activeElement && activeElementPath && !hasActivePrompt(activeElement, activeElementPath, promptSession)) {
      return typeAheadQuery(editor);
    }
    return {};
  }
  return undefined;
};

export const getSearchTerm = (editor, promptSession) => {
  const query = getTypeAheadQuery(editor, promptSession);
  return query ? query.search : undefined;
};

/**
 * Handle editor type-ahead.
 */
export const updateSuggestions = (match, promptSession) => (editor) => {
  const { history } = editor;
  if (history && history.undos && history.undos.length > 0) {
    const ops = history.undos[history.undos.length - 1];
    if (ops && ops.length > 0) {
      const op = ops[ops.length - 1];
      const { type, path: pathOfLastOp } = op;
      if (type === 'remove_text' || type === 'insert_text') {
        if (pathOfLastOp) {
          const query = getTypeAheadQuery(editor, promptSession);
          if (query) {
            const { search, target, currentNode } = query;
            if (search && target && Path.equals(pathOfLastOp, target.anchor ? target.anchor.path : target)) {
              match.target = target;
              match.search = search;
              match.index = 0;
              match.currentType = currentNode.type;
              return;
            }
            match.reset();
          }
        }
      }
    }
  }
};
