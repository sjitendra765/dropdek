import React, { useEffect, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import InfoIcon from '@material-ui/icons/Info';
import axios from "axios";
import { useForkRef } from "@material-ui/core";
import { useMe } from "../../common/api/sdk/hooks/PeopleHooks";
import Dropdeck from "../../common/api/sdk/Dropdeck";
import { logger } from "../../common/util/logger";
import AppThemeUtils from "../../AppThemeUtils";
import LogoDark from "../../common/components/dropdeck-logo-preview-dark.png";
import LogoLight from "../../common/components/dropdeck-logo-preview.png";
import LogoEditor from "../../common/components/theme/LogoEditor";
import Colors from "../../Colors";
import ColorPicker from "../../common/components/theme/ColorPicker";
import { useUpdateBranding } from "../../common/api/sdk/hooks/BrandingHooks";
import ChooseFonts from "../../common/components/theme/ChooseFonts";
import { MIMETypes } from "../../common/util/MimeTypes";
import { config } from '../../config';
import { apiHost } from "../../App";
import Label from "../../common/components/controls/Label";

const useStyles = makeStyles((theme) => ({
  root: {
    boxSizing: 'border-box',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(2),
    alignItems: 'center',
    ...AppThemeUtils(theme).background.base.normal,
  },

  paper: {
    borderRadius: 7,
    width: 500,
    ...AppThemeUtils(theme).shadows.topCenter,
    ...AppThemeUtils(theme).background.top.normal,
    display: 'flex',
    alignItems: 'center',
    textAlign: "center",
    padding: 20,
    paddingBottom: 40,
    paddingTop: 40,
    justifyContent: 'center',
    flexDirection: 'column',
    flexWrap: 'wrap',
  },

  logo: {
    display: "block",
    backgroundImage: `url(${theme.dark() ? LogoDark : LogoLight})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: 230,
    height: 30,
    width: 230,
    marginTop: 20,
    marginBottom: 10,
  },

  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },

  section: {
    marginBottom: '2rem',
    padding: 0
  },

  helperText: {
    margin: "auto",
    marginTop: 10,
    maxWidth: "70%",
    color: theme.palette.text.secondary,
    fontSize: "0.8em"
  },

  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Branding = () => {

  const [me] = useMe();
  // const [updateCompany, { company }] = useUpdateCompany();
  const [setUpdate, { branding }] = useUpdateBranding();

  const theme = useTheme();

  const [currentBranding, setCurrentBranding] = useState();
  const [logo, setLogo] = useState();
  const [icon, setIcon] = useState();
  const [fonts, setFonts] = useState(undefined);
  const [colors, setColors] = useState(undefined);
  const [logoBackgroundColor, setLogoBackgroundColor] = useState(undefined);
  const [iconBackgroundColor, setIconBackgroundColor] = useState(undefined);
  const [solidLogoError, setSolidLogoError] = useState(false);
  const [transparentLogoError, setTransparentLogoError] = useState(false);

  const [titleFontFound, setTitleFontFound] = useState(false);
  const [textFontFound, setTextFontFound] = useState(false);

  useEffect(() => {
    if (me) {
      Dropdeck.service("branding/company", me.company.domain)
        .then((payload) => {
          let branding = {};
          if (payload.data.branding) {
            branding = payload.data.branding;

            if (Array.isArray(branding) && branding.length > 0) {
              // eslint-disable-next-line prefer-destructuring
              branding = branding[0];
            }

            if (!branding.logo) {
              branding.logo = {};
            }
            if (!branding.icon) {
              branding.icon = {};
            }

            branding.icon.image = branding.icon && branding.icon.image;
            branding.logo.image = branding.logo && branding.logo.image;
          }
          setCurrentBranding(branding);

          setLogo(branding.logo);
          setIcon(branding.icon);

          if (branding.logo.whiteOnTransparent) {
            setLogoBackgroundColor(branding.colors.accent);
          } else {
            setLogoBackgroundColor(branding.logo.bgColor);
          }

          if (branding.icon.whiteOnTransparent) {
            setIconBackgroundColor(branding.colors.accent);
          } else {
            setIconBackgroundColor(branding.icon.bgColor);
          }

          setFonts(branding.fonts);
          setColors(branding.colors);
        })
        .catch((e) => logger.error(e));
    }
  }, [me]);

  const updateBranding = async () => {
    const updatedBranding = currentBranding;

    updatedBranding.logo = logo;
    if (updatedBranding.logo) {
      updatedBranding.logo.bgColor = logoBackgroundColor;
    } else {
      updatedBranding.logo = { ...updateBranding.logo, bgColor: logoBackgroundColor };
    }

    updatedBranding.icon = icon;
    if (updatedBranding.icon) {
      updatedBranding.icon.bgColor = iconBackgroundColor;
    } else {
      updatedBranding.icon = { ...updateBranding.icon, bgColor: iconBackgroundColor };
    }

    if (!titleFontFound) {
      fonts.title = { name: null, provider: null };
    }

    if (!textFontFound) {
      fonts.text = { name: null, provider: null };
    }

    updatedBranding.fonts = fonts;

    setUpdate(currentBranding._id, updatedBranding);
  };

  useEffect(() => {
    if (branding) {
      if (me.allowed) {
        window.location = config.app.paths.home;
      } else if (!me.allowed) {
        window.location = `${config.app.paths.signup}/pending`;
      }
    }
  }, [branding]);

  const classes = useStyles();

  const updateLogoAndIcon = async (logoFile, type, mimeType) => {
    let data;
    try {
      data = new FormData();
      data.append("files", logoFile);
      const result = await axios.post(`${apiHost()}/services/media/logos`, data);

      if (result.data.metadata.whiteOnTransparent) {
        result.data.metadata.bgColor = colors?.accent;
      }

      if (type === "transparent") {
        setLogo({
          ...logo,
          ...result.data.metadata,
          image: mimeType !== MIMETypes.SVG ? process.env.REACT_APP_API_HOST + result.data.filePath : null,
          svg: mimeType === MIMETypes.SVG ? process.env.REACT_APP_API_HOST + result.data.filePath : null,
        });
        setLogoBackgroundColor(result.data.metadata.bgColor);
      } else if (type === "solid") {
        setIcon({
          ...icon,
          ...result.data.metadata,
          image: mimeType !== MIMETypes.SVG ? process.env.REACT_APP_API_HOST + result.data.filePath : null,
          svg: mimeType === MIMETypes.SVG ? process.env.REACT_APP_API_HOST + result.data.filePath : null
        });
        setIconBackgroundColor(result.data.metadata.bgColor);
      }

    } catch (e) {
      return (type === "transparent") ? setTransparentLogoError(true) : setSolidLogoError(true);
    }
  };
  const handleChangeLogo = async (logoType, logoImage, logoFile, mimeType) => {
    if (logoType === 'transparent') {
      setLogo({
        ...logo,
        bgColor: null,
        whiteOnTransparent: null,
        height: null,
        width: null,
        image: logoImage
      });
      setLogoBackgroundColor(null);
      await updateLogoAndIcon(logoFile, logoType, mimeType);
    } else if (logoType === 'solid') {
      setIcon({
        ...icon,
        whiteOnTransparent: null,
        bgColor: null,
        height: null,
        width: null,
        image: logoImage
      });
      setIconBackgroundColor(null);
      await updateLogoAndIcon(logoFile, logoType, mimeType);
    }
  };

  const onSelectTitle = (font, provider) => {
    setFonts({ ...fonts, title: { name: font, provider } });
  };

  const onSelectText = (font, provider) => {
    setFonts({ ...fonts, text: { name: font, provider } });
  };

  return (
    <div className={classes.root}>
      <div className={classes.paper}>
        <div className={classes.logo}/>
        <Label variant="h2">
          About your brand
        </Label>

        <Label variant="h5" style={{ marginTop: 10 }}>
          Dropdeck tries to automatically determine key aspects of your brand such as logos, colours and typography.
        </Label>

        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              {me && me.company && me.company.description && (
                <div className={classes.section} style={{ padding: 10, borderRadius: 7, background: theme.dark() ? theme.palette.label.light : theme.palette.background.elev04 }}>
                  <Label variant="h3" style={{ padding: 0 }}>
                    {me && me.company && me.company.name}
                  </Label>
                  <Label className={classes.helperText} style={{ fontStyle: "italic", maxWidth: "85%", marginBottom: 15 }}>
                    {me && me.company && me.company.description}
                  </Label>
                </div>
              )}

              <div className={classes.section}>
                <Label variant="h3">
                  Logo
                </Label>
                <Label className={classes.helperText} style={{ marginBottom: 20 }}>
                  <b>Click the logos</b> or <b>drag and drop</b> new images to replace the ones we automatically detected for {me && me.company && me.company.name}.
                </Label>

                <Label variant="h4" style={{ margin: 10 }}>Primary Logo</Label>
                <LogoEditor height={logo && logo.height} width={logo && logo.width} error={transparentLogoError} logo={(logo && logo.svg) || (logo && logo.image) || (branding && branding.logo && branding.logo.svg) || (branding && branding.logo && branding.logo.image)} notFound={!logo || !logo.image} colors={colors} backgroundColor={logoBackgroundColor} setLogoBackgroundColor={setLogoBackgroundColor} isWhiteOnTransparent={logo?.whiteOnTransparent} transparent onChangeLogo={handleChangeLogo} />

                <Label variant="h4" style={{ margin: 10 }}>Secondary Logo</Label>
                <LogoEditor height={icon && icon.height} width={icon && icon.width} error={solidLogoError} logo={(icon && icon.svg) || (icon && icon.image) || (branding && branding.icon && branding.icon.svg) || (branding && branding.icon && branding.icon.image)} notFound={!logo || !logo.imageSolid} colors={colors} backgroundColor={iconBackgroundColor} setLogoBackgroundColor={setIconBackgroundColor} isWhiteOnTransparent={icon?.whiteOnTransparent} onChangeLogo={handleChangeLogo}/>
              </div>

              <div className={classes.section} style={{ marginBottom: 40 }}>
                <Label variant="h3">
                  Colors
                </Label>
                <ColorPicker colors={colors} />
              </div>

              <div className={classes.section} style={{ marginBottom: 40 }}>
                <Label variant="h3">
                  Typography
                </Label>
                <ChooseFonts defaultFonts={currentBranding && currentBranding.fonts} fonts={fonts} onSelectText={onSelectText} onSelectTitle={onSelectTitle} setTitleFontFound={setTitleFontFound} setTextFontFound={setTextFontFound}/>
              </div>

              <div className={classes.section}>
                <Button onClick={updateBranding} variant="contained" size="large" color="primary" style={{ margin: 10 }}>Use branding (recommended)</Button>
                <Button size="medium" href={config.app.paths.home} variant="outlined" color="primary" style={{ margin: 10 }}>Skip</Button>
              </div>

              <div className={classes.section} style={{ fontSize: "0.8em" }}>
                <InfoIcon/>
                <Label>This feature is still in active development.<br/>Let us know of any issues <a style={{ pointerEvents: "auto", color: Colors.secondary() }} href="https://dropdeck.freshdesk.com/" target="_new">here</a>.</Label>
              </div>

            </Grid>
          </Grid>
        </form>
      </div>
    </div>
  );
};
export default Branding;
