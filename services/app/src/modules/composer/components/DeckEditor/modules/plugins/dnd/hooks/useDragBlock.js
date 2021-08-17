import { useDrag } from 'react-dnd';

export const useDragBlock = (editor, path) => (
  useDrag({
    item: { type: 'block', path },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    begin: () => {
      document.body.classList.add('dragging');
    },
    end: () => {
      document.body.classList.remove('dragging');
    },
  })
);
