import React, { useCallback } from 'react';
import { makeStyles } from "@material-ui/styles";
import { CODE } from "../type";

const styles = () => makeStyles((theme) => ({
  root: {
    margin: '-2px 0 0 -8px',
    color: "#fff",
    backgroundColor: theme.palette.popover.border,
    padding: "6px 8px",
    borderRadius: 4,
    fontSize: "0.85em"
  },
}), { meta: 'CodeElement' });
export const CodeEditorElement = ({ attributes, children }) => {

  const useStyles = useCallback(styles(), []);
  const classes = useStyles();
  return (
    <code style={{ tabSize: 2 }} className={classes.root} {...attributes} data-slate-type={CODE}>
      {children}
    </code>
  );
};
