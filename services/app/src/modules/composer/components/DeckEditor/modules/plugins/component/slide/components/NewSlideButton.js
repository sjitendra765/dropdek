import React, { useCallback, useState } from "react";
import { IconButton } from "@material-ui/core";
import { ReactEditor, useEditor } from "slate-react";
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from "@material-ui/styles";
import Colors from "../../../../../../../../../Colors";
import { MAX_SCALING } from "../../../../../../../../presenter/components/Slide/scalingLimits";
import { CLASS_NOT_COPIED } from "../../../deserializers/html/withDeserializeHtml";
import { HEADING_ONE } from "../../heading/one/type";

const SCALING_STARTS = MAX_SCALING;
const MAX_SCALING_WARNING = 0.6 * MAX_SCALING;

/**
 * Local styles.
 *
 * @type {(props?: any) => ClassNameMap<"button"|"root"|"text">}
 */
const useStylesGenerator = () => makeStyles((theme) => ({
  root: {
    padding: '6px 8px',
    margin: '0 0 0 -8px',
    display: "flex",
    alignItems: "center",
    fontSize: "0.725em",
    cursor: 'text',
    "&:hover": {
      "& button": {
        transform: "scale(0.6)",
        transition: "transform 300ms ease",
      },
      "& span.new-slide-helper-text": {
        fontWeight: '500',
        transform: "translateX(20%)",
        transition: "transform 300ms ease",
        "&.scaling": {
          transform: "translateX(50%)",
        }
      },
    },
    "& .new-slide-group": {
      paddingRight: '30px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: "center",
    },
  },
  button: {
    zIndex: 1,
    transform: "scale(0.6)",
  },
  text: {
    color: theme.palette.text.primary,
    fontWeight: 600,
    transform: "translateX(-25%)",
  },
}), { meta: 'NewSlideButton' });

/**
 * Styling to be included in {@link DeckEditorStyles}.
 *
 * @type {{last: {"& .new-slide-container": {"& .new-slide-button": {opacity: number}}}, main: {"& .new-slide-container.scaling .new-slide-button, .new-slide-container.scaling .new-slide-message": {color: string, position: string, opacity: string}, "& .new-slide-container.scaling .new-slide-message": {transform: string, transition: string}, "& .new-slide-container .new-slide-button": {opacity: number}, "& .new-slide-container .new-slide-message": {transform: string, left: number, position: string, opacity: number}}}}
 */
