import { makeStyles } from "@material-ui/styles";

export const templateMenuStyles = () => makeStyles((theme) => ({
  root: {
    position: "relative",
  },
  leftFade: {
    zIndex: 11,
    top: 2,
    left: -1,
    position: "absolute",
    width: 1,
    height: 93,
    boxShadow: `${theme.dark() ? "rgba(42, 42, 42, 1)" : "rgb(237, 237, 239)"} 0px 0px 5px 7px`,
  },
  container: {
    overflowX: "scroll",
    "-ms-overflow-style": "none",
    scrollBarWidth: "none",
    whiteSpace: "nowrap",
    width: "auto",
    "&::-webkit-scrollbar": {
      display: "none"
    },
  },
  wrapper: {
    width: 150,
    height: 95,
    border: `1px solid ${theme.palette.background.border00}`,
    display: "inline-block",
    marginLeft: 2,
    marginRight: 8,
    verticalAlign: "top",
    overflow: 'hidden',
    whiteSpace: "normal",
    borderRadius: '3px',
    transition: '250ms all ease-in 0s',
    boxSizing: 'border-box',
    "&:first-of-type": {
      marginLeft: 10
    },
    "&:last-of-type": {
      marginRight: 86
    }
  },
  loadMoreSpinner: {
    justifyContent: 'center',
    alignItems: 'center',
    boxSizing: 'border-box',
    display: 'flex',
    '& .icon': {
      position: 'absolute',
      zIndex: 10,
      margin: '2.5rem 0'
    }
  },
  moreButton: {
    zIndex: 5,
    display: "flex",
    alignItems: "center",
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
    position: "absolute",
    background: `${theme.palette.type === "dark" ? "rgba(42,42,42,0.75)" : "rgb(237 237 239 / 92%)"}`,
    backdropFilter: 'blur(4px) saturate(1.5)',
    top: -10,
    right: -10,
    height: 115,
    padding: "0 12px 0 0px",
    "& button": {
      color: theme.palette.text.primary,
      margin: 8,
      marginTop: 6,
      boxShadow: `${theme.palette.type === "dark" ? "inset 0px 1px 0px rgba(255,255,255,10%), 0px 1px 0px rgba(255,255,255,10%)" : "inset 0px 1px 2px rgb(0 0 0 / 6%), 0px 1px 0px rgb(255 255 255 / 50%), 0px -1px 0px rgb(255 255 255 / 50%)"}`,
      border: `1px solid ${theme.palette.type === "dark" ? "rgba(0,0,0,0.45)" : "rgba(0,0,0,0.075)"}`,
      borderRadius: 7,
      marginRight: 6,
      padding: "4px 18px",
      minHeight: 38,
      textTransform: "unset",
      fontWeight: 500,
      // color: '#fff',
      background: `${theme.palette.type === "dark" ? "rgba(0,0,0,0.07)" : "rgba(0,0,0,0.025)"}`,
      transition: "all 200ms ease-in",
      opacity: 1,
      "&:hover": {
        transition: "all 200ms ease-in",
        background: `${theme.palette.type === "dark" ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.25)"}`,
      },
      "&:active": {
        boxShadow: "none",
        background: `${theme.palette.type === "dark" ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,1)"}`,
        color: `${theme.palette.type === "dark" ? "#fff" : theme.palette.primary.main}`,
      },
    }
  }
}));
