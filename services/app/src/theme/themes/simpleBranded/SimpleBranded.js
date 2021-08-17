import Simple from "../simple/Simple";
import { getPalettes } from "../simple/components/palettes";
import { fallbackGridRemix } from "../../../common/remix/rules/textImage/fallbackGrid/fallbackGrid";
import { fallbackGridOverride } from "./remixes/fallbackGridOverride";
import { textListCenteredRemix } from "../../../common/remix/rules/lists/textListCentered/textListCentered";
import { textListCenteredOverride } from "./remixes/textListCenteredOverride";
import { imageFullBleedRemix } from "../../../common/remix/rules/images/imageFullBleed/imageFullBleed";
import { imageFullBleedOverride } from "./remixes/imageFullBleedOverride";
import { imageAspectRemix } from "../../../common/remix/rules/images/imageAspect/imageAspect";
import { imageAspectOverride } from "./remixes/imageAspectOverride";
import { imagesQuadAspect } from "../../../common/remix/rules/images/imagesQuadAspect/imagesQuadAspect";
import { imagesQuadAspectOverride } from "./remixes/imagesQuadAspectOverride";
import { imagesFullBleedRemix } from "../../../common/remix/rules/images/imagesFullBleed/imagesFullBleed";
import { textImages5050FullBleedRemix } from "../../../common/remix/rules/textImage/fullBleed/50-50/textImages5050FullBleed/textImages5050FullBleed";
import { textImages5050FullBleedOverride } from "./remixes/textImages5050FullBleedOverride";
import { imageFullBleedCaptionRemix } from "../../../common/remix/rules/images/imageFullBleedCaption/imageFullBleedCaption";
import { imageFullBleedCaptionOverride } from "./remixes/imageFullBleedCaptionOverride";
import { imagesMagazine3Remix } from "../../../common/remix/rules/images/imagesMagazine3/imagesMagazine3";
import { imagesMagazine3Override } from "./remixes/imagesMagazine3Override";
import { imagesMagazine4Remix } from "../../../common/remix/rules/images/imagesMagazine4/imagesMagazine4";
import { imagesMagazine4Override } from "./remixes/imagesMagazine4Override";
import { textImage5050AspectRemix } from "../../../common/remix/rules/textImage/textImage5050Aspect/textImage5050Aspect";
import { textImage5050AspectOverride } from "./remixes/textImage5050AspectOverride";
import { imagesText2575FullBleedRemix } from "../../../common/remix/rules/textImage/fullBleed/25-75/imagesText2575FullBleed/imagesText2575FullBleed";
import { imagesText2575FullBleedOverride } from "./remixes/imagesText2575FullBleedOverride";
import { imagesText5050FullBleedRemix } from "../../../common/remix/rules/textImage/fullBleed/50-50/imagesText5050FullBleed/imagesText5050FullBleed"; //
import { imagesText5050FullBleedOverride } from "./remixes/imagesText5050FullBleedOverride"; //
import { textImages2575FullBleedRemix } from "../../../common/remix/rules/textImage/fullBleed/25-75/textImages2575FullBleed/textImages2575FullBleed";
import { textImages2575FullBleedOverride } from "./remixes/textImages2575FullBleedOverride";
import { imageWindowedRemix } from "../../../common/remix/rules/images/imageWindowed/imageWindowed";
import { imageWindowedOverride } from "./remixes/imageWindowedOverride";
import { imagesWindowedRemix } from "../../../common/remix/rules/images/imagesWindowed/imagesWindowed";
import { imagesWindowedOverride } from "./remixes/imagesWindowedOverride";
import { listTextUpwardRemix } from "../../../common/remix/rules/lists/listTextUpward/listTextUpward";
import { listTextUpwardOverride } from "./remixes/listTextUpwardOverride";
import { textListPanelsRemix } from "../../../common/remix/rules/lists/textListPanels/textListPanels";
import { textListPanelsOverride } from "./remixes/textListPanelsOverride";
import { olBoldNumberRemix } from "../../../common/remix/rules/lists/olBoldNumber/olBoldNumber";
import { olBoldNumberOverride } from "./remixes/olBoldNumberOverride";
import { videoFullScreenRemix } from "../../../common/remix/rules/videos/videoFullScreen/videoFullScreen";
import { videoFullScreenOverride } from "./remixes/videoFullScreenOverride";
import { videoFullScreenCaptionRemix } from "../../../common/remix/rules/videos/videoFullScreenCaption/videoFullScreenCaption";
import { videoFullScreenCaptionOverride } from "./remixes/videoFullScreenCaptionOverride";
import { imageH1Text1005050FullBleedRemix } from "../../../common/remix/rules/textImageCover/tic1/imageH1Text1005050FullBleed/imageH1Text1005050FullBleed";
import { imageH1text1005050FullBleedOverride } from "./remixes/imageH1text1005050FullBleedOverride";
import { boxOutTextRightRemix } from "../../../common/remix/rules/containedCover/containedCover";
import { boxoutTextOverride } from "./remixes/boxoutTextOverride";
import { textLogoImage5050FullBleedRemix } from "../../../common/remix/rules/logos/textLogoImage5050FullBleed/textLogoImage5050FullBleed";
import { textLogoImage5050FullBleedOverride } from "./remixes/textLogoImage5050FullBleedOverride";
import { logoTextImage5050FullBleedRemix } from "../../../common/remix/rules/logos/logoTextImage5050FullBleed/logoTextImage5050FullBleed";
import { logoTextImage5050FullBleedOverride } from "./remixes/logoTextImage5050FullBleedOverride";
import { imageLogoText5050FullBleedRemix } from "../../../common/remix/rules/logos/imageLogoText5050FullBleed/imageLogoText5050FullBleed";
import { imageLogoText5050FullBleedOverride } from "./remixes/imageLogoText5050FullBleedOverride";
import { imageLogoText2575FullBleedRemix } from "../../../common/remix/rules/logos/imageLogoText2575FullBleed/imageLogoText2575FullBleed";
import { imageLogoText2575FullBleedOverride } from "./remixes/imageLogoText2575FullBleedOverride";

