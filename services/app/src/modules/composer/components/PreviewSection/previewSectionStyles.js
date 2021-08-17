import { makeStyles } from "@material-ui/core/styles";
import LogoDark from "../../../../common/components/dropdeck-logo-preview-dark.png";
import LogoLight from "../../../../common/components/dropdeck-logo-preview.png";

export const previewSectionStyles = (readOnly, isPhoneSize) => makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.main,
    backgroundImage: readOnly ? theme.palette.background.main : `url(/dropdeck-logo-preview-greyscale.png), linear-gradient(310deg, ${ theme.dark() ? theme.palette.gradient.stop01 : "#EDEDEF"} 3%, ${ theme.dark() ? theme.palette.gradient.stop00 : "#eaeaec"} 100%)`,
    backgroundRepeat: 'no-repeat, no-repeat',
    backgroundSize: '102px, auto',
    backgroundPosition: 'calc(100% - 17.6em) calc(100% - 4.65em), center center',
    minHeight: '100vh',
    [theme.breakpoints.down('md')]: {
      backgroundPosition: 'calc(100% - 14.4em) calc(100% - 8em), center center',
    },
    [theme.breakpoints.down('sm')]: {
      backgroundPosition: 'calc(100% + 14.4em) calc(100% + 8em), center center',
    },
  },
  logo: {
    display: "block",
    backgroundImage: `url(${theme.palette.type === "dark" ? LogoDark : LogoLight})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: 131,
    height: 17,
    width: 131,
    textDecoration: 'none',
    marginLeft: 8,
    opacity: theme.dark() ? 0.8 : 1,
    transform: "scale(1)",
    "&:hover": {
      opacity: 1,
      transform: "scale(1.05)",
      transition: "transform 100ms ease"
    },
  },
}));
