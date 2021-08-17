import { Node } from "slate";

/**
 * Map the text content of a node to a string query.
 *
 * @param slideNode
 * @returns {string}
 */
export const nodeToQuery = (slideNode) => {
  const nodes = slideNode && slideNode.children ? slideNode.children : [];
  return nodes.map((node) => Node.string(node)).join(' ');
};
