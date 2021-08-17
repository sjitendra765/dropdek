/* eslint-disable jsx-a11y/no-static-element-interactions */

import React, { useCallback } from "react";
import Grid from '@material-ui/core/Grid';
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import { useHistory } from "react-router-dom";
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import SimpleDeckCard from "./SimpleDeckCard";
import { ROUTE_NEW_DECK } from "../../../Routes";
import { deckListStyles } from "./deckListStyles";
import Label from "../../../common/components/controls/Label";

const DeckList = ({ title, decks, toggleInfoPanel, onClickToOpen, onClickToPlay, createIcon, company = false, children, grid, loadMore, setPageNumber,pageNumber }) => {

  const useStyles = useCallback(deckListStyles(), []);
  const classes = useStyles();
  const history = useHistory();

  const loadMoreDeck = () => {
    setPageNumber(pageNumber + 1);
  };
  const deckList = () => decks.map((deck) => (
    <SimpleDeckCard key={`directory-deck-${deck._id}`} deck={deck} toggleInfoPanel={toggleInfoPanel} onClickToPlay={onClickToPlay} onClickToOpen={onClickToOpen} grid={grid}/>
  ));

  // New Deck Card
  const newDeckCard = () => {
    const newDeck = () => {
      history.push({ pathname: ROUTE_NEW_DECK, state: { permissions: { company, public: false } } });
    };
    return (
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card variant="outlined" className={classes.create} onClick={newDeck} style={{ height: decks.length > 0 ? "100%" : 140 }} >
          <CardActions>
            <IconButton color="primary"><AddIcon/></IconButton>
          </CardActions>
        </Card>
      </Grid>
    );
  };

  return (
    <div className={classes.root}>
      <Label variant="h3" className={classes.title}>{title}</Label>
      <Grid container spacing={6}>
        {decks ? deckList() : null}
        {children}
        {createIcon ? newDeckCard() : null}
        {loadMore && <p><span style={{ marginTop: "100%",cursor: "pointer" }} onClick={() => loadMoreDeck()}>load more...</span></p>}
      </Grid>
    </div>
  );
};
export default DeckList;
