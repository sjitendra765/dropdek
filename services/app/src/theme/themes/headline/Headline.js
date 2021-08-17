import { Decoration } from "slate";
import AbstractTheme from "../../AbstractTheme";
import { getPalettes } from "./components/palettes";
import { getFonts } from "./components/fonts";
import { fallbackGridRemix } from "../../../common/remix/rules/textImage/fallbackGrid/fallbackGrid";
import { fallbackGridOverride } from "./remixes/fallbackGridOverride";
import { olBoldNumberRemix } from "../../../common/remix/rules/lists/olBoldNumber/olBoldNumber";
import { textListCenteredRemix } from "../../../common/remix/rules/lists/textListCentered/textListCentered";
import { clustersTextFixedImageRemix } from "../../../common/remix/rules/clusters/clustersTextFixedImage/clustersTextFixedImage";
import { listUnorderedPanelsRemix } from "../../../common/remix/rules/lists/listUnorderedPanels/listUnorderedPanels";
import { listUnorderedPanelsOverride } from "./remixes/listUnorderedPanelsOverride";
import { olBoldNumberOverride } from "./remixes/olBoldNumberOverride";
import { textListCenteredOverride } from "./remixes/textListCenteredOverride";
import { clustersTextFixedImageOverride } from "./remixes/clustersTextFixedImageOverride";
import { textImages5050FullBleedRemix } from "../../../common/remix/rules/textImage/fullBleed/50-50/textImages5050FullBleed/textImages5050FullBleed";
import { textImages5050FullBleedOverride } from "./remixes/textImages5050FullBleedOverride";
import { imagesText5050FullBleedRemix } from "../../../common/remix/rules/textImage/fullBleed/50-50/imagesText5050FullBleed/imagesText5050FullBleed";
import { textImages2575FullBleedRemix } from "../../../common/remix/rules/textImage/fullBleed/25-75/textImages2575FullBleed/textImages2575FullBleed";
import { textImages2575FullBleedOverride } from "./remixes/textImages2575FullBleedOverride";
import { imagesText2575FullBleedRemix } from "../../../common/remix/rules/textImage/fullBleed/25-75/imagesText2575FullBleed/imagesText2575FullBleed";
import { textImage4x5050FullBleedRemix } from "../../../common/remix/rules/textImage/textImage4x5050FullBleed/textImage4x5050FullBleed";
import { textImage4x5050FullBleedOverride } from "./remixes/textImage4x5050FullBleedOverride";
import { textDefaultRemix } from "../../../common/remix/rules/text/textDefault/textDefault";
import { textDefaultOverride } from "./remixes/textDefaultOverride";
import { listSplitRemix } from "../../../common/remix/rules/lists/listSplit/listSplit";
import { listSplitOverride } from "./remixes/listSplitOverride";
import { listSiblingRemix } from "../../../common/remix/rules/lists/listSibling/listSibling";
import { listSiblingOverride } from "./remixes/listSiblingOverride";
import { textHeadingColsRemix } from "../../../common/remix/rules/text/textHeadingCols/textHeadingCols";
import { textHeadingColsOverride } from "./remixes/textHeadingColsOverride";
import { textQuote5050FullBleedRemix } from "../../../common/remix/rules/textImage/textQuote5050FullBleed/textQuote5050FullBleed";
import { textQuote5050FullBleedOverride } from "./remixes/textQuote5050FullBleedOverride";
import { quoteSimpleImageRemix } from "../../../common/remix/rules/blockQuotes/quoteSimpleImage/quoteSimpleImage";
import { quoteSimpleImageOverride } from "./remixes/quoteSimpleImageOverride";
import { clustersQuoteRoundedImageRemix } from "../../../common/remix/rules/clusters/clustersQuoteRoundImage/clustersQuoteRoundImage";
import { clustersQuoteRoundedImageOverride } from "./remixes/clustersQuoteRoundedImageOverride";
import { clustersRoundedImageRemix } from "../../../common/remix/rules/clusters/clustersRoundedImage/clustersRoundedImage";
import { clustersRoundedImageOverride } from "./remixes/clustersRoundedImageOverride";
import { clustersPanelFixedImageRemix } from "../../../common/remix/rules/clusters/clustersPanelFixedImage/clustersPanelFixedImage";
import { clustersPanelFixedImageOverride } from "./remixes/clustersPanelFixedImageOverride";
import { clustersText5050Remix } from "../../../common/remix/rules/clusters/clustersText5050/clustersText5050";
import { clustersText5050Override } from "./remixes/clustersText5050Override";
import { clustersTextFixedImageAspectRemix } from "../../../common/remix/rules/clusters/clustersTextFixedImageAspect/clustersTextFixedImageAspect";
import { clustersTextFixedImageAspectOverride } from "./remixes/clustersTextFixedImageAspectOverride";
import { textBlockbusterRemix } from "../../../common/remix/rules/text/textBlockBuster/textBlockbuster";
import { textBlockbusterOverride } from "./remixes/textBlockbusterOverride";
import { imageFullBleedRemix } from "../../../common/remix/rules/images/imageFullBleed/imageFullBleed";
import { imageFullBleedOverride } from "./remixes/imageFullBleedOverride";
import { imagesFullBleedRemix } from "../../../common/remix/rules/images/imagesFullBleed/imagesFullBleed";
import { imageFullBleedTextGradientRemix } from "../../../common/remix/rules/images/imageFullBleedTextGradient/imageFullBleedTextGradientRemix";
import { imageFullBleedTextGradientOverride } from "./remixes/imageFullBleedTextGradientOverride";
import { quoteParaColsRemix } from "../../../common/remix/rules/blockQuotes/quoteParaCols/quoteParaCols";
import { quoteParaColsOverride } from "./remixes/quoteParaColsOverride";
import { textLongformRemix } from "../../../common/remix/rules/text/textLongform/textLongform";
import { textLongformOverride } from "./remixes/textLongformOverride";
import { textListPanelsRemix } from "../../../common/remix/rules/lists/textListPanels/textListPanels";
import { textListPanelsOverride } from "./remixes/textListPanelsOverride";
import { textImage5050AspectRemix } from "../../../common/remix/rules/textImage/textImage5050Aspect/textImage5050Aspect";
import { textImage5050AspectOverride } from "./remixes/textImage5050AspectOverride";
import { logosOpenGridRemix } from "../../../common/remix/rules/logos/logosOpenGrid/logosOpenGrid";
import { logosOpenGridOverride } from "./remixes/logosOpenGridOverride";
import { logosBorderedGridRemix } from "../../../common/remix/rules/logos/logosBorderedGrid/logosBorderedGrid";
import { logosBorderedGridOverride } from "./remixes/logosBorderedGridOverride";
import { logoTextImage5050FullBleedRemix } from "../../../common/remix/rules/logos/logoTextImage5050FullBleed/logoTextImage5050FullBleed";
import { logoTextImage5050FullBleedOverride } from "./remixes/logoTextImage5050FullBleedOverride";
import { imagesWindowedRemix } from "../../../common/remix/rules/images/imagesWindowed/imagesWindowed";
import { imagesWindowedOverride } from "./remixes/imagesWindowedOverride";
import { imagesQuadWindowedRemix } from "../../../common/remix/rules/images/imagesQuadWindowed/imagesQuadWindowedRemix";
import { imagesQuadWindowedOverride } from "./remixes/imagesQuadWindowedOverride";
import { imagesAspectRemix } from "../../../common/remix/rules/images/imagesAspect/imagesAspect";
import { imagesQuadAspect } from "../../../common/remix/rules/images/imagesQuadAspect/imagesQuadAspect";
import { imagesAspectOverride } from "./remixes/imagesAspectOverride";
import { imagesQuadAspectOverride } from "./remixes/imagesQuadAspectOverride";
import { imagesMagazine3Remix } from "../../../common/remix/rules/images/imagesMagazine3/imagesMagazine3";
import { imagesMagazine4Remix } from "../../../common/remix/rules/images/imagesMagazine4/imagesMagazine4";
import { imagesMagazine3Override } from "./remixes/imagesMagazine3Override";
import { imagesMagazine4Override } from "./remixes/imagesMagazine4Override";
import { clustersPanelLandscapeRemix } from "../../../common/remix/rules/clusters/clustersPanelLandscape/clustersPanelLandscape";
import { clustersPanelLandscapeOverride } from "./remixes/clustersPanelLandscapeOverride";
import { clustersFullPanelRemix } from "../../../common/remix/rules/clusters/clustersFullPanel/clustersFullPanel";
import { clustersFullPanelOverride } from "./remixes/clustersFullPanelOverride";

