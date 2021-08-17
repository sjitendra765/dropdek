import React, { useCallback } from "react";
import useDimensions from "react-cool-dimensions";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import CardActions from "@material-ui/core/CardActions";
import CardMedia from "@material-ui/core/CardMedia";
import CardActionArea from "@material-ui/core/CardActionArea";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import InfoIcon from '@material-ui/icons/Info';
import { makeStyles } from "@material-ui/styles";
import Truncate from 'react-truncate';
import SlideDeckPlayControl from "../../../common/components/ApplicationBar/components/SlideDeckPlayControl";
import DeckPreview from "./DeckPreview/DeckPreview";
import { setHeightFromAspect } from "../../presenter/queries/setHeightFromAspect";
import WorkflowPanel from "../../composer/components/PreviewSection/components/toolbar/components/WorkflowPanel";

/**
 * Open a deck in edit/composer.
 */
const onClickToCompose = (deck) => () => {
  window.location = `/edit/${deck._id}`;
};

const styles = () => makeStyles((theme) => ({
  title: {
    fontFamily: '"Inter var", "Helvetica Neue", "Helvetica", "Arial", "sans-serif"',
    color: theme.palette.text.primary,
    fontWeight: '600',
  },
  owner: {
    color: theme.palette.text.secondary,
  },
  deckCard: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    boxShadow: '0 6px 12px -2px rgba(50,50,90,.1), 0 3px 7px -3px rgba(0,0,0,.1)',
    backgroundColor: theme.palette.background.elev00,
    borderBottomLeftRadius: '6px',
    borderBottomRightRadius: '6px',
    '& .textLabel': {
      opacity: '0',
      position: 'relative',
      left: '-4px',
      transition: 'all 0.2s ease-in-out 0.15s',
    },
    '&:hover': {
      backgroundColor: theme.palette.background.elev00,
      boxShadow: '0 6px 12px -2px rgba(50,50,90,.25), 0 3px 7px -3px rgba(0,0,0,.3)',
      overflow: 'hidden',
      '& .textLabel': {
        opacity: '1',
        left: '0',
      },
    },
  },
  deckPreview: {
    position: 'relative',
    '&:after': {
      content: '""',
      position: 'absolute',
      width: '100%',
      bottom: 0,
      height: '0',
      borderTop: '1px solid rgba(0,0,0,0.05)',
    },
  },
  allContent: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    minHeight: '112px',
    textLabel: {
      opacity: '1',
    },
  },

  focusHighlight: {
    opacity: '0 !important',
    borderRadius: '0 0 6px 6px',
  },

  allContentInner: {
    width: '100%',
  },
  allTitles: {
    width: '100%',
  },
  allActions: {
    marginTop: 'auto !important', // push to bottom
    width: '100%',
  },
  innerActions: {
    boxSizing: 'border-box',
    width: '100%',
    padding: '0px 12px 10px 12px',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: '0 0 6px 6px',
    overflow: 'hidden',
  },
  infoBtn: {
    transition: "all 300ms ease",
    color: theme.palette.icon.primary,
    opacity: '0.5',
    padding: '4px',
    "&:hover": {
      opacity: 1,
      transform: "scale(1.1)",
      color: theme.palette.icon.primaryHover,
      background: theme.palette.icon.primaryHoverBg,
    },
  },
}));

const SimpleDeckCard = ({ deck, toggleInfoPanel, onClickToPlay, onClickToOpen = onClickToCompose, grid = { xs: 12, sm: 6, md: 4, lg: 3 } }) => {
  const { ref, width } = useDimensions();

  const useStyles = useCallback(styles(), []);
  const classes = useStyles();
  const { xs, sm, md, lg } = grid;
  return (
    <Grid item key={deck.id} xs={xs} sm={sm} md={md} lg={lg}>
      <Card className={classes.deckCard} elevation={0}>

        <CardMedia className={classes.deckPreview} ref={ref} style={{ height: setHeightFromAspect(width), overflow: "hidden", }}>
          <DeckPreview deck={deck} />
        </CardMedia>

        <CardActionArea className={classes.allContent} classes={{ focusHighlight: classes.focusHighlight }}>
          <div className={classes.allTitles} onClick={onClickToOpen(deck)} role="navigation">
            <CardContent>
              <Typography variant="h4" className={classes.title} style={{ flex: '1', fontSize: '1.1rem', letterSpacing: '-0.0125em', }}>
                <Truncate>{deck.name || 'Untitled'}</Truncate>
              </Typography>
              {deck.owner && (
                <Typography variant="subtitle1" color="textSecondary" style={{ fontSize: '0.975rem', marginBottom: "-24px", fontFamily: '"Inter var", "Helvetica Neue", "Helvetica", "Arial", "sans-serif"' }}>
                  {`${deck.owner.givenName} ${deck.owner.familyName}`}
                </Typography>
              )}
            </CardContent>
          </div>
          <div className={classes.allActions}>
            <CardActions className={classes.innerActions}>
              {/* info */}
              {toggleInfoPanel && (
                <IconButton onClick={toggleInfoPanel(true, deck._id)} size="medium" className={classes.infoBtn}>
                  <InfoIcon/>
                </IconButton>
              )}
              {/* workflow */}
              <WorkflowPanel settings={deck.settings} mini/>
              {/* play */}
              <div style={{ marginLeft: "auto", marginTop: '1px', }}>
                <SlideDeckPlayControl onClickToPlay={onClickToPlay} id={deck.identifiers?.short} muted />
              </div>
            </CardActions>
          </div>
        </CardActionArea>
      </Card>
    </Grid>
  );
};
export default SimpleDeckCard;
