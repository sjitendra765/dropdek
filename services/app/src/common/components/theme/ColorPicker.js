import React, { useCallback } from "react";
import { makeStyles } from "@material-ui/styles";
import IconButton from "@material-ui/core/IconButton";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CheckIcon from "@material-ui/icons/Check";

const styles = (mini, setLogoBackgroundColor) => makeStyles((theme) => ({
  root: {
    marginLeft: mini ? 0 : 20,
    marginRight: mini ? 0 : 20,
  },
  container: {
    padding: mini ? 0 : 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  colorWell: {
    display: "inline-block",
    margin: mini ? 5 : 10,
    borderRadius: 40,
    height: mini ? 10 : 40,
    width: mini ? 10 : 40,
  },
  color: {
    minWidth: mini ? 10 : 40,
    margin: '0px 0px 0px 10px',
    "& .label": {
      padding: 12,
      color: theme.palette.text.primary,
      fontSize: "0.8em"
    }
  },
  button: {
    cursor: setLogoBackgroundColor ? "pointer" : "default",
    height: mini ? 10 : 40,
    width: mini ? 10 : 40,
    border: `1px solid rgba(0,0,0,0.075)`,
    transform: "scale(1,1)",
    transition: "transform 200ms ease",
    "&:hover": {
      transform: setLogoBackgroundColor ? "scale(1.2,1.2)" : "none",
      transition: "transform 200ms ease"
    }
  }
}), { meta: 'ColorPicker' });
const ColorPicker = ({ colors, logoBackgroundColor, setLogoBackgroundColor, mini = false }) => {

  const useStyles = useCallback(styles(mini, setLogoBackgroundColor), [mini, setLogoBackgroundColor]);
  const classes = useStyles();

  const onClick = (color) => {
    if (setLogoBackgroundColor) {
      if (color === logoBackgroundColor) {
        setLogoBackgroundColor(undefined);
      } else {
        setLogoBackgroundColor(color);
      }
    }
  };

  const Icon = mini ? CheckIcon : CheckCircleIcon;

  const getColorComponent = (color) => (
    <div className={classes.color}>
      <IconButton className={classes.button} style={{ backgroundColor: color }} onClick={() => onClick(color)}>
        <Icon style={{ color: color === logoBackgroundColor ? color === "#FFFFFF" ? "#000" : "#fff" : color, height: mini ? "0.5em" : "1em" }}/>
      </IconButton>
      { !mini && <div className="label">{color}</div> }
    </div>
  );

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        {getColorComponent(colors ? colors.accent : "#000")}
        {getColorComponent(colors ? colors.dark : "#000")}
        {getColorComponent("#FFFFFF")}
      </div>
    </div>
  );
};
export default ColorPicker;
