import chroma from "chroma-js";
import Theme from "./Theme";
import { createHighlightStyle, EMPHASIS_SELECTOR } from "./EmphasisHighlighterUtils";

export default class AbstractTheme extends Theme {

  constructor(id, palettes, name, branded, fonts = []) {
    super(id, palettes, name, branded, fonts);

    const { override } = this;

    // Default palette overrides
    override(`& ${EMPHASIS_SELECTOR}`)
      .with(
        (palette) => ({
          position: "relative",
          borderRadius: "0.2em",
          boxDecorationBreak: "clone",
          "-webkit-box-decoration-break": "clone",
          zIndex: -2,
          padding: "0.1em 0 0.125em 0",
          ...createHighlightStyle(palette, palette.textColor)
        })
      );

    override('& h1')
      .with(
        (palette, branding) => this._addBrandingFontTitle(branding, {
          color: palette.titleColor,
        })
      );
    // `h1` uses a different color from `palette.textColor` so we must override the `mixBlendMode` to ensure proper emphasis handling
    override(`& h1 ${EMPHASIS_SELECTOR}`)
      .with(
        (palette) => createHighlightStyle(palette, palette.titleColor)
      );

    override('& h2')
      .with(
        (palette, branding) => this._addBrandingFontTitle(branding, {
          color: palette.titleColor,
        })
      );
    // `h2` uses a different color from `palette.textColor` so we must override the `mixBlendMode` to ensure proper emphasis handling
    override(`& h2 ${EMPHASIS_SELECTOR}`)
      .with(
        (palette) => createHighlightStyle(palette, palette.titleColor)
      );

    override('& blockquote p, & blockquote strong, & blockquote p:before, & blockquote p:after')
      .with(
        (palette, branding) => this._addBrandingFontTitle(branding, {
          color: palette.accentColor,
        })
      );
    // Override above uses a different color from `palette.textColor` so we must override the `mixBlendMode` to ensure proper emphasis handling
    override(`& blockquote p ${EMPHASIS_SELECTOR}, & blockquote strong ${EMPHASIS_SELECTOR}`)
      .with(
        (palette) => createHighlightStyle(palette, palette.accentColor)
      );

    override('& div.slide')
      .with(
        (palette) => ({
          backgroundColor: palette.backgroundColor,
          color: palette.textColor,
        })
      );
    override('& li:before')
      .with(
        (palette, branding) => this._addBrandingFontTitle(branding, {
          color: palette.accentColor,
        })
      );
    override('& p, & ol, & ul')
      .with(
        (palette, branding) => this._addBrandingFontText(branding, {
          color: palette.textColor,
        })
      );
    override('& a')
      .with(
        (palette) => ({
          color: "inherit",
          transition: "border-bottom 200ms ease-in",
          borderBottom: `1px solid ${chroma(palette.accentColor).alpha(0.4)}`,
          textDecoration: "none",
          "&:hover": {
            transition: "border-bottom 400ms ease-out",
            borderBottom: `1px solid ${palette.accentColor}`
          }
        })
      );
  }

  /**
   * Adds specific styling overrides.
   */
  _addPaletteOverrides = (overrides) => {
    this.paletteOverrides = { ...this.paletteOverrides, ...overrides };
  };

  /**
   * Brand styling helper methods: Adds the brand title font to the given JSS snippet.
   */
  _addBrandingFontTitle = (branding, styling) => {
    if (branding && branding.fonts && branding.fonts.title) {
      styling['font-family'] = `${branding.fonts.title.name} !important`;
    }
    return styling;
  };

  /**
   * Brand styling helper methods: Adds the brand font to the given JSS snippet.
   */
  _addBrandingFontText = (branding, styling) => {
    if (branding && branding.fonts && branding.fonts.text) {
      styling['font-family'] = `${branding.fonts.text.name} !important`;
    }
    return styling;
  };

}