export default class Headline extends AbstractTheme {
  constructor() {
    super('headline', getPalettes(), "Headline", false, getFonts());

    // --------------------------------------------------------------------------------------------
    // Element Overrides
    // Palette based variables that target slide / remix elements. Refer to palette not colorChart.
    // --------------------------------------------------------------------------------------------

    const { override } = this;

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

    override('& blockquote p').with(
      (palette) => ({
        borderLeft: `0.005em solid ${palette.title()}44 !important`,
        color: `${palette.text()} !important`,
      })
    );

    override('& .slide').with(
      (palette) => ({
        '& .container-block-quote blockquote': {
          '&:before': {
            color: `${palette.text()}`,
            background: `${palette.background()} !important`,
          },
        },
      })
    );

    // -----------------------------------------------------------
    // Theme Specific Remix Overrides
    // -----------------------------------------------------------

    // text remixes
    override(textDefaultRemix).with(textDefaultOverride);
    override(textHeadingColsRemix).with(textHeadingColsOverride);
    override(textQuote5050FullBleedRemix).with(textQuote5050FullBleedOverride);
    override(textBlockbusterRemix).with(textBlockbusterOverride);
    override(textLongformRemix).with(textLongformOverride);

    // quotes
    override(quoteSimpleImageRemix).with(quoteSimpleImageOverride);
    override(clustersQuoteRoundedImageRemix).with(clustersQuoteRoundedImageOverride);
    override(quoteParaColsRemix).with(quoteParaColsOverride);

    // clusters
    override(clustersPanelFixedImageRemix).with(clustersPanelFixedImageOverride);
    override(clustersText5050Remix).with(clustersText5050Override);
    override(clustersTextFixedImageAspectRemix).with(clustersTextFixedImageAspectOverride);
    override(clustersRoundedImageRemix).with(clustersRoundedImageOverride);
    override(clustersPanelLandscapeRemix).with(clustersPanelLandscapeOverride);
    override(clustersFullPanelRemix).with(clustersFullPanelOverride);

    // list remixes
    override(listSplitRemix).with(listSplitOverride);
    override(listSiblingRemix).with(listSiblingOverride);
    override(textListPanelsRemix).with(textListPanelsOverride);
    override(olBoldNumberRemix).with(olBoldNumberOverride);
    override(textListCenteredRemix).with(textListCenteredOverride);
    override(clustersTextFixedImageRemix).with(clustersTextFixedImageOverride);
    override(listUnorderedPanelsRemix).with(listUnorderedPanelsOverride);

    // text/image remixes
    override(textImages5050FullBleedRemix).with(textImages5050FullBleedOverride);
    override(imagesText5050FullBleedRemix).with(textImages5050FullBleedOverride);
    override(textImages2575FullBleedRemix).with(textImages2575FullBleedOverride);
    override(imagesText2575FullBleedRemix).with(textImages2575FullBleedOverride);
    override(textImage4x5050FullBleedRemix).with(textImage4x5050FullBleedOverride);
    override(textImage5050AspectRemix).with(textImage5050AspectOverride);
    override(fallbackGridRemix).with(fallbackGridOverride);

    // image remixes
    override(imageFullBleedRemix).with(imageFullBleedOverride);
    override(imagesFullBleedRemix).with(imageFullBleedOverride);
    override(imageFullBleedTextGradientRemix).with(imageFullBleedTextGradientOverride);

    // logo remixes
    override(logosOpenGridRemix).with(logosOpenGridOverride);
    override(logosBorderedGridRemix).with(logosBorderedGridOverride);
    override(logoTextImage5050FullBleedRemix).with(logoTextImage5050FullBleedOverride);

    // grid image layouts
    override(imagesWindowedRemix).with(imagesWindowedOverride);
    override(imagesQuadWindowedRemix).with(imagesQuadWindowedOverride);
    override(imagesAspectRemix).with(imagesAspectOverride);
    override(imagesQuadAspect).with(imagesQuadAspectOverride);
    override(imagesMagazine3Remix).with(imagesMagazine3Override);
    override(imagesMagazine4Remix).with(imagesMagazine4Override);

  }

