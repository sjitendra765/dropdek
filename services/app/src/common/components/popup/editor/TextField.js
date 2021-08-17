import { FormControl, FormHelperText, Input, InputLabel, TextField } from "@material-ui/core";
import React, { useCallback } from "react";
import { makeStyles } from "@material-ui/styles";

const styles = () => makeStyles((theme) => ({
  root: {
    margin: "2px 0 2px 0"
  },
  label: {
    color: "#7a7a7c",
    "&.Mui-focused": {
      color: "#fff"
    }
  },
  input: {
    color: "#fff"
  },
  underline: {
    "&:hover:not(.Mui-disabled):before": {
      borderBottom: "1px solid rgba(255,255,255,0.9)"
    },
    "&:after": {
      borderBottom: "2px solid rgba(255,255,255,1)"
    }
  }
}));
const PopupTextField = ({ name, label, value, onChange, placeholder, helperText }) => {

  const _name = name || label.toLowerCase().replaceAll(" ", "-");
  const useStyles = useCallback(styles(), []);
  const classes = useStyles();

  return (
    <FormControl className={classes.root} fullWidth>
      <InputLabel className={classes.label} htmlFor={_name}>{label}</InputLabel>
      <Input
        id={_name}
        classes={{ input: classes.input, underline: classes.underline }}
        value={value}
        onChange={onChange}
        aria-describedby={`helper-text-${_name}`}
        placeholder={placeholder}
      />
      <FormHelperText id={`helper-text-${_name}`}>{helperText}</FormHelperText>
    </FormControl>
  );
};
export default PopupTextField;
