import React, { useCallback } from "react";
import { makeStyles } from "@material-ui/styles";
import Label from "../controls/Label";

const styles = () => makeStyles((theme) => ({
  root: {
    overflow: "auto",
    borderRadius: 6,
    padding: 10,
    margin: 10,
    border: "1px solid",
    borderColor: theme.palette.popover.border,
    background: 'rgba(29,30,32,0.8)',
  },
  title: {
    display: "inline-block",
    marginTop: -4,
    marginLeft: 7,
    marginBottom: 8,
    fontSize: 12,
    fontWeight: 600,
    textTransform: "uppercase",
    color: theme.palette.popover.label,
  }
}));

/**
 * Section within a {@link Popup}.
 *
 * @param children
 * @param title
 * @param style
 * @returns {JSX.Element}
 * @constructor
 */
const Section = ({ children, title, style, override }) => {
  const useStyle = useCallback(styles(), []);
  const classes = useStyle();
  return (
    <div className={classes.root} style={override}>
      { title !== undefined ? (
        <Label className={classes.title}>
          {title}
        </Label>
      ) : null }

      <div style={style}>
        {children}
      </div>
    </div>
  );
};
export default Section;
