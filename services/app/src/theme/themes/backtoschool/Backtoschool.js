import AbstractTheme from "../../AbstractTheme";
import { getPalettes } from "./components/palettes";
import { getFonts } from "./components/fonts";
import { headingParagraphUpwardRemix } from "../../../common/remix/rules/text/headingParagraphUpward/headingParagraphUpward";
import { headingParagraphUpwardOverride } from "./remixes/headingParagraphUpwardOverride";
import { listTextUpwardRemix } from "../../../common/remix/rules/lists/listTextUpward/listTextUpward";
import { listTextUpwardOverride } from "./remixes/listTextUpdwardOverride";
import { textListCenteredRemix } from "../../../common/remix/rules/lists/textListCentered/textListCentered";
import { textListCenteredOverride } from "./remixes/textListCenteredOverride";
import { h1TextImage5050100FullBleedRemix } from "../../../common/remix/rules/textImageCover/tic1/h1TextImage5050100FullBleed/h1TextImage5050100FullBleed";
import { imageH1Text1005050FullBleedRemix } from "../../../common/remix/rules/textImageCover/tic1/imageH1Text1005050FullBleed/imageH1Text1005050FullBleed";
import { imageH1text1005050FullBleedOverride } from "./remixes/imageH1Text1005050FullBleedOverride";
import { h1TextImage5050100FullBleedOverride } from "./remixes/h1TextImage5050100FullBleedOverride";
import { imageFullBleedRemix } from "../../../common/remix/rules/images/imageFullBleed/imageFullBleed";
import { imagesFullBleedRemix } from "../../../common/remix/rules/images/imagesFullBleed/imagesFullBleed";
import { imageFullBleedOverride } from "./remixes/imageFullBleedOverride";
import { imagesMagazine3Remix } from "../../../common/remix/rules/images/imagesMagazine3/imagesMagazine3";
import { magazineImagesOverride } from "./remixes/magazineImagesOverride";
import { imagesMagazine4Remix } from "../../../common/remix/rules/images/imagesMagazine4/imagesMagazine4";
import { imagesQuadWindowedRemix } from "../../../common/remix/rules/images/imagesQuadWindowed/imagesQuadWindowedRemix";
import { imagesWindowedRemix } from "../../../common/remix/rules/images/imagesWindowed/imagesWindowed";
import { imagesWindowsOverride } from "./remixes/imagesWindowsOverride";
import { olBoldNumberRemix } from "../../../common/remix/rules/lists/olBoldNumber/olBoldNumber";
import { olBoldNumberOverride } from "./remixes/olBoldNumberOverride";
import { quoteSimpleImageRemix } from "../../../common/remix/rules/blockQuotes/quoteSimpleImage/quoteSimpleImage";
import { quoteSimpleImageOverride } from "./remixes/quoteSimpleImageOverride";
import { textImage5050AspectRemix } from "../../../common/remix/rules/textImage/textImage5050Aspect/textImage5050Aspect";
import { textImage5050AspectOverride } from "./remixes/textImage5050AspectOverride";
import { listUnorderedPanelsRemix } from "../../../common/remix/rules/lists/listUnorderedPanels/listUnorderedPanels";
import { listUnorderedPanelsOverride } from "./remixes/listUnorderedPanelsOverride";
import { textBlockbusterRemix } from "../../../common/remix/rules/text/textBlockBuster/textBlockbuster";
import { textBlockbusterOverride } from "./remixes/textBlockbusterOverride";
import { imageFullBleedTextGradientRemix } from "../../../common/remix/rules/images/imageFullBleedTextGradient/imageFullBleedTextGradientRemix";
import { imageFullBleedTextGradientOverride } from "./remixes/imageFullBleedTextGradientOverride";

import { clustersPanelFixedImageRemix } from "../../../common/remix/rules/clusters/clustersPanelFixedImage/clustersPanelFixedImage";
import { clustersPanelFixedImageOverride } from "./remixes/clustersPanelFixedImageOverride";
import { clustersQuoteRoundedImageRemix } from "../../../common/remix/rules/clusters/clustersQuoteRoundImage/clustersQuoteRoundImage";
import { clustersQuoteRoundedImageOverride } from "./remixes/clustersQuoteRoundedImageOverride";
import { clustersTextFixedImageRemix } from "../../../common/remix/rules/clusters/clustersTextFixedImage/clustersTextFixedImage";
import { clustersTextFixedImageOverride } from "./remixes/clustersTextFixedImageOverride";
import { clustersTextFixedImageAspectRemix } from "../../../common/remix/rules/clusters/clustersTextFixedImageAspect/clustersTextFixedImageAspect";
import { clustersTextFixedImageAspectOverride } from "./remixes/clustersTextFixedImageAspectOverride";
import { clustersText5050Remix } from "../../../common/remix/rules/clusters/clustersText5050/clustersText5050";
import { clustersText5050Override } from "./remixes/clustersText5050Override";
import { clustersRoundedImageRemix } from "../../../common/remix/rules/clusters/clustersRoundedImage/clustersRoundedImage";
import { clustersRoundedImageOverride } from "./remixes/clustersRoundedImageOverride";
import { clustersFullPanelRemix } from "../../../common/remix/rules/clusters/clustersFullPanel/clustersFullPanel";
import { clustersFullPanelOverride } from "./remixes/clustersFullPanelOverride";

