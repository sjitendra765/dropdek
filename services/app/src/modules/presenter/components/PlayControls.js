import React from 'react';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from "@material-ui/styles";
import Button from "@material-ui/core/Button";
import { KeyboardArrowLeft, KeyboardArrowRight, MoreVert } from "@material-ui/icons";
import { Divider } from "@material-ui/core";

const styles = (theme) => ({
  root: {
    display: "flex",
    textAlign: 'center',
    position: 'absolute',
    width: 'fit-content',
    bottom: -100,
    transition: "bottom 500ms ease",
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 2,
    opacity: "0.8",
    borderRadius: 40,
    border: "1px solid rgba(255, 255, 255, 0.2)",
    background: "rgba(0,0,0,0.65)",
    boxShadow: '0px 2px 4px rgba(0,0,0,0.35)',
    "&:hover": {
      background: "rgba(0,0,0,0.7)"
    }
  },
  button: {
    border: "1px solid rgba(255, 255, 255, 0.1)",
    backgroundColor: "#000",
    color: "rgba(255, 255, 255, 0.5)",
    margin: 10,
    boxShadow: '0px 2px 4px rgba(0,0,0,0.35)',
    "&:hover": {
      color: "rgba(255, 255, 255, 0.9)",
      backgroundColor: "#000",
      opacity: 0.95,
      boxShadow: '0px 3px 5px rgba(0,0,0,0.7)',
    }
  }
});

/**
 * Controls for the {@link Play}. Has to be a HOC so I can manipulate the state externally!
 *
 */
export class PlayControls extends React.Component {

  constructor(props) {
    super(props);
    this.exit = props.exit;
    this.playerControls = props.playerControls;
    this.state = { fullscreen: false };
    this.controls = React.createRef();
    this.hider = null;
  }

  hide = () => {
    if (this.controls && this.controls.current) {
      this.controls.current.style.bottom = "-100px";
    }
  };

  show = (temporary) => {
    clearTimeout(this.hider);
    if (temporary) {
      this.hider = setTimeout(() => {
        this.hide();
      }, 1500);
    }
    this.controls.current.style.bottom = "3%";
  };

  fullscreenElement = () => document.fullscreenElement
      || document.webkitFullscreenElement
      || document.mozFullScreenElement;

  toggleFullscreen = () => {
    if (this.fullscreenElement()) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) { /* Firefox */
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) { /* IE/Edge */
        document.msExitFullscreen();
      }
      this.setState({ fullscreen: false });
    } else {
      if (document.body.requestFullscreen) {
        document.body.requestFullscreen();
      } else if (document.body.mozRequestFullScreen) { /* Firefox */
        document.body.mozRequestFullScreen();
      } else if (document.body.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        document.body.webkitRequestFullscreen();
      } else if (document.body.msRequestFullscreen) { /* IE/Edge */
        document.body.msRequestFullscreen();
      }
      this.setState({ fullscreen: true });
    }
  };

  mouseEnter = (ev) => {
    this.show(false);
  };

  mouseLeave = (ev) => {
    this.hide();
  };

  render() {
    const { classes } = this.props;
    const icon = this.state.fullscreen ? <FullscreenExitIcon fontSize="large"/> : <FullscreenIcon fontSize="large"/>;
    return (
      <div

        ref={this.controls}
        className={classes.root}
        onMouseEnter={this.mouseEnter}
        onMouseLeave={this.mouseLeave}
      >
        <IconButton size="medium" disabled={this.props.isBeginning} className={classes.button} onClick={this.playerControls.previous}>
          <KeyboardArrowLeft fontSize="large"/>
        </IconButton>
        <IconButton size="medium" disabled={this.props.isEnd} className={classes.button} onClick={this.playerControls.next}>
          <KeyboardArrowRight fontSize="large"/>
        </IconButton>

        <Divider orientation="vertical" flexItem />

        <IconButton size="medium" onClick={this.toggleFullscreen} className={classes.button}>
          {icon}
        </IconButton>
        {this.exit ? (
          <>
            <Divider orientation="vertical" flexItem/>
            <Button variant="contained" size="medium" onClick={this.exit} style={{
              borderRadius: 30,
              padding: 12
            }} className={classes.button}>
              <CloseIcon fontSize="large"/>
              <span style={{
                marginLeft: 10,
                marginRight: 12,
                fontSize: "1.1em"
              }}>Exit
              </span>
            </Button>
          </>
        ) : null}
      </div>
    );
  }
}
export default withStyles(styles)(PlayControls);
