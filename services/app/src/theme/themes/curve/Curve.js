import AbstractTheme from "../../AbstractTheme";
import { getPalettes } from "./components/palettes";
import { getFonts } from "./components/fonts";
import { fallbackGridRemix } from "../../../common/remix/rules/textImage/fallbackGrid/fallbackGrid";
import { fallbackGridOverride } from "./remixes/fallbackGridOverride";
import { olBoldNumberRemix } from "../../../common/remix/rules/lists/olBoldNumber/olBoldNumber";
import { olBoldNumberOverride } from "./remixes/olBoldNumberOverride";
import { textListCenteredRemix } from "../../../common/remix/rules/lists/textListCentered/textListCentered";
import { textListCenteredOverride } from "./remixes/textListCenteredOverride";
import { textHeadingColsRemix } from "../../../common/remix/rules/text/textHeadingCols/textHeadingCols";
import { textHeadingColsOverride } from "./remixes/textHeadingColsOverride";
import { clustersText5050Remix } from "../../../common/remix/rules/clusters/clustersText5050/clustersText5050";
import { clustersText5050Override } from "./remixes/clustersText5050Override";
import { imagesText5050FullBleedRemix } from "../../../common/remix/rules/textImage/fullBleed/50-50/imagesText5050FullBleed/imagesText5050FullBleed";
import { imagesText5050FullBleedOverride } from "./remixes/imagesText5050FullBleedOverride";
import { textImages5050FullBleedRemix } from "../../../common/remix/rules/textImage/fullBleed/50-50/textImages5050FullBleed/textImages5050FullBleed";
import { textImages5050FullBleedOverride } from "./remixes/textImages5050FullBleedOverride";
import { textImage4x5050FullBleedRemix } from "../../../common/remix/rules/textImage/textImage4x5050FullBleed/textImage4x5050FullBleed";
import { textImage4x5050FullBleedOverride } from "./remixes/textImage4x5050FullBleedOverride";
import { clustersTextFixedImageRemix } from "../../../common/remix/rules/clusters/clustersTextFixedImage/clustersTextFixedImage";
import { clustersTextFixedImageOverride } from "./remixes/clustersTextFixedImageOverride";
import { clustersTextFixedImageAspectRemix } from "../../../common/remix/rules/clusters/clustersTextFixedImageAspect/clustersTextFixedImageAspect";
import { clustersTextFixedImageAspectOverride } from "./remixes/clustersTextFixedImageAspectOverride";
import { boxOutTextLeftRemix, boxOutTextRightRemix } from "../../../common/remix/rules/containedCover/containedCover";
import { boxoutTextOverride } from "./remixes/boxoutTextOverride";
import { quoteSimpleImageRemix } from "../../../common/remix/rules/blockQuotes/quoteSimpleImage/quoteSimpleImage";
import { quoteSimpleImageOverride } from "./remixes/quoteSimpleImageOverride";
import { clustersQuoteRoundedImageRemix } from "../../../common/remix/rules/clusters/clustersQuoteRoundImage/clustersQuoteRoundImage";
import { clustersQuoteRoundedImageOverride } from "./remixes/clustersQuoteRoundedImageOverride";
import { clustersPanelFixedImageRemix } from "../../../common/remix/rules/clusters/clustersPanelFixedImage/clustersPanelFixedImage";
import { clustersPanelFixedImageOverride } from "./remixes/clustersPanelFixedImageOverride";
import { imagesAspectRemix } from "../../../common/remix/rules/images/imagesAspect/imagesAspect";
import { imagesAspectOverride } from "./remixes/imagesAspectOverride";
import { imagesWindowedRemix } from "../../../common/remix/rules/images/imagesWindowed/imagesWindowed";
import { imagesWindowedOverride } from "./remixes/imagesWindowedOverride";
import { imagesQuadAspect } from "../../../common/remix/rules/images/imagesQuadAspect/imagesQuadAspect";
import { imagesQuadAspectOverride } from "./remixes/imagesQuadAspectOverride";
import { imagesMagazine3Remix } from "../../../common/remix/rules/images/imagesMagazine3/imagesMagazine3";
import { imagesMagazine4Remix } from "../../../common/remix/rules/images/imagesMagazine4/imagesMagazine4";
import { imagesMagazine3Override } from "./remixes/imagesMagazine3Override";
import { imagesMagazine4Override } from "./remixes/imagesMagazine4Override";
import { listSplitRemix } from "../../../common/remix/rules/lists/listSplit/listSplit";
import { listSplitOverride } from "./remixes/listSplitOverride";
import { textImages2575FullBleedRemix } from "../../../common/remix/rules/textImage/fullBleed/25-75/textImages2575FullBleed/textImages2575FullBleed";
import { textImages2575FullBleedOverride } from "./remixes/textImages2575FullBleedOverride";
import { imagesText2575FullBleedRemix } from "../../../common/remix/rules/textImage/fullBleed/25-75/imagesText2575FullBleed/imagesText2575FullBleed";
import { imagesFullBleedRemix } from "../../../common/remix/rules/images/imagesFullBleed/imagesFullBleed";
import { imageFullBleedOverride } from "./remixes/imageFullBleedOverride";
import { imageFullBleedRemix } from "../../../common/remix/rules/images/imageFullBleed/imageFullBleed";
import { textBlockbusterOverride } from "./remixes/textBlockbusterOverride";
import { textBlockbusterRemix } from "../../../common/remix/rules/text/textBlockBuster/textBlockbuster";
import { imageH1Text1005050FullBleedRemix } from "../../../common/remix/rules/textImageCover/tic1/imageH1Text1005050FullBleed/imageH1Text1005050FullBleed";
import { imageH1text1005050FullBleedOverride } from "./remixes/imageH1Text1005050FullBleedOverride";
import { h1TextImage5050100FullBleedRemix } from "../../../common/remix/rules/textImageCover/tic1/h1TextImage5050100FullBleed/h1TextImage5050100FullBleed";
import { h1TextImage5050100FullBleedOverride } from "./remixes/h1TextImage5050100FullBleedOverride";
import { textDefaultRemix } from "../../../common/remix/rules/text/textDefault/textDefault";
import { textDefaultOverride } from "./remixes/textDefaultOverride";
import { textLongformRemix } from "../../../common/remix/rules/text/textLongform/textLongform";
import { textLongformOverride } from "./remixes/textLongformOverride";
import { textQuote5050FullBleedRemix } from "../../../common/remix/rules/textImage/textQuote5050FullBleed/textQuote5050FullBleed";
import { textQuote5050FullBleedOverride } from "./remixes/textQuote5050FullBleedOverride";
import { imageFullBleedTextGradientRemix } from "../../../common/remix/rules/images/imageFullBleedTextGradient/imageFullBleedTextGradientRemix";
import { imageFullBleedTextGradientOverride } from "./remixes/imageFullBleedTextGradientOverride";
import { textImage5050AspectRemix } from "../../../common/remix/rules/textImage/textImage5050Aspect/textImage5050Aspect";
import { textImage5050AspectOverride } from "./remixes/textImage5050AspectOverride";
import { imagesText2575FullBleedOverride } from "./remixes/imagesText2575FullBleedOverride";
import { textListPanelsRemix } from "../../../common/remix/rules/lists/textListPanels/textListPanels";
import { textListPanelsOverride } from "./remixes/textListPanelsOverride";
import { listTextUpwardRemix } from "../../../common/remix/rules/lists/listTextUpward/listTextUpward";
import { listTextUpwardOverride } from "./remixes/listTextUpwardOverride";
import { headingParagraphUpwardRemix } from "../../../common/remix/rules/text/headingParagraphUpward/headingParagraphUpward";
import { headingParagraphUpwardOverride } from "./remixes/headingParagraphUpwardOverride";
import { listUnorderedPanelsRemix } from "../../../common/remix/rules/lists/listUnorderedPanels/listUnorderedPanels";
import { listUnorderedPanelsOverride } from "./remixes/listUnorderedPanelsOverride";
import { clustersPanelLandscapeRemix } from "../../../common/remix/rules/clusters/clustersPanelLandscape/clustersPanelLandscape";
import { clustersPanelLandscapeOverride } from "./remixes/clustersPanelLandscapeOverride";
import { clustersFullPanelRemix } from "../../../common/remix/rules/clusters/clustersFullPanel/clustersFullPanel";
import { clustersFullPanelOverride } from "./remixes/clustersFullPanelOverride";

