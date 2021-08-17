import React, { useCallback } from 'react';
import { makeStyles } from "@material-ui/styles";
import { useTheme } from "@material-ui/core";

import UnsplashLogoDark from "./logo-unsplash-dark.svg";
import UnsplashLogo from "./logo-unsplash.svg";

const styles = () => makeStyles((theme) => ({
  attribution: {
    textAlign: 'center',
    padding: '0.75rem 1rem 0 1rem',
    boxSizing: 'border-box',
    width: '100%',
    fontSize: '0.6rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: theme.dark() ? theme.palette.background.main : `linear-gradient(90deg, ${theme.palette.background.elev02} -45%, #FFFFFF 50%)`,
    color: theme.palette.text.secondary,
    position: 'relative',
    zIndex: 1,
    '& .unsplash': {
      transition: "all 300ms ease",
      height: '12px',
      margin: '1px 0 0 7px',
      opacity: '0.8',
      '&:hover': {
        opacity: '1',
      },
    },
  },
}));

export default () => {
  const appTheme = useTheme();
  const useStyles = useCallback(styles(), []);
  const classes = useStyles();

  return (
    <div className={classes.attribution}>
      Photos by
      <a href="https://unsplash.com/" target="_new"><img className="unsplash" alt="Unsplash logo" src={appTheme.dark() ? UnsplashLogoDark : UnsplashLogo} /></a>
    </div>
  );
};
