import React, { useCallback, useEffect } from "react";
import PaletteMaterialIcon from '@material-ui/icons/Palette';
import { makeStyles } from "@material-ui/styles";
import Button from '@material-ui/core/Button';
import Tooltip from "@material-ui/core/Tooltip";
import { createBrandingPalettes } from "../../transforms/extractPaletteSuggestions";
import Popup from "../../../../../../common/components/popup/Popup/Popup";
import Section from "../../../../../../common/components/popup/Section";
import { usePalettesInUse } from "../../context/usePalettesInUse";
import "./PaletteSuggestionComponent.scss";
import { getPalettesSuggestionsForSlide } from "./queries/getPalettesSuggestionsForSlide";
import PaletteInkwell
  from "../../../../../composer/components/DeckEditor/modules/plugins/component/palette/PaletteInkwell";

const popupStyles = () => makeStyles((theme) => ({
  sectionOuter: {
    width: "100%",
    boxSizing: 'border-box',
    display: 'flex',
    [theme.breakpoints.down('md')]: {
      flexWrap: 'wrap',
    },
  },
  section: {
    minWidth: '35%',
    [theme.breakpoints.down('md')]: {
      width: '100%',
      maxWidth: '100%',
    },
  },
}));

/**
 * Main contents for palette picker floating popup.
 */
export const PalettePopup = ({ theme, slide, pickPalette }) => {

  const useStyles = useCallback(popupStyles(), []);
  const classes = useStyles();

  const pick = (p) => {
    pickPalette(slide, theme.id, p);
  };

  const suggestedPalettes = getPalettesSuggestionsForSlide(slide, theme);
  const brandingPaletteComponents = [];
  if (theme.branding && theme.branding.colors) {
    createBrandingPalettes(theme).forEach((palette, i) => brandingPaletteComponents.push(<PaletteInkwell key={`palette-slide-branding-${slide.id}-${i}`} palette={palette} pickPalette={pick}/>));
  }
  const paletteComponents = theme.paletteSuggestions().map((palette, i) => <PaletteInkwell key={`palette-slide-${slide.id}-${i}`} palette={palette} pickPalette={pick}/>);
  const imagePalette = suggestedPalettes.map((palette, i) => <PaletteInkwell key={`palette-slide-${slide.id}-${i}`} palette={palette} pickPalette={pick}/>);
  const palettesInUse = usePalettesInUse();
  const inUse = palettesInUse.map((palette, i) => <PaletteInkwell key={`palette-slide-${slide.id}-${i}`} palette={palette} pickPalette={pick}/>);

  return (
    <div style={{ marginLeft: 15, marginRight: 15 }}>
      <div className={classes.sectionOuter}>
        <div className={classes.section}>
          <Section title="Colors from Theme" style={{ marginTop: 5 }} override={{
            boxShadow: "none",
            border: "none",
            padding: "15px 0",
            background: "none",
            textShadow: '0 1px 1px rgba(0,0,0,0.8)',
          }}>
            {paletteComponents}
          </Section>

          {brandingPaletteComponents.length > 0 ? (
            <div className={classes.section}>
              <Section title="Company Colors" style={{ marginTop: 5 }} override={{
                boxShadow: "none",
                border: "none",
                padding: "15px 0",
                background: "none",
                textShadow: '0 1px 1px rgba(0,0,0,0.8)',
              }}>
                {brandingPaletteComponents}
              </Section>
            </div>
          ) : null }
        </div>
        {imagePalette.length > 0 ? (
          <div className={classes.section}>
            <Section title="Colors from Pictures" style={{ marginTop: 5 }} override={{
              boxShadow: "none",
              border: "none",
              padding: "15px 0",
              background: "none",
              textShadow: '0 1px 1px rgba(0,0,0,0.8)',
            }}>
              {imagePalette}
            </Section>
          </div>
        ) : null }
      </div>

      <Section title="Used elsewhere in this deck" style={{ marginTop: 5 }} override={{ boxShadow: "none", border: "none", padding: 0, background: "none", textShadow: '0 1px 1px rgba(0,0,0,0.8)', }}>
        {inUse}
      </Section>
    </div>
  );
};

/**
 * Palette suggestions component below each slide in the Lightbox.
 *
 */
const PaletteSuggestionComponent = ({ setKeepOpen, show, theme, deckId, slide, pickPalette }) => {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
    setKeepOpen(!anchorEl);
  };
  const open = Boolean(anchorEl);

  useEffect(() => {
    if (!show) {
      setAnchorEl(null);
      setKeepOpen(false);
    }
  });

  return (
    <>
      <div style={{ display: "inline-block" }}>
        <Tooltip title="Choose a color palette" arrow>
          <Button size="medium" variant="contained" onClick={handleClick} className={open ? "open" : ""}>
            <PaletteMaterialIcon fontSize="inherit"/>
          </Button>
        </Tooltip>
        <Popup anchor={anchorEl} setAnchor={setAnchorEl} open={open}>
          <Section style={{ width: 250 }}>
            <PalettePopup deckId={deckId} theme={theme} slide={slide} pickPalette={pickPalette}/>
          </Section>
        </Popup>
      </div>
    </>
  );
};
export default PaletteSuggestionComponent;
