import Grid from "@material-ui/core/Grid";
import React, { useCallback, useEffect, useState } from 'react';
import { Range } from "slate";
import { ReactEditor, useSlate } from "slate-react";
import Popup from "../../../../../../common/components/popup/editor/Popup";
import SelectionReference from "../../utils/SelectionReference";
import { smartPasteStyles } from "./SmartPaste.styles";

export const SmartPaste = ({ pasteHandler = {}, setPasteHandler }) => {

  const { targetRange, data, component: PasteHandlerComponent } = pasteHandler || {};

  const editor = useSlate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [placement, setPlacement] = useState("top");

  const useStyles = useCallback(smartPasteStyles(), []);
  const classes = useStyles();

  const onClose = (event) => {
    setAnchorEl(null);
    setPasteHandler(null);
  };

  useEffect(() => {
    if (targetRange && PasteHandlerComponent && Range.isRange(targetRange)) {
      const domRange = ReactEditor.toDOMRange(editor, targetRange);
      if (!domRange) {
        setAnchorEl(null);
      }
      setAnchorEl(new SelectionReference(domRange));
    } else {
      setAnchorEl(null);
    }
  }, [targetRange]);

  return anchorEl && (
    <Popup
      style={{ minHeight: 290 }}
      anchor={anchorEl}
      onClose={onClose}
      setAnchor={() => {}} // we will handle hiding the popup ourselves
      open={open}>

      <Grid className={classes.root}>
        <PasteHandlerComponent data={data} classes={classes} onClose={onClose} />
      </Grid>
    </Popup>
  );
};