export default class SimpleBranded extends Simple {

  constructor() {
    super('clear_branded', getPalettes(), "Simple and Elegant", true);

    const { override } = this;

    // -----------------------------------------------------------
    // Theme Specific Remix Overrides
    // -----------------------------------------------------------

    // list remixes
    override(textListCenteredRemix).with(textListCenteredOverride);
    override(listTextUpwardRemix).with(listTextUpwardOverride);
    override(textListPanelsRemix).with(textListPanelsOverride);
    override(olBoldNumberRemix).with(olBoldNumberOverride);

    // text/image remixes
    override(textImage5050AspectRemix).with(textImage5050AspectOverride);
    override(imageFullBleedCaptionRemix).with(imageFullBleedCaptionOverride);
    override(imageH1Text1005050FullBleedRemix).with(imageH1text1005050FullBleedOverride);
    override(boxOutTextRightRemix).with(boxoutTextOverride);
    override(textImages5050FullBleedRemix).with(textImages5050FullBleedOverride);
    override(imagesText5050FullBleedRemix).with(imagesText5050FullBleedOverride); // *
    override(textImages2575FullBleedRemix).with(textImages2575FullBleedOverride);
    override(imagesText2575FullBleedRemix).with(imagesText2575FullBleedOverride);

    // image remixes
    override(imageFullBleedRemix).with(imageFullBleedOverride);
    override(imagesFullBleedRemix).with(imageFullBleedOverride);
    override(imageAspectRemix).with(imageAspectOverride);
    override(imagesMagazine3Remix).with(imagesMagazine3Override);
    override(imagesMagazine4Remix).with(imagesMagazine4Override);
    override(imagesQuadAspect).with(imagesQuadAspectOverride);
    override(imageWindowedRemix).with(imageWindowedOverride);
    override(imagesWindowedRemix).with(imagesWindowedOverride);

    // grid image layouts
    override(fallbackGridRemix).with(fallbackGridOverride);

    // logo layouts
    override(textLogoImage5050FullBleedRemix).with(textLogoImage5050FullBleedOverride);
    override(logoTextImage5050FullBleedRemix).with(logoTextImage5050FullBleedOverride);
    override(imageLogoText5050FullBleedRemix).with(imageLogoText5050FullBleedOverride);
    override(imageLogoText2575FullBleedRemix).with(imageLogoText2575FullBleedOverride);

    // video remixes
    override(videoFullScreenRemix).with(videoFullScreenOverride);
    override(videoFullScreenCaptionRemix).with(videoFullScreenCaptionOverride);
  }

