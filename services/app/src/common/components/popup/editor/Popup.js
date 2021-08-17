import React from "react";
import { useTheme } from "@material-ui/styles";
import Popup from "../Popup";

const EditorPopup = ({ anchor, onClose, open, style = {}, children }) => {

  const theme = useTheme();

  return (
    <Popup
      style={{ padding: 8, borderRadius: 10, boxShadow: "none", ...style }}
      color={theme.dark() ? "rgba(29,30,31,0.95)" : null}
      instant
      defaultPlacement="top"
      anchor={anchor}
      onClose={onClose}
      setAnchor={() => {}} // we will handle hiding the popup ourselves
      width={300}
      open={open}>
      {children}
    </Popup>
  );
};
export default EditorPopup;
