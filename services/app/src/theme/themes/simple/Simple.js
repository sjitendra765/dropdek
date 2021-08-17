import AbstractTheme from "../../AbstractTheme";
import { getPalettes } from "./components/palettes";
import { fallbackGridRemix } from "../../../common/remix/rules/textImage/fallbackGrid/fallbackGrid";
import { fallbackGridOverride } from "./remixes/fallbackGridOverride";
import { textListCenteredRemix } from "../../../common/remix/rules/lists/textListCentered/textListCentered";
import { textListCenteredOverride } from "./remixes/textListCenteredOverride";
import { textBlockbusterRemix } from "../../../common/remix/rules/text/textBlockBuster/textBlockbuster";
import { textBlockbusterOverride } from "./remixes/textBlockbusterOverride";
import { clustersText5050Remix } from "../../../common/remix/rules/clusters/clustersText5050/clustersText5050";
import { clustersText5050Override } from "./remixes/clustersText5050Override";
import { textHeadingColsRemix } from "../../../common/remix/rules/text/textHeadingCols/textHeadingCols";
import { textHeadingColsOverride } from "./remixes/textHeadingColsOverride";
import { imageFullBleedTextGradientRemix } from "../../../common/remix/rules/images/imageFullBleedTextGradient/imageFullBleedTextGradientRemix";
import { imageFullBleedTextGradientOverride } from "./remixes/imageFullBleedTextGradientOverride";
import { boxOutTextLeftRemix, boxOutTextRightRemix } from "../../../common/remix/rules/containedCover/containedCover";
import { boxoutTextOverride } from "./remixes/boxoutTextOverride";
import { clustersTextFixedImageRemix } from "../../../common/remix/rules/clusters/clustersTextFixedImage/clustersTextFixedImage";
import { clustersTextFixedImageOverride } from "./remixes/clustersTextFixedImageOverride";
import { textImage5050AspectRemix } from "../../../common/remix/rules/textImage/textImage5050Aspect/textImage5050Aspect";
import { textImage5050AspectOverride } from "./remixes/textImage5050AspectOverride";
import { quoteSimpleImageRemix } from "../../../common/remix/rules/blockQuotes/quoteSimpleImage/quoteSimpleImage";
import { quoteSimpleImageOverride } from "./remixes/quoteSimpleImageOverride";
import { imageFullBleedRemix } from "../../../common/remix/rules/images/imageFullBleed/imageFullBleed";
import { imageFullBleedOverride } from "./remixes/imageFullBleedOverride";
import { logosBorderedGridRemix } from "../../../common/remix/rules/logos/logosBorderedGrid/logosBorderedGrid";
import { logosBorderedGridOverride } from "./remixes/logosBorderedGridOverride";
import { clustersPanelFixedImageRemix } from "../../../common/remix/rules/clusters/clustersPanelFixedImage/clustersPanelFixedImage";
import { clustersPanelFixedImageOverride } from "./remixes/clustersPanelFixedImageOverride";
import { listUnorderedPanelsRemix } from "../../../common/remix/rules/lists/listUnorderedPanels/listUnorderedPanels";
import { listUnorderedPanelsOverride } from "./remixes/listUnorderedPanelsOverride";
import { imageAspectRemix } from "../../../common/remix/rules/images/imageAspect/imageAspect";
import { imageAspectOverride } from "./remixes/imageAspectOverride";
import { textListPanelsRemix } from "../../../common/remix/rules/lists/textListPanels/textListPanels";
import { textListPanelsOverride } from "./remixes/textListPanelsOverride";
import { textDefaultRemix } from "../../../common/remix/rules/text/textDefault/textDefault";
import { textDefaultOverride } from "./remixes/textDefaultOverride";
import { imagesFullBleedRemix } from "../../../common/remix/rules/images/imagesFullBleed/imagesFullBleed";
import { olBoldNumberRemix } from "../../../common/remix/rules/lists/olBoldNumber/olBoldNumber";
import { olBoldNumberOverride } from "./remixes/olBoldNumberOverride";
import { videoTextRemix } from "../../../common/remix/rules/videos/videoText/videoText";
import { videoTextOverride } from "./remixes/videoTextOverride";
import { clustersTextFixedImageAspectRemix } from "../../../common/remix/rules/clusters/clustersTextFixedImageAspect/clustersTextFixedImageAspect";
import { clustersTextFixedImageAspectOverride } from "./remixes/clustersTextFixedImageAspectOverride";
import { imagesText5050FullBleedRemix } from "../../../common/remix/rules/textImage/fullBleed/50-50/imagesText5050FullBleed/imagesText5050FullBleed";
import { imagesText5050FullBleedOverride } from "./remixes/imagesText5050FullBleedOverride";
import { textImages5050FullBleedRemix } from "../../../common/remix/rules/textImage/fullBleed/50-50/textImages5050FullBleed/textImages5050FullBleed";
import { textImages5050FullBleedOverride } from "./remixes/textImages5050FullBleedOverride";
import { imageFullBleedCaptionRemix } from "../../../common/remix/rules/images/imageFullBleedCaption/imageFullBleedCaption";
import { imageFullBleedCaptionOverride } from "./remixes/imageFullBleedCaptionOverride";
import { clustersFullPanelRemix } from "../../../common/remix/rules/clusters/clustersFullPanel/clustersFullPanel";
import { clustersFullPanelOverride } from "./remixes/clustersFullPanelOverride";