export default class Backtoschool extends AbstractTheme {
  constructor() {
    super('backtoschool', getPalettes(), "Back to school", false, getFonts());

    // Element Overrides
    // Palette based variables that target slide / remix elements. Refer to palette not colorChart.
    // --------------------------------------------------------------------------------------------

    const { override } = this;

    override('& .slide').with(
      (palette) => (palette.image() ? {
        backgroundImage: `url('${palette.image()}')`,
        '&:before': {
          background: 'transparent !important',
        },
      } : undefined)
    );

    override('& h1').with(
      (palette) => ({
        color: `${palette.title()} !important`,
      })
    );

    override('& h2').with(
      (palette) => ({
        color: `${palette.subtitle()} !important`,
      })
    );

    override('& li').with(
      (palette) => ({
        '&:before': {
          color: `${palette.accent()} !important`,
        },
      })
    );

    override('& code').with(
      (palette) => ({
        color: `${palette.accent()} !important`,
      })
    );

    override('& blockquote p').with(
      (palette) => ({
        color: `${palette.text()} !important`,
      })
    );

    // -----------------------------------------------------------
    // Theme Specific Remix Overrides
    // -----------------------------------------------------------

    // text remixes
    override(textListCenteredRemix).with(textListCenteredOverride);
    override(olBoldNumberRemix).with(olBoldNumberOverride);
    override(quoteSimpleImageRemix).with(quoteSimpleImageOverride);
    override(listUnorderedPanelsRemix).with(listUnorderedPanelsOverride);
    override(textBlockbusterRemix).with(textBlockbusterOverride);

    // paperclipped annotation on image-1-fullbleed, images-n-fullbleed
    override(imageFullBleedRemix).with(imageFullBleedOverride);
    override(imagesFullBleedRemix).with(imageFullBleedOverride);

    // magazine images bordered, haphazard
    override(imagesMagazine3Remix).with(magazineImagesOverride);
    override(imagesMagazine4Remix).with(magazineImagesOverride);
    override(imagesQuadWindowedRemix).with(magazineImagesOverride);

    // image remixes
    override(imagesWindowedRemix).with(imagesWindowsOverride);
    override(textImage5050AspectRemix).with(textImage5050AspectOverride);
    override(h1TextImage5050100FullBleedRemix).with(h1TextImage5050100FullBleedOverride);
    override(imageH1Text1005050FullBleedRemix).with(imageH1text1005050FullBleedOverride);
    override(imageFullBleedTextGradientRemix).with(imageFullBleedTextGradientOverride);

    // upward text remixes
    override(headingParagraphUpwardRemix).with(headingParagraphUpwardOverride);
    override(listTextUpwardRemix).with(listTextUpwardOverride);

    // clusters
    override(clustersPanelFixedImageRemix).with(clustersPanelFixedImageOverride);
    override(clustersQuoteRoundedImageRemix).with(clustersQuoteRoundedImageOverride);
    override(clustersTextFixedImageRemix).with(clustersTextFixedImageOverride);
    override(clustersTextFixedImageAspectRemix).with(clustersTextFixedImageAspectOverride);
    override(clustersText5050Remix).with(clustersText5050Override);
    override(clustersRoundedImageRemix).with(clustersRoundedImageOverride);
    override(clustersFullPanelRemix).with(clustersFullPanelOverride);

  }

  // Theme Specific Overrides
  // Overrides here will affect every slide in a deck. Layout & structural (group colour info above)
  // -----------------------------------------------------------------------------------------------

  css() {
    return {
      theme: {
        '& .slide': {
          fontSize: '65%',
          fontWeight: 400,
          lineHeight: '1.2',
          padding: "9%",
          justifyContent: 'center !important',
          alignItems: 'flex-start !important',
          textAlign: 'left !important',
          fontFamily: '"Work Sans", sans-serif !important',
          backgroundSize: 'cover',
          '& h1': {
            fontFamily: '"Work Sans", sans-serif !important',
            fontSize: '2em',
            fontWeight: 600,
            lineHeight: '1.1',
            margin: '0 0 0.4em 0',
            letterSpacing: '-0.025em',
            '& strong': {
              fontWeight: 700,
            },
            '& span.emphasis': {
              padding: '0',
              borderRadius: "0.1em",
            },
          },
          '& h2': {
            fontFamily: '"Work Sans", sans-serif !important',
            fontSize: '1.5em',
            lineHeight: '1.1',
            letterSpacing: '-0.02em',
            fontWeight: 500,
            margin: '0 0 0.6em 0',
            '& strong': {
              fontWeight: 600,
            },
          },
          '& p': {
            margin: '0 0 0.75em 0',
            fontSize: '125%', // 115
            letterSpacing: '-0.02em',
            '& strong': {
              fontWeight: 500,
            },
          },
          '& li': {
            fontSize: '125%',
          },
          '& ul li:before': {
            content: '"✓" !important',
            fontWeight: 600,
          },
          '& blockquote': {
            '& p': {
              '&:before, &:after': {
                fontFamily: '"Work Sans", sans-serif !important',
                zIndex: '-1',
              },
            },
          },
          '& code': {
            boxSizing: 'border-box',
          },
          '& img': {
            width: '100%',
            borderRadius: '0.15em',
          },
          '& .container-chart text': {
            fontFamily: '"Work Sans", sans-serif !important',
          },
  
          // quote
          '& .container-block-quote blockquote p': {
            position: 'relative !important',
            '&:before, &:after': {
              fontSize: '10em !important',
              margin: '0 !important',
              padding: '0 !important',
              position: 'absolute !important',
              boxSizing: 'border-box !important',
              lineHeight: '1em !important',
              opacity: '0.15 !important',
              top: 'unset !important',
              bottom: 'unset !important',
              left: 'unset !important',
              right: 'unset !important',
            },
            '&:before': {
              top: '-0.2em !important',
              left: '-0.1em !important',
            },
            '&:after': {
              bottom: '-0.65em !important',
              right: '-0.1em !important',
            },
          },

        },

      }
    };
  }
}
