import React from 'react';
import { Link } from 'react-router-dom';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import Button from '@material-ui/core/Button';
import { withStyles } from "@material-ui/core";
import { ROUTE_PLAY_DECK } from "../../../../Routes";

const styles = {
  root: {
    padding: '0.175rem 0.6rem 0.175rem 0.75rem',
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: '14px',
    letterSpacing: '0',
    transition: 'all .2s ease-in-out',
    margin: '0 0.5rem 0 0',
    fontFamily: '"Inter var","Helvetica Neue",Helvetica,Arial,sans-serif',
    textShadow: 'none',
  },
};

const SlideDeckPlayControl = ({ id, muted, classes, onClickToPlay = (id) => `${ROUTE_PLAY_DECK}/${id}` }) => (
  <Button
    variant={muted ? "outlined" : "contained"}
    startIcon={<PlayCircleFilledIcon/>}
    aria-controls="simple-menu"
    component={Link}
    color="primary"
    size="medium"
    to={onClickToPlay(id)}
    className={classes.root}
    aria-label="theme"
    aria-haspopup="true" style={{ color: !muted ? "#fff" : null }}>
    Play
  </Button>

);
export default withStyles(styles)(SlideDeckPlayControl);
