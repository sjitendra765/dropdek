import React, { useCallback, useState } from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { useTheme } from '@material-ui/core';
import useDimensions from "react-cool-dimensions";
import { useDropzone } from "react-dropzone";
import Breakpoints from "../../../../../../common/util/Breakpoints";
import { onDropImage } from "../../transforms/onDropImage";
import "./LightboxDropZone.scss";
// 01 One slide per image
import widgetSlideMany from "./assets/widgetSlideMany.svg";
import widgetSlideManyLm from "./assets/widgetSlideManyLm.svg";
// 02 All images on single slide
import widgetSlideSingle from "./assets/widgetSlideSingle.svg";
import widgetSlideSingleLm from "./assets/widgetSlideSingleLm.svg";
// 03 One image only
import widgetSlideSolo from "./assets/widgetSlideSolo.svg";
import widgetSlideSoloLm from "./assets/widgetSlideSoloLm.svg";
//
import { lightboxDropZoneStyles } from "./LightboxDropZone.styles";
import {
  ACCEPTED_IMAGE_TYPES,
  IMAGE_MAX_SIZE
} from "../../../../../composer/components/DeckEditor/modules/plugins/component/media/image/components/ImageDropZone";

export const DropType = {
  singleSlide: "one",
  multipleSlides: "many",
};

export const LightboxDropZone = ({ lightboxClasses, aspect, index, noOfFiles, slideValue, onWidgetDrop, ...props }) => {
  const { ref: resizeRef } = useDimensions();
  const [selectedValue, setSelectedValue] = useState("");
  const [uploadImage, setUploadImage] = useState(false);
  const onDrop = (acceptedFiles, rejectedFiles) => onDropImage(selectedValue, slideValue, uploadImage, onWidgetDrop, acceptedFiles, rejectedFiles);

  const {
    getRootProps,
  } = useDropzone({
    maxSize: IMAGE_MAX_SIZE,
    onDrop,
    onDragEnter: (event) => {
      if (event.target.closest('div').classList.contains('oneSlide')) {
        setSelectedValue(DropType.singleSlide);
        setUploadImage(true);
      } else if (event.target.closest('div').classList.contains('manySlide')) {
        setSelectedValue(DropType.multipleSlides);
        setUploadImage(true);
      } else {
        setSelectedValue("");
        setUploadImage(false);
      }
    },
    onDragLeave: () => {
      setSelectedValue("");
      setUploadImage(false);
    },
    accept: ACCEPTED_IMAGE_TYPES
  });
  const breakpoint = (props.cols === 1) ? { ...Breakpoints.slide(props.cols) } : null;

  const useStyles = useCallback(lightboxDropZoneStyles(), []);
  const classes = useStyles(props);
  const appTheme = useTheme();

  return (
    <Grid ref={resizeRef} className={`${(props.cols === 1) ? classes.selectWidgetColOne : classes.selectWidget}  ${props.selectWidgetPosition} selectwidget ${props.lastPosition ? classes.lastPosition : ''}`} {...breakpoint} >
      <div className={classes.selectWidgetInner} >
        {(noOfFiles !== 1) ? (
          <Box display="flex" flexDirection="column" justifyContent="center" height="100%" {...getRootProps()}>
            <div className={`${classes.widgetSlide} ${selectedValue === 'one' ? classes.widgetSlideHover : ''} oneSlide`}>
              <img className="widgetSlideSingle" alt="Drop here" src={appTheme.dark() ? widgetSlideSingle : widgetSlideSingleLm} width={70} height={35} />
            </div>
            <div className={classes.seperator}>
              <p>‒ or ‒</p>
            </div>
            <div className={`${classes.widgetSlide} ${selectedValue === 'many' ? classes.widgetSlideHover : ''} manySlide`}>
              <img className="widgetSlideMany" alt="Drop here" src={appTheme.dark() ? widgetSlideMany : widgetSlideManyLm} width={70} height={35} />
            </div>
          </Box>
        ) : (
          <div className={`${classes.widgetSlideOne} ${classes.solo} ${selectedValue === 'one' ? classes.widgetSlideHover : ''} oneSlide`} {...getRootProps()}>
            <img className="widgetSlideSolo" alt="Drop here" src={appTheme.dark() ? widgetSlideSolo : widgetSlideSoloLm} width={70} height={35} />
          </div>
        )}
      </div>
    </Grid>
  );
};