  // -----------------------------------------------------------------------------------------------
  // Theme Specific Overrides
  // Overrides here will affect every slide in a deck. Layout & structural (group colour info above)
  // -----------------------------------------------------------------------------------------------

  css() {
    return {
      theme: {
        '& .slide': {
          fontSize: '50%',
          fontWeight: 400,
          lineHeight: '1.25',
          padding: "6%",
          fontFamily: '"Inter var","Helvetica Neue","Helvetica","Arial",sans-serif',
          alignItems: 'flex-start !important',
          textAlign: 'left !important',
          letterSpacing: '0.01em',
          fontFeatureSettings: '"cv10" off, "dlig" on !important',
          '& span.emphasis': {
            borderRadius: '0.05em',
          },
          '& h1': {
            fontFamily: '"Big Shoulders Display","Helvetica Neue","Helvetica","Arial",sans-serif',
            textTransform: 'uppercase',
            margin: '0 0 0.325em 0',
            padding: 0,
            lineHeight: '0.9em',
            letterSpacing: '-0.035rem',
            fontSize: '4.25em',
            fontWeight: 900,
            '& strong': {
              fontWeight: 900,
            },
            '& span.emphasis': {
              padding: "0.025em 0 0 0",
            },
          },
          '& h2': {
            margin: '0 0 0.75em 0',
            padding: 0,
            lineHeight: '1.15',
            fontWeight: 600,
            fontSize: '2.125em',
            letterSpacing: '-0.025em',
            '& strong': {
              fontWeight: 800,
            },
          },
          '& p': {
            margin: '0 0 0.75em 0',
            padding: 0,
            lineHeight: '1.25em',
            fontSize: '145%', // 125
            letterSpacing: '-0.01em',
            '& strong': {
              fontWeight: 700,
            },
          },
          '& li': {
            fontSize: '145%', // 125
            '&:before': {
              fontFamily: '"Big Shoulders Display","Helvetica Neue","Helvetica","Arial",sans-serif !important',
            },
          },
          '& .container-block-quote blockquote': {
            position: 'relative',
            '&:before, &:after': {
              fontFamily: '"Big Shoulders Display","Helvetica Neue","Helvetica","Arial",sans-serif !important',
            },
            '&:before': {
              content: '"“"',
              display: 'block',
              position: 'absolute',
              left: '-0.2em',
              top: '0.5em',
              width: '0.5em',
              height: '0.5em',
              padding: '0.225em 0',
              zIndex: '3',
              transform: 'scale(4)',
              textAlign: 'center',
              lineHeight: '1.1',
              borderRadius: '5em',
            },
            '& p': {
              marginTop: '0.5em',
              display: 'block !important',
              fontSize: '1.2em !important',
              lineHeight: '1.25 !important',
              padding: '0 0 0 1em',
              fontStyle: 'italic',
              '&:before, &:after': {
                display: 'none',
              },
            },
          },
          '& img': {
            width: '100%'
          },

          '& .sequence .cluster': {
            '& .container-heading-one': {
              fontSize: '90%',
            },
          },

        },

      }
    };
  }

}
