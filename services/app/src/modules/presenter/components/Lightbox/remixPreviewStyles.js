import { makeStyles } from "@material-ui/styles";

export const remixPreviewStyles = () => makeStyles((theme) => ({
  root: {
    display: "block",
    overflow: "none",
    '&:first-child > div': {
      background: "radial-gradient(ellipse at center, #262628 0%, #262628 50%, #1D1D1F 80%)",
      boxShadow: 'none',
    },
  },
  container: {
    overflowX: "scroll",
    "-ms-overflow-style": "none",
    scrollBarWidth: "none",
    whiteSpace: "nowrap",
    width: "auto",
    "&::-webkit-scrollbar": {
      display: "none"
    }
  },
  wrapper: {
    width: 250,
    display: "inline-block",
    marginLeft: 8,
    marginRight: 8,
    verticalAlign: "top",
    overflow: 'hidden',
    whiteSpace: "normal",
    border: '2px solid transparent',
    borderRadius: '3px',
    transition: '250ms all ease-in 0s',
    boxSizing: 'border-box',
    transform: 'scale(0.965)',
    cursor: 'pointer',
    '&:hover': {
      transform: 'scale(1)',
    },
    "& a": {
      userSelect: "none",
      pointerEvents: "none"
    }
  },
  activeRemix: {
    borderColor: theme.palette.primary.main,
    transform: 'scale(1)',
  },
  paginateRemix: {
    position: 'absolute',
    top: 18,
    bottom: 18,
    zIndex: 2,
    padding: '0 0.3em',
    '& button': {
      height: '100%',
      borderRadius: 0,
      color: '#fff',
      '&.Mui-disabled': {
        background: 'transparent',
        color: 'transparent',
      },
      '& svg': {
        transition: '250ms all ease-in-out 0s',
        transform: 'scale(1.25)',
      },
      '&:hover svg': {
        transform: 'scale(1.65)',
        color: '#fff',
        textShadow: '0px 2px 4px rgba(0,0,0,0.25)',
      },
    },
    '&:first-of-type': {
      left: '0',
      '& button': {
        background: 'linear-gradient(270deg,rgba(0,0,0,0) 0%,#202020 95%,#202020)',
      },
    },
    '&:last-of-type': {
      right: '0',
      '& button': {
        background: 'linear-gradient(90deg,rgba(0,0,0,0) 0%,#202020 95%,#202020)',
      },
    },
  },
}), { meta: 'RemixPreview' });