export default class Curve extends AbstractTheme {
  constructor() {
    super('curve', getPalettes(), "Curve", false, getFonts());

    const { override } = this;

    // --------------------------------------------------------------------------------------------
    // Element Overrides
    // Palette based variables that target slide / remix elements. Refer to palette not colorChart.
    // --------------------------------------------------------------------------------------------

    override('& .slide').with(
      (palette) => (palette.image() ? {
        backgroundImage: `url('${palette.image()}')`,
      } : undefined)
    );

    override('& h2').with(
      (palette) => ({
        color: `${palette.subtitle()}`,
      })
    );

    override('& blockquote p').with(
      (palette) => ({
        color: `${palette.text()} !important`,
        '&:before, &:after': {
          color: `${palette.text()}`,
        },
      })
    );

    // --------------------------------------------------------------------------------------------
    // Theme Specific Remix Overrides
    // Layout and structural (group colour info above)
    // --------------------------------------------------------------------------------------------

    // text
    override(olBoldNumberRemix).with(olBoldNumberOverride);
    override(textListCenteredRemix).with(textListCenteredOverride);
    override(textHeadingColsRemix).with(textHeadingColsOverride);
    override(textBlockbusterRemix).with(textBlockbusterOverride);
    override(textDefaultRemix).with(textDefaultOverride);
    override(textLongformRemix).with(textLongformOverride);
    override(headingParagraphUpwardRemix).with(headingParagraphUpwardOverride);

    // clusters
    override(clustersText5050Remix).with(clustersText5050Override);
    override(clustersTextFixedImageRemix).with(clustersTextFixedImageOverride);
    override(clustersTextFixedImageAspectRemix).with(clustersTextFixedImageAspectOverride);
    override(boxOutTextRightRemix).with(boxoutTextOverride);
    override(boxOutTextLeftRemix).with(boxoutTextOverride);
    override(clustersQuoteRoundedImageRemix).with(clustersQuoteRoundedImageOverride);
    override(clustersPanelFixedImageRemix).with(clustersPanelFixedImageOverride);
    override(clustersPanelLandscapeRemix).with(clustersPanelLandscapeOverride);
    override(clustersFullPanelRemix).with(clustersFullPanelOverride);

    // grid image layouts
    override(imagesAspectRemix).with(imagesAspectOverride);
    override(imagesWindowedRemix).with(imagesWindowedOverride);
    override(imagesQuadAspect).with(imagesQuadAspectOverride);
    override(imagesMagazine3Remix).with(imagesMagazine3Override);
    override(imagesMagazine4Remix).with(imagesMagazine4Override);

    // full bleed images
    override(imageFullBleedRemix).with(imageFullBleedOverride);
    override(imagesFullBleedRemix).with(imageFullBleedOverride);

    // lists
    override(listSplitRemix).with(listSplitOverride);
    override(textListPanelsRemix).with(textListPanelsOverride);
    override(listTextUpwardRemix).with(listTextUpwardOverride);
    override(listUnorderedPanelsRemix).with(listUnorderedPanelsOverride);

    // text + image
    override(textImages2575FullBleedRemix).with(textImages2575FullBleedOverride);
    override(imagesText2575FullBleedRemix).with(imagesText2575FullBleedOverride);
    override(imagesText5050FullBleedRemix).with(imagesText5050FullBleedOverride);
    override(textImages5050FullBleedRemix).with(textImages5050FullBleedOverride);
    override(textImage4x5050FullBleedRemix).with(textImage4x5050FullBleedOverride);
    override(imageH1Text1005050FullBleedRemix).with(imageH1text1005050FullBleedOverride);
    override(h1TextImage5050100FullBleedRemix).with(h1TextImage5050100FullBleedOverride);
    override(imageFullBleedTextGradientRemix).with(imageFullBleedTextGradientOverride);
    override(textImage5050AspectRemix).with(textImage5050AspectOverride);
    override(fallbackGridRemix).with(fallbackGridOverride);

    // quotes
    override(textQuote5050FullBleedRemix).with(textQuote5050FullBleedOverride);
    override(quoteSimpleImageRemix).with(quoteSimpleImageOverride);

  }