export default class Simple extends AbstractTheme {
  constructor(id = 'simple', palettes = getPalettes(), name = "Simple and Elegant", branded) {
    super(id, palettes, name, branded || false);

    const { override } = this;

    // --------------------------------------------------------------------------------------------
    // Element Overrides
    // Palette based variables that target slide / remix elements. Refer to palette not colorChart.
    // --------------------------------------------------------------------------------------------

    override('& h2').with(
      (palette) => ({
        color: `${palette.subtitle()}`,
      })
    );
    override('& li').with(
      (palette) => ({
        color: `${palette.accentColor} !important`,
        '&:before': {
          color: palette.accentColor,
        },
      })
    );
    override('& span.mark').with(
      (palette) => ({
        backgroundColor: palette.accentColor,
      })
    );
    override('& blockquote').with(
      (palette) => ({
        '& P:before, & P:after': {
          color: palette.accentColor,
        },
      })
    );
    override('& .slide.ol-boldnumber ol, & .slide.ol-boldnumber ol li').with(
      (palette) => ({
        borderColor: `${palette.accent()} !important`,
        '&:before': {
          color: palette.accentColor,
        },
      })
    );

    // -----------------------------------------------------------
    // Theme Specific Remix Overrides
    // -----------------------------------------------------------

    // text remixes
    override(textDefaultRemix).with(textDefaultOverride);

    // quotes
    override(quoteSimpleImageRemix).with(quoteSimpleImageOverride);

    // clusters
    override(clustersPanelFixedImageRemix).with(clustersPanelFixedImageOverride);
    override(clustersText5050Remix).with(clustersText5050Override);
    override(clustersTextFixedImageRemix).with(clustersTextFixedImageOverride);
    override(clustersTextFixedImageAspectRemix).with(clustersTextFixedImageAspectOverride);
    override(clustersFullPanelRemix).with(clustersFullPanelOverride);

    // list remixes
    override(textListCenteredRemix).with(textListCenteredOverride);
    override(listUnorderedPanelsRemix).with(listUnorderedPanelsOverride);
    override(textListPanelsRemix).with(textListPanelsOverride);
    override(olBoldNumberRemix).with(olBoldNumberOverride);

    // text/image remixes
    override(textImage5050AspectRemix).with(textImage5050AspectOverride);
    override(textBlockbusterRemix).with(textBlockbusterOverride);
    override(textHeadingColsRemix).with(textHeadingColsOverride);
    override(imageFullBleedTextGradientRemix).with(imageFullBleedTextGradientOverride);
    override(boxOutTextLeftRemix).with(boxoutTextOverride);
    override(boxOutTextRightRemix).with(boxoutTextOverride);
    override(imagesText5050FullBleedRemix).with(imagesText5050FullBleedOverride);
    override(textImages5050FullBleedRemix).with(textImages5050FullBleedOverride);
    override(imageFullBleedCaptionRemix).with(imageFullBleedCaptionOverride);

    // image remixes
    override(imageFullBleedRemix).with(imageFullBleedOverride);
    override(imagesFullBleedRemix).with(imageFullBleedOverride);
    override(imageAspectRemix).with(imageAspectOverride);
    override(imageAspectRemix).with(imageAspectOverride);

    // logo remixes
    override(logosBorderedGridRemix).with(logosBorderedGridOverride);

    // grid image layouts
    override(fallbackGridRemix).with(fallbackGridOverride);

    // video remixes
    override(videoTextRemix).with(videoTextOverride);

  }

  // Theme Specific Overrides
  // Overrides here will affect every slide in a deck. Layout & structural (group colour info above)
  // -----------------------------------------------------------------------------------------------

  css() {
    return {
      theme: {
        '& .slide': {
          fontSize: '60%', // 65
          fontWeight: 400,
          lineHeight: '1.25',
          padding: "9%",
          fontFamily: '"SF Pro Text","SF Pro Icons","Helvetica Neue","Helvetica","Arial",sans-serif',
          justifyContent: 'center !important',
          alignItems: 'flex-start !important',
          textAlign: 'left !important',
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
            fontWeight: 500,
            lineHeight: '1.25',
            letterSpacing: '-0.01em',
            '& strong': {
              fontWeight: 900,
            },
          },
          '& p': {
            margin: '0 0 0.75em 0',
            padding: 0,
            lineHeight: '1.25',
            fontSize: '1.325em',
            letterSpacing: '-0.01em',
            fontWeight: 400,
            '& strong': {
              fontWeight: 700,
            },
          },
          '& ol, & ul': {
            '& li': {
              fontSize: '1.325em',
              margin: '0.25em 0 0.5em 1.5em !important',
              boxSizing: 'border-box',
            },
          },
          '& blockquote': {
            '& p': {
              fontWeight: 600,
              letterSpacing: '-0.025em',
              '& strong': {
                fontWeight: 800,
              },
            },
          },
          '& code': {
            boxSizing: 'border-box',
          },
          '& img': {
            width: '100%'
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
        },

      },
    };
  }
}