  // -----------------------------------------------------------
  // Branding
  // -----------------------------------------------------------

  _getLogo = () => {
    if (this.branding.icon && (this.branding.icon.svg || this.branding.icon.image)) {
      return this.branding.icon;
    }

    return this.branding.logo;
  }

  _getLogoSize = () => {
    const logo = this._getLogo();

    return {
      height: logo.height,
      width: logo.width
    };
  };

  _getSizeCss = () => {
    const size = this._getLogoSize();
    const css = {};
    css.paddingTop = `calc(${size.height / size.width} * 100%)`;
    if (size.height > size.width) {
      css.width = '1.5em';
    } else if (size.width > size.height) {
      css.width = '3em';
    } else {
      css.width = '2em';
    }

    return css;
  }

  css() {
    const css = super.css();

    // Branding
    css.theme["& .deck-logo-container"] = {
      position: "absolute",
      bottom: '2.5em',
      right: '2.5em',
      zIndex: 3,
      '&:before': {
        content: '""',
        position: 'absolute',
        top: '-0.25em',
        bottom: '-0.25em',
        left: '-0.25em',
        right: '-0.25em',
        zIndex: -1,
        background: this._getLogo() && this._getLogo().bgColor ? this._getLogo().bgColor : "rgba(255,255,255,0)",
        borderRadius: '0.25em',
      },
    };
    css.theme["& .deck-logo-container-inner"] = {
      zIndex: 4,
      display: "block",
      overflow: 'hidden',
      height: 0,
      padding: 0,
      backgroundImage: `url(${this._getLogo().svg || this._getLogo().image })`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "bottom right",
      backgroundSize: "contain",
      ...this._getSizeCss()
    };

    // -----------------------------------------------------------
    // Theme Specific Overrides
    // -----------------------------------------------------------

    css.theme["& .slide"] = {
      fontSize: '65%',
      fontWeight: 400,
      padding: "2.5em",
      fontFamily: '"Inter var","Helvetica Neue","Helvetica","Arial",sans-serif',
      letterSpacing: '0.01em',
      '& h1': {
        margin: '0 0 0.5em 0',
        padding: 0,
        lineHeight: '1em',
        letterSpacing: '-0.035rem',
        fontWeight: 700,
        '& strong': {
          fontWeight: 900,
        },
        '& span.emphasis': {
          padding: '0',
          borderRadius: "0.1em",
        },
      },
      '& h2': {
        margin: '0 0 0.325em 0',
        padding: 0,
        fontSize: '1.65em',
        fontWeight: 700,
        lineHeight: '1.25',
        letterSpacing: '-0.01em',
        '& strong': {
          fontWeight: 900,
        },
      },
      '& blockquote': {
        '& p': {
          fontWeight: 700,
          letterSpacing: '-0.025em',
          '& strong': {
            fontWeight: 900,
          },
        },
      },
      '& ol, & ul': {
        '& li': {
          fontSize: '120%',
          margin: '0.25em 0 0.5em 1.5em !important',
          boxSizing: 'border-box',
        },
      },
      '& code': {
        boxSizing: 'border-box',
      },
      '& .group-text-after': {
        marginTop: '1em',
        fontSize: '95%',
        '& h1': {
          marginBottom: '0.25em',
        },
      },
      '& .group-text-before': {
        marginBottom: '1em',
        fontSize: '95%',
        '& h1': {
          marginBottom: '0.25em',
        },
      },
      '& p': {
        margin: '0 0 0.75em 0',
        padding: 0,
        lineHeight: '1.25',
        fontSize: '1.2em',
        letterSpacing: '-0.01em',
        fontWeight: 400,
        '& strong': {
          fontWeight: 600,
        },
      },
      '& img': {
        width: '100%'
      },
    };

    return css;
  }

}
