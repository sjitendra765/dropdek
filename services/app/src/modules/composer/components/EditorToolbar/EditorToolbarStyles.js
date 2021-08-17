import { makeStyles } from "@material-ui/styles";
import LogoDark from "../../../../common/components/dropdeck-logo-light.png";
import LogoLight from "../../../../common/components/dropdeck-logo-dark.png";

const dimensions = {
  md: {
    blockFormattingMenu: 75,
    dropdownArrow: 20,
  },
  sm: {
    blockFormattingMenu: 70,
    dropdownArrow: 20,
  }
};

export const EditorToolbarStyles = () => makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.elev01,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.palette.background.border00,
    borderBottomColor: theme.palette.background.border01,
    boxShadow: `rgba(0, 0, 0, ${theme.dark() ? 0.5 : 0.2}) 0px 6px 13px -8px, rgba(0, 0, 0, ${theme.dark() ? 0.85 : 0.2}) 0px 4px 8px -8px, rgba(0, 0, 0, 0.02) 0px -3px 8px -6px`,
    borderRadius: 6,
    padding: "0em 0 1em 16px",
    alignItems: "center",
    zIndex: 1100,
    position: "absolute",
    margin: '0',
    top: '16px',
    left: '-16px',
    right: '0px',
    [theme.breakpoints.down('xs')]: {
      top: '0',
      left: '0',
      right: '0',
      position: "fixed",
      width: "100%",
      borderRadius: "unset",
      margin: "0",
      border: "none",
      boxShadow: "none",
    },
  },

  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 10
  },

  logo: {
    marginLeft: -5,
    marginRight: 15,
    display: "block",
    opacity: theme.dark() ? 0.8 : 1,
    transform: "scale(1)",
    "&:hover": {
      opacity: 1,
      transform: "scale(1.05)",
      transition: "transform 100ms ease"
    },
    backgroundImage: `url(${theme.dark() ? LogoDark : LogoLight})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: 81,
    height: 17,
    width: 81,
    marginBottom: "-2px",
    textDecoration: 'none',
  },

  statusContainer: {
    paddingTop: 5,
    marginLeft: "auto",
    opacity: 0.85,
    marginRight: 18
  },

  support: {
    opacity: 1,
    marginTop: -1,
    marginRight: 8,
    transition: 'all 300ms ease-in-out 0',
    "& svg": {
      color: theme.palette.icon.primary,
    },
    "&:hover": {
      transform: "scale(1.1)",
      "& svg": {
        color: theme.palette.icon.primaryHover,
        background: theme.palette.icon.primaryHoverBg,
      }
    }
  },

  buttonGroup: {
    marginRight: 8,
    [theme.breakpoints.down('sm')]: {
      marginRight: 5,
    },
    '& *': {
      transition: 'all 200ms ease-in-out 0',
    },
  },

  controls: {
    margin: 0,
    display: "flex",

    "& div.MuiToggleButtonGroup-root, & div.MuiButtonGroup-root": {
      zIndex: 1,

      "& :not(:last-child)": {
        borderRight: "none",
      },

      "& button": {
        borderColor: theme.palette.background.border01,
        backgroundImage: `linear-gradient(0deg, ${theme.palette.gradient.stop01} 3%, ${theme.palette.gradient.stop02} 100%)`,
        height: 30,
        width: 37,
        "&:hover": {
          backgroundImage: `linear-gradient(0deg, ${theme.palette.gradient.stop01} 0%, ${theme.palette.gradient.stop02} 50%)`,
          "& *": {
            color: theme.palette.text.primary,
          },
        },
        [theme.breakpoints.down('lg')]: { width: 37 },
        [theme.breakpoints.down('md')]: { width: 42 },
        [theme.breakpoints.down('sm')]: { width: 35 },
        [theme.breakpoints.down('xs')]: { width: 40 },
      },

      "& svg": {
        color: theme.palette.text.secondary,
        fontSize: "1.125em"
      },

      "& button.primaryBlockIcon:nth-of-type(2) svg": {
        transform: "scale(0.84)",
        paddingTop: 1
      },

      "& .Mui-selected, & .Mui-selected:hover": {
        background: theme.palette.button.selected,
      },

      "& .Mui-selected svg": {
        color: theme.palette.text.primary,
      },

      "& .Mui-disabled": {
        background: theme.palette.button.disabled,
        "& svg": {
          opacity: theme.dark() ? '0.25' : '0.375',
        },
        "& .MuiButton-label": {
          opacity: theme.dark() ? '0.25' : '0.375',
        },
      },

      "& button.dropdownArrow": {
        width: dimensions.md.dropdownArrow,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
      },

      "& button.blockTypes": {
        width: dimensions.md.blockFormattingMenu,
        minWidth: dimensions.md.blockFormattingMenu,
        [theme.breakpoints.down('sm')]: {
          width: dimensions.sm.blockFormattingMenu,
          minWidth: dimensions.sm.blockFormattingMenu,
        },
        "& span": {
          textTransform: 'none',
        }
      }
    },
  },

  styleMenu: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.palette.background.border00,
    boxShadow: `rgba(0, 0, 0, ${theme.dark() ? 0.5 : 0.2}) 0px 6px 13px -8px, rgba(0, 0, 0, ${theme.dark() ? 0.85 : 0.2}) 0px 4px 8px -8px, rgba(0, 0, 0, 0.02) 0px -3px 8px -6px`,
    borderRadius: 4,
    marginTop: '4px',
    fontSize: "0.9em",

    '& .MuiTypography-body2': {
      fontSize: '0.9em',
    },

    "& .Mui-selected, & .Mui-selected:hover": {
      background: theme.palette.button.selected,
    },

    "& svg": {
      color: theme.palette.text.secondary,
      fontSize: "0.9em",
    },

    '& .MuiListItem-gutters': {
      paddingLeft: 8,
    },

    '& .MuiListItemIcon-root': {
      minWidth: 25,
      marginLeft: '-3px',
    },

    '& .MuiListItemText-root': {
      marginTop: 0,
      marginBottom: 0,
    },

    // Menu divider:
    "& .MuiDivider-root": {
      background: theme.palette.background.border05,
      position: 'relative',
      top: '-1px',
      marginBottom: '-2px',
      zIndex: '4',
    },
  },

  blockFormattingMenu: {
    width: (dimensions.md.blockFormattingMenu + dimensions.md.dropdownArrow),
    // [theme.breakpoints.down('sm')]: {
    //   width: (dimensions.sm.blockFormattingMenu + dimensions.sm.dropdownArrow),
    // },
  }

}), { meta: 'EditorToolbar' });
export default EditorToolbarStyles;
