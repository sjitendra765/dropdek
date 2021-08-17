import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import React, { useCallback, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import { Deck } from 'common/model/Deck';
import { subject } from "@casl/ability";
import { useMediaQuery, useTheme } from "@material-ui/core";
import { generateSlides } from "../../../common/slide/SlideFactory";
import ConfirmationButton from "../../../common/components/ConfirmationButton";
import Dropdeck from "../../../common/api/sdk/Dropdeck";
import { Slide } from "../../../common/slide/Slide";
import Abilities from "../../../common/authz/ability/Abilities";
import { Can } from "../../../common/authz/components/Can";
import Lightbox from "../../presenter/components/Lightbox";
import WorkflowPanel from "../../composer/components/PreviewSection/components/toolbar/components/WorkflowPanel";
import Label from "../../../common/components/controls/Label";

const styles = () => makeStyles((theme) => ({
  root: {
    width: "40vw",
    height: '100%',
    padding: theme.spacing(3, 5),
    background: theme.dark() ? "#222" : "#fff",
    '& .panelHead': {
      marginBottom: '34px',
    },
    '& .panelBody': {
      maxHeight: '77vh',
      overflow: 'hidden',
      overflowY: 'scroll',
      boxSizing: 'border-box',
      margin: '-8px -8px 0 -8px',
      position: 'relative',
      '& #lightbox, & #lightbox > div': {
        height: '100%',
        padding: '0 !important',
        margin: '0 !important',
      },
    },
    '& .panelFoot': {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: 'absolute',
      background: theme.dark() ? "#1a1a1a" : "#eee",
      bottom: '0',
      left: '0',
      right: '0',
      padding: '24px 0',
      textAlign: 'center',
      minHeight: '48px',
      zIndex: '2',
    },
  }
}));

const InfoPanel = ({ deckId, toggleInfoPanel, infoPanel, deleteDeck, setShowInfoPanel }) => {
  const [branding, setBranding] = useState(undefined);
  const [deck, setDeck] = useState();
  const [slides, setSlides] = useState();

  const materialTheme = useTheme();
  const isPhoneSize = useMediaQuery(materialTheme.breakpoints.down('xs'));

  useEffect(() => {
    Dropdeck.Decks.byId(deckId)
      .then((payload) => {
        const d = Deck.fromDataObject(payload.data);
        setDeck(d);
        setBranding(d.branding);
        setSlides(generateSlides(d.content, Slide.View.LIGHTBOX, d.theme));
      });
  }, [deckId]);

  const getInfo = () => (
    <Grid container>
      <Grid item xs={12}>
        <div className="panelHead">
          <Label variant="h3">{deck.name || 'Untitled'}</Label>
        </div>
        <div className="panelBody">
          <Lightbox
            aspect={deck.aspect}
            id={deck.id}
            branding={branding}
            slides={slides}
            readOnly
            isPhoneSize={isPhoneSize}
            themeName={deck.theme}
            cols={isPhoneSize ? 1 : 2}
          />
          <div className="bottomFade" />
        </div>
        <div className="panelFoot">
          <WorkflowPanel settings={deck.settings}/>
          <Can I={Abilities.Actions.DELETE} this={subject(Abilities.Subjects.DECK, deck)}>
            <ConfirmationButton onConfirm={() => {
              deleteDeck(deck.id);
              setShowInfoPanel(false);
            }} size="medium"/>
          </Can>
        </div>
      </Grid>
    </Grid>
  );

  const useStyles = useCallback(styles(), []);
  const classes = useStyles();
  return (
    <SwipeableDrawer
      anchor="right"
      open={infoPanel}
      onOpen={toggleInfoPanel(true)}
      onClose={toggleInfoPanel(false)}>
      <div className={classes.root}>
        {deck ? getInfo() : null}
      </div>
    </SwipeableDrawer>
  );
};
export default InfoPanel;