export const NewSlideButtonStyling = {
  main: (theme) => ({
    "&:not(.selected) .new-slide-container": {
      position: "absolute",
      opacity: 1,
      left: -300,
    },
    "& .new-slide-container:not(.scaling)": {
      position: "absolute",
      opacity: 0,
      left: -150,
      "& .new-slide-button": {
        opacity: 0.1,
      },
      "& .new-slide-message": {
        position: "absolute",
        left: -100,
        transform: "translate(-30%)",
        opacity: 0,
      }
    },

    "&.selected .new-slide-container.scaling": {
      // 01 Scaling limit reached - Urgent suggestion
      "&.scaling .new-slide-label": {
        display: "none"
      },
      "&.max": {
        "& .new-slide-label": {
          display: 'none',
        },
        "& .new-slide-button": {
          background: `${Colors.primary(0.2)} !important`,
          border: `1px solid ${Colors.primary(0.1)}`,
          opacity: "1 !important",
          color: `${Colors.primary(1)}`,
        },
        "& .new-slide-message": {
          color: `${Colors.primary(1)} !important`,
          opacity: "1 !important",
        },
        "& .new-slide-group:hover": {
          "& .new-slide-button": {
            opacity: theme.dark() ? "1 !important" : "1 !important", // 0.2 1
            border: `1px solid ${Colors.primary(0.1)}`,
            background: `${Colors.primary(1)} !important`,
            color: "#ffffff !important",
            transform: "scale(0.75)",
            transition: "transform 300ms ease",
          },
          "& .new-slide-message": {
            opacity: theme.dark() ? "1 !important" : "1 !important", // 0.2 1
            color: theme.palette.text.primary,
            transition: "transform 300ms ease",
          },
        },
      },

      // 02 Slide content scaling - subtle suggestion
      "&:not(.max)": {
        "& .new-slide-button": {
          opacity: theme.dark() ? "0.5 !important" : "0.8 !important",
          border: theme.dark() ? `1px solid ${theme.palette.icon.primaryInset}` : `1px solid ${theme.palette.background.border00}`,
          background: theme.dark() ? theme.palette.icon.primaryInset : `linear-gradient(0deg, ${theme.palette.gradient.stop01} 3%, ${theme.palette.gradient.stop02} 100%)`,
        },
        "& .new-slide-group:hover": {
          "& .new-slide-button": {
            opacity: theme.dark() ? "1 !important" : "1 !important",
            boxShadow: theme.dark() ? "inset 0px -1px 2px 0px rgb(0 0 0 / 10%), inset 0px -1px 1px 0px rgb(0 0 0 / 10%)" : "inset 0px -1px 2px 0px rgb(0 0 0 / 6%), inset 0px -1px 1px 0px rgb(0 0 0 / 6%)",
            border: theme.dark() ? `1px solid ${theme.palette.background.border02}` : `1px solid ${theme.palette.background.border01}`,
            background: theme.dark() ? "linear-gradient(top,#3d3d3f 0%,#363637 25%)" : `linear-gradient(0deg, ${theme.palette.gradient.stop01} 3%, ${theme.palette.gradient.stop02} 100%)`,
            transform: "scale(0.75)",
            transition: "transform 300ms ease",
          },
          "& .new-slide-message": {
            opacity: theme.dark() ? "1 !important" : "1 !important",
            color: theme.palette.text.primary,
            transition: "transform 300ms ease",
          },
        },
      },
      "& .new-slide-button, .new-slide-message": {
        position: "static",
        opacity: "0.5 !important",
      },
      "& .new-slide-message": {
        transform: "translate(10%)",
        transition: "transform 1000ms ease, opacity 500ms ease"
      },
    },
  }),
  last: (theme) => ({
    // 03 End of Deck prompt
    "& .new-slide-container:not(.scaling)": {
      position: "static",
      opacity: 1,
      "& .new-slide-button": {
        opacity: theme.dark() ? "0.5 !important" : "0.8 !important",
        border: theme.dark() ? `1px solid ${theme.palette.icon.primaryInset}` : `1px solid ${theme.palette.background.border00}`,
        background: theme.dark() ? theme.palette.icon.primaryInset : `linear-gradient(0deg, ${theme.palette.gradient.stop01} 3%, ${theme.palette.gradient.stop02} 100%)`,
      },
      "& .new-slide-label": {
        opacity: theme.dark() ? "0.8 !important" : "0.6 !important",
        marginLeft: 5,
        marginRight: -4,
      },
      "& .new-slide-group:hover": {
        "& .new-slide-button": {
          opacity: theme.dark() ? "1 !important" : "1 !important",
          boxShadow: theme.dark() ? "inset 0px -1px 2px 0px rgb(0 0 0 / 10%), inset 0px -1px 1px 0px rgb(0 0 0 / 10%)" : "inset 0px -1px 2px 0px rgb(0 0 0 / 6%), inset 0px -1px 1px 0px rgb(0 0 0 / 6%)",
          border: theme.dark() ? `1px solid ${theme.palette.background.border02}` : `1px solid ${theme.palette.background.border01}`,
          background: theme.dark() ? "linear-gradient(top,#3d3d3f 0%,#363637 25%)" : `linear-gradient(0deg, ${theme.palette.gradient.stop01} 3%, ${theme.palette.gradient.stop02} 100%)`,
          transform: "scale(0.75)",
          transition: "transform 300ms ease",
        },
        "& .new-slide-label": {
          opacity: theme.dark() ? "1 !important" : "0.6 !important", // 0.4 0.6
          transition: "transform 300ms ease",
        },
      },
    }
  })
};

const userSelectStyles = {
  MozUserSelect: 'none',
  WebkitUserSelect: 'none',
  msUserSelect: 'none',
};

const NewSlideButton = ({ splitSlide, scaling, splitLocation }) => {

  const editor = useEditor();
  const useStyles = useCallback(useStylesGenerator(), []);
  const classes = useStyles();
  const [visible, setVisible] = useState(false);

  const onClick = (ev) => {
    splitSlide({ at: splitLocation, openingElement: HEADING_ONE });
    ReactEditor.focus(editor);
    ev.preventDefault();
  };

  const className = `${classes.root} ${CLASS_NOT_COPIED} new-slide-container ${scaling < SCALING_STARTS ? "scaling" : ""} ${scaling < MAX_SCALING_WARNING ? "max" : ""}`;
  return (
    <div contentEditable={false} style={userSelectStyles} className={className} onMouseEnter={() => setVisible(true)} onMouseLeave={() => setVisible(false)}>
      <span className="new-slide-group" role="button" tabIndex="0" onClick={onClick}>
        <IconButton style={userSelectStyles} className={`${classes.button} new-slide-button`}>
          <AddIcon/>
        </IconButton>
        <span style={userSelectStyles} className="new-slide-label">New slide</span>
        <span style={userSelectStyles} className="new-slide-message">Slide break?</span>
        <span style={{ userSelect: 'none', opacity: visible ? 0.4 : 0, marginLeft: 4 }} className={`${classes.text} new-slide-helper-text`}>&#8984; + Enter</span>
      </span>
    </div>
  );
};
export default NewSlideButton;
