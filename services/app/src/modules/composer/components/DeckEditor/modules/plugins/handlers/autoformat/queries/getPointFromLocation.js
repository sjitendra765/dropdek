import { Path, Point, Range } from 'slate';

/**
 * Get the point from a location (default: selection).
 * If the location is a range, get the anchor point.
 * If the location is a path, get the point at this path with offset 0.
 * If `focus` is true, get the focus point.
 */
export const getPointFromLocation = (
  editor,
  {
    at = editor.selection,
    focus,
  } = {}
) => {
  let point;
  if (Range.isRange(at)) point = !focus ? at.anchor : at.focus;
  if (Point.isPoint(at)) point = at;
  if (Path.isPath(at)) point = { path: at, offset: 0 };

  return point;
};