  // -----------------------------------------------------------------------------------------------
  // Theme Specific Overrides
  // Overrides here will affect every slide in a deck. Layout & structural (group colour info above)
  // -----------------------------------------------------------------------------------------------

  css() {
    return {
      theme: {
        '& .slide': {
          fontSize: '65%',
          fontWeight: 500,
          lineHeight: '1.3',
          padding: "9%",
          justifyContent: 'center !important',
          alignItems: 'flex-start !important',
          textAlign: 'left !important',
          fontFamily: '"Noto Serif JP", sans-serif',
          backgroundSize: 'cover',
          overflow: 'hidden',
          '& h1': {
            fontFamily: '"Noto Serif", sans-serif',
            fontSize: '2em',
            fontWeight: 500,
            lineHeight: '1.3',
            margin: '0 0 0.4em 0',
            letterSpacing: '-0.03em',
            '& strong': {
              fontWeight: 900,
            },
            '& span.emphasis': {
              padding: '0',
              borderRadius: "0.1em",
            },
          },
  
          '& h2': {
            fontFamily: '"Noto Serif JP", sans-serif',
            fontSize: '1.4em',
            fontWeight: 600,
            lineHeight: '1.25',
            margin: '0 0 0.5em 0',
            letterSpacing: '-0.025em',
            '& strong': {
              fontWeight: 900,
            },
          },
  
          '& p': {
            fontFamily: '"Noto Serif", sans-serif',
            margin: '0.25em 0 1em 0',
            padding: 0,
            lineHeight: '1.5 !important',
            fontSize: '130%', // 125
            letterSpacing: '-0.02em',
            fontWeight: 300,
            fontStyle: 'normal',
  
            '& strong': {
              fontWeight: 700,
            },
          },
  
          '& li': {
            fontSize: '130%',
            '& p': {
              lineHeight: '1.25',
            },
          },
  
          '& .container-block-quote blockquote': {
            '& p': {
              fontSize: '1.5em !important',
              lineHeight: '1.4 !important',
              fontWeight: 500,
              '&:before, &:after': {
                fontFamily: '"Noto Serif", sans-serif !important',
                opacity: '1 !important',
              },
            },
          },
  
          '& img': {
            width: '100%'
          },
  
          // fix drag and drop within this theme: zindex containers above .hook
          '& .container:not(.container-image)': {
            zIndex: '2',
            position: 'relative',
          },

        },

      }
    };
  }
}
