import { useState } from 'react';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { useEditor } from 'slate-react';
import { useDragBlock } from './useDragBlock';
import { useDropBlockOnEditor } from './useDropBlockOnEditor';

export const useDndBlock = ({
  path,
  blockRef,
  removePreview,
}) => {
  const editor = useEditor();
  const [dropLine, setDropLine] = useState(''); // <'' | 'top' | 'bottom'>

  const [{ isDragging }, dragRef, preview] = useDragBlock(editor, path);
  const [{ isOver }, drop] = useDropBlockOnEditor(editor, {
    path,
    blockRef,
    dropLine,
    setDropLine,
  });

  if (removePreview) {
    drop(blockRef);
    preview(getEmptyImage(), { captureDraggingState: true });
  } else {
    preview(drop(blockRef));
  }

  if (!isOver && dropLine) {
    setDropLine('');
  }

  return {
    isDragging,
    dropLine,
    dragRef,
  };
};
