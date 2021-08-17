import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/styles";
import React, { useCallback } from "react";

/**
 * Generic button for e.g. all primary operations at the bottom of modals etc.
 * Defaults to `size="small"`.
 *
 * @param onClick
 * @param children
 * @param conditional   If evaluates to false the button is not shown. Default is true.
 * @param primary       Styled as `contained`.
 * @param secondary     Styled as `outlined`.
 * @param submit        If true submits form.
 * @param popup         Button is in a popup environment.
 * @param other
 * @returns {JSX.Element}
 * @constructor
 */
const styles = (popup) => makeStyles((theme) => ({
  contained: {
    color: `${theme.palette.type === "dark" || popup ? "#ccc" : theme.palette.primary.main}`,
    boxShadow: `${theme.palette.type === "dark" || popup ? "inset 0px 1px 0px rgba(255,255,255,10%), 0px 1px 0px rgba(255,255,255,10%)" : "inset 0px 1px 2px rgb(0 0 0 / 6%), 0px 1px 0px rgb(255 255 255 / 50%), 0px -1px 0px rgb(255 255 255 / 50%)"}`,
    border: `1px solid ${theme.palette.type === "dark" || popup ? "rgba(0,0,0,0.45)" : "rgba(0,0,0,0.075)"}`,
    borderRadius: 7,
    background: `${theme.palette.type === "dark" || popup ? "rgba(0,0,0,0.07)" : "rgba(0,0,0,0.025)"}`,
    transition: "all 200ms ease-in",
    opacity: 1,
    "&:hover": {
      transition: "all 200ms ease-in",
      background: `${theme.palette.type === "dark" || popup ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.25)"}`,
      boxShadow: `${theme.palette.type === "dark" || popup ? "inset 0px 1px 0px rgba(255,255,255,10%), 0px 1px 0px rgba(255,255,255,10%)" : "inset 0px 1px 2px rgb(0 0 0 / 6%), 0px 1px 0px rgb(255 255 255 / 50%), 0px -1px 0px rgb(255 255 255 / 50%)"}`,
    },
    "&:active": {
      boxShadow: "none",
      background: `${theme.palette.type === "dark" || popup ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,1)"}`,
      color: `${theme.palette.type === "dark" || popup ? "#fff" : theme.palette.primary.main}`,
    },
  }
}));
const GenericButton = ({ conditional = true, onClick, children, primary, secondary, submit, popup = true, ...other }) => {

  const useStyle = useCallback(styles(popup), [popup]);
  const classes = useStyle();

  const type = () => {
    if (primary) {
      return "contained";
    }
    if (secondary) {
      return "outlined";
    }
    return "text";
  };

  if (!conditional) return null;

  return (
    <Button classes={{ contained: classes.contained }} variant={type()} size="medium" onClick={onClick} type={submit ? "submit" : undefined} {...other}>{children}</Button>
  );
};
export default GenericButton;
