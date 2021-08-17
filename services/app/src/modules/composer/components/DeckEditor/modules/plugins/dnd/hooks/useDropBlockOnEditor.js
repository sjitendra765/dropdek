import { useDrop } from 'react-dnd';
import { Path, Transforms } from 'slate';
import { ReactEditor } from 'slate-react';
import { getDragHoverDirection } from '../utils/getDragHoverDirection';
import { getNewDirection } from '../utils/getNewDirection';
import { isExpanded } from "../../../../queries/isExpanded";
import { logger } from "../../../../../../../../common/util/logger";

export const useDropBlockOnEditor = (
  editor,
  {
    blockRef,
    path,
    dropLine,
    setDropLine,
  }
) => useDrop({
  accept: 'block',
  drop: (dragItem, monitor) => {
    const direction = getDragHoverDirection(dragItem, monitor, blockRef, path);
    if (!direction) return;

    const dragPath = dragItem.path;
    if (!dragPath) return;

    ReactEditor.focus(editor);

    let dropPath;
    if (direction === 'bottom') {
      dropPath = path;
      if (!dropPath) return;

      if (Path.equals(dragPath, Path.next(dropPath))) return;
    }

    if (direction === 'top') {
      const nodePath = path;

      if (!nodePath) return;
      dropPath = [
        ...nodePath.slice(0, -1),
        nodePath[nodePath.length - 1] - 1,
      ];

      if (Path.equals(dragPath, dropPath)) return;
    }

    if (direction) {
      const _dropPath = dropPath;

      const before =
          Path.isBefore(dragPath, _dropPath) &&
          Path.isSibling(dragPath, _dropPath);
      const to = before ? _dropPath : Path.next(_dropPath);

      Transforms.moveNodes(editor, {
        at: dragPath,
        to,
      });
    }
  },
  collect: (monitor) => ({
    isOver: monitor.isOver(),
  }),
  hover(item, monitor) {
    const direction = getDragHoverDirection(item, monitor, blockRef, path);
    const dropLineDir = getNewDirection(dropLine, direction);
    if (dropLineDir) {
      setDropLine(dropLineDir);
      if (direction && isExpanded(editor.selection)) {
        try {
          ReactEditor.focus(editor);
          Transforms.collapse(editor);
        } catch (e) {
          logger.error(`Error when collapsing editor`, e);
        }
      }
    }
  },
});
