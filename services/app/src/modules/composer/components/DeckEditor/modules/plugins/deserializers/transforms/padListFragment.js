import { isList } from "../../core/withCoreEditing";
import { PARAGRAPH } from "../../component/paragraph/type";

export const padListFragment = (content) => {

  if (!content || !content.length) {
    return content;
  }

  // if the content to be inserted starts with a list node,
  // we insert an empty paragraph before to work around a boundary
  // fragment issue.
  if (isList(content[0])) {
    return [{
      type: PARAGRAPH,
      children: [{ text: '' }]
    }, ...content];
  }

  return content;

};
