import AbstractTheme from "../../AbstractTheme";
import { getPalettes } from "./components/palettes";
import { getFonts } from "./components/fonts";
import { textListCenteredRemix } from "../../../common/remix/rules/lists/textListCentered/textListCentered";
import { textListCenteredOverride } from "./remixes/textListCenteredOverride";
import { listUnorderedPanelsRemix } from "../../../common/remix/rules/lists/listUnorderedPanels/listUnorderedPanels";
import { listUnorderedPanelsOverride } from "./remixes/listUnorderedPanelsOverride";
import { olBoldNumberRemix } from "../../../common/remix/rules/lists/olBoldNumber/olBoldNumber";
import { olBoldNumberOverride } from "./remixes/olBoldNumberOverride";
import { clustersPanelFixedImageRemix } from "../../../common/remix/rules/clusters/clustersPanelFixedImage/clustersPanelFixedImage";
import { clustersPanelFixedImageOverride } from "./remixes/clustersPanelFixedImageOverride";
import { clustersPanelLandscapeRemix } from "../../../common/remix/rules/clusters/clustersPanelLandscape/clustersPanelLandscape";
import { clustersPanelLandscapeOverride } from "./remixes/clustersPanelLandscapeOverride";
import { clustersFullPanelRemix } from "../../../common/remix/rules/clusters/clustersFullPanel/clustersFullPanel";
import { clustersFullPanelOverride } from "./remixes/clustersFullPanelOverride";
import { textBlockbusterRemix } from "../../../common/remix/rules/text/textBlockBuster/textBlockbuster";
import { textBlockbusterOverride } from "./remixes/textBlockbusterOverride";

export default class Midnight extends AbstractTheme {

  constructor() {
    super('midnight', getPalettes(), "Midnight", false, getFonts());

    /*
     * Custom palette override behaviour:
     */
    const { override } = this;
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
    override('& span.mark').with(
      (palette) => ({
        backgroundColor: palette.accent(),
      })
    );
    override('& strong').with(
      (palette) => ({
        color: palette.text(),
      })
    );

    // --------------------------------------------------------------------------------------------
    // Theme Specific Remix Overrides
    // Layout and structural (group colour info above)
    // --------------------------------------------------------------------------------------------

    override(textListCenteredRemix).with(textListCenteredOverride);
    override(listUnorderedPanelsRemix).with(listUnorderedPanelsOverride);
    override(olBoldNumberRemix).with(olBoldNumberOverride);
    override(clustersPanelFixedImageRemix).with(clustersPanelFixedImageOverride);
    override(clustersPanelLandscapeRemix).with(clustersPanelLandscapeOverride);
    override(clustersFullPanelRemix).with(clustersFullPanelOverride);
    override(textBlockbusterRemix).with(textBlockbusterOverride);

  }

  css() {
    return {
      theme: {

        '& .slide': {
          fontSize: '65%',
          fontWeight: 400,
          lineHeight: '1.25',
          padding: "9%",
          fontFamily: '-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji',
          justifyContent: 'center !important',
          alignItems: 'flex-start !important',
          textAlign: 'left !important',
          '& h1': {
            margin: '0 0 0.5em 0',
            letterSpacing: '-0.025rem',
            fontWeight: 600,
            fontSize: '2.25em',
            lineHeight: '1.15',
            '& span.emphasis': {
              borderRadius: "0.1em",
            },
          },
          '& h2': {
            margin: '0 0 0.45em 0',
            letterSpacing: '-0.0125rem',
            fontWeight: '600',
            fontSize: '1.5em',
          },
          '& p': {
            margin: '0 0 0.75em 0',
            fontSize: '130%'
          },
          '& li': {
            fontSize: '130%',
          },
          '& blockquote': {
            fontWeight: '700',
          },
          '& code': {
            boxSizing: 'border-box',
            background: 'rgba(255,255,255,0.035) !important',
          },
          '& img': {
            width: '100%'
          },
        },

      }
    };
  }
}
