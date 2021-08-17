import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Slide } from "../common/slide/Slide";
import { ProgressTracker } from "../common/util/ProgressTracker";
import ColorChart from "./ColorChart";
import { Remix } from "../common/remix/Remix";
import PaletteSet from "./PaletteSet";
import { buildFontUrl, createLinkElements } from "../common/util/FontUtility";

/**
 * A theme for styling a deck.
 */
export default class Theme {

  constructor(id, palettes, name, branded, fonts = []) {
    this.id = id;
    this.palettes = PaletteSet.fromArray(palettes);
    this.name = name;
    this.branded = branded;
    this.fonts = fonts;
    this.paletteOverrides = {};
    this.remixOverrides = {};
  }

  /**
   * Provide an override for a specific CSS selector, using the syntax:
   *
   * when(selector).overrideWith((palette) => <css for palette>`)
   *
   * @param selector
   */
  override = (selector) => {
    const remixSelector = (selector.name && selector instanceof Remix);
    if (remixSelector) {
      const remix = selector;
      selector = remix.name();
    }
    return {
      with: (cssGenerator) => {
        if (remixSelector) {
          this.remixOverrides[selector] = cssGenerator;
        } else {
          this.paletteOverrides[selector] = cssGenerator;
        }
      },
    };
  };

  defaultPalette = () => this.palettes.primary();

  setBranding = (branding) => {
    this.branding = branding;
  };

  paletteSuggestions = () => this.palettes.all();

  // eslint-disable-next-line class-methods-use-this
  css(slideWidth) {}

  /**
   * Constructs a color chart from a given palette.
   *
   * @param palette base color palette
   */
  colorChart = (palette = this.defaultPalette()) => new ColorChart(palette.accent(), palette.background(), palette.title(), palette.text());

  linkBrandFonts = (branding, monitor) => {
    if (this.branded && branding.fonts && (branding.fonts.title || branding.fonts.text)) {
      return createLinkElements(branding.fonts);
    }
    return null;
  };

  linkThemeFonts = (monitor) => this.fonts.map((font) => <link key={font} href={font} rel="stylesheet" onLoad={monitor.watch(font)}/>);

  wrap = ({ children, view, monitor = ProgressTracker.DUMMY }) => {
    const useStyles = makeStyles(this.css(), { deterministic: view && view === Slide.View.LIGHTBOX, meta: 'theme' });
    const classes = useStyles();
    return (
      <div className={classes.theme} style={{ height: "100%" }}>
        {this.branded && this.branding.fonts ? this.linkBrandFonts(this.branding, monitor) : null}
        {this.fonts !== undefined && this.fonts.length > 0 ? this.linkThemeFonts(monitor) : null}
        {children}
      </div>
    );
  };

  wrapWithoutStyles = ({ children, view, monitor = ProgressTracker.DUMMY, classes }) => (
    <div className={classes.theme} style={{ height: "100%" }}>
      {this.branded && this.branding.fonts ? this.linkBrandFonts(this.branding, monitor) : null}
      {this.fonts !== undefined && this.fonts.length > 0 ? this.linkThemeFonts(monitor) : null}
      {children}
    </div>
  );

  /**
   * Default palette overrides.
   *
   * @param palette colour palette.
   * @param branding branding set.
   */
  cssForPalette(palette, remixName, branding) {
    const combinedStyling = {
    };

    Object.keys(this.paletteOverrides).forEach((cssSelector) => {
      const styling = this.paletteOverrides[cssSelector](palette, branding);
      if (styling !== undefined) {
        combinedStyling[cssSelector] = styling;
      }
    });

    const remixOverride = remixName ? this.remixOverrides[remixName] : undefined;
    if (remixOverride) {
      const cssSelector = `& .slide.${remixName}`;
      const styling = this.remixOverrides[remixName](palette, branding);
      combinedStyling[cssSelector] = styling;
    }

    return combinedStyling;
  }
}
