import React from "react";
import { BsFillCollectionFill } from "react-icons/bs";

export const GroupCollectionEditorElement = ({ attributes, children }) => (
  <div className="editor-group-collection" {...attributes}>
    <BsFillCollectionFill className="group-icon" style={{ opacity: 0.7 }}/>
    {children}
  </div>
);
