import { Delete } from "@material-ui/icons";
import React from "react";
import { Transforms, Path } from "slate";
import { IoDuplicate } from "react-icons/io5";
import { ReactEditor, useEditor, useSlate } from "slate-react";
import { Objects } from "../../../../../../../../../../../common/util/Objects";
import { GROUP_IN_COLLECTION_DEPTH, GroupTransforms } from "../../../../../../../services/transforms/GroupTransforms";
import { SlideControlButton } from "../../../../slide/components/SlideControlButton";

export const GroupEditorElement = ({ element, attributes, children }) => {
  const editor = useSlate();
  const path = ReactEditor.findPath(editor, element);
  const currentPosition = path && path.length >= GROUP_IN_COLLECTION_DEPTH ? path[GROUP_IN_COLLECTION_DEPTH - 1] : 0;

  const duplicateGroup = (event) => {
    event.preventDefault();
    if (path) {
      editor.insertGroup({ at: path, position: currentPosition + 1, children: Objects.fastClone(element.children) });
    }
  };

  const deleteGroup = (event) => {
    event.preventDefault();
    if (path && path.length === GROUP_IN_COLLECTION_DEPTH) {
      const groupCount = GroupTransforms.groupCount(editor, path);
      if (groupCount === 1) {
        Transforms.removeNodes(editor, { at: Path.parent(path), voids: true, hanging: true });
      } else {
        Transforms.removeNodes(editor, { at: path, voids: true, hanging: true });
      }
    }
  };

  return (
    <>
      <div className="editor-group" {...attributes}>
        {children}
        <div className="editor-group-controls" contentEditable={false}>
          <SlideControlButton onClick={duplicateGroup} icon={<IoDuplicate/>}/>
          <SlideControlButton onClick={deleteGroup} icon={<Delete/>}/>
        </div>
      </div>
    </>
  );
};
