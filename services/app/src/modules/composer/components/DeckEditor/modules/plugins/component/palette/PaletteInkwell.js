import React, { useCallback } from "react";
import { makeStyles } from "@material-ui/styles";
import IconButton from "@material-ui/core/IconButton";
import { ThumbDown, ThumbUp } from "@material-ui/icons";
import { Moods } from "../../../../../../../../theme/Palette";

const styles = () => makeStyles((theme) => ({
  root: {
    float: "left",
    padding: 3,
    "& .mood": {
      position: "absolute",
      bottom: -20,
      borderRadius: 12,
      transform: "scale(0.2)",
      transition: "transform 100ms ease-out, bottom 25ms ease-out",
      "&.positive": {
        backgroundColor: "#66ff00",
        color: "#66ff00",
      },
      "&.negative": {
        backgroundColor: "#ff3838",
        color: "#ff3838"
      },
    },
    "&:hover .mood": {
      "&.positive": {
        color: "#2d7000",
        border: "1px solid #2d7000"
      },
      "&.negative": {
        color: "#fff2f2",
        border: "1px solid #fff2f2"
      },
      bottom: -12,
      padding: 3,
      height: 8,
      width: 8,
      transition: "transform 100ms ease-out, bottom 25ms ease-out",
      transform: "scale(1)",
    }
  },
}));
const PaletteInkwell = ({ palette, pickPalette }) => {

  const useStyles = useCallback(styles(), []);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <IconButton onClick={() => pickPalette(palette)} className="paletteIcon" style={{
        backgroundColor: palette.background(),
        color: palette.title(),
        borderColor: palette.accent(),
      }}>
        <div>
          A<span style={{ color: palette.text() }}>a</span>
        </div>
        {palette.mood() === Moods.Positive && (<ThumbUp className="mood positive"/>)}
        {palette.mood() === Moods.Negative && (<ThumbDown className="mood negative"/>)}
      </IconButton>
    </div>
  );
};
export default PaletteInkwell;
