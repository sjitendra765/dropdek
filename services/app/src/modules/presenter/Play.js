import React, { useEffect, useState } from 'react';
import './Play.css';
import LoadingStateComponent from 'modules/composer/components/LoadingStateComponent';
import { useHistory } from "react-router-dom";
import PlayControls from './components/PlayControls';
import 'highlight.js/styles/default.css';
import Player from "./components/Player";
import { generateSlides } from "../../common/slide/SlideFactory";
import { Slide } from "../../common/slide/Slide";
import { ProgressTracker } from "../../common/util/ProgressTracker";
import HoldingScreen from "./HoldingScreen";
import { ThemeFactory } from "../../common/theme/ThemeFactory";
import KeyboardHandler from "../../KeyboardHandler";
import { goBackOrReload } from "./queries/goBackOrReload";
import { LoadingComponent } from "./components/LoadingComponent";
import { logger } from "../../common/util/logger";
import PlayModule from "./PlayModule";
import { ROUTE_ERROR } from "../../Routes";
import { isDevMode } from "../../App";
import { IMAGE } from "../composer/components/DeckEditor/modules/plugins/component/media/image/type";
import { SLIDE } from "../composer/components/DeckEditor/modules/plugins/component/slide/type";
import { isUnsplashUrl } from "../composer/components/DeckEditor/modules/plugins/component/media/image/queries/isUnsplashUrl";

/**
 * Get first image in a deck!
 *
 * @param content
 * @returns {null|*}
 */
export const getFirstImage = (content) => {
  for (let i = 0; i < content.length; i++) {
    if (content[i].type === SLIDE) {
      for (let el = 0; el < content[i].children.length; el++) {
        const node = content[i].children[el];
        if (node.type === IMAGE) {
          return node.settings;
        }
      }
    }
  }
  return null;
};

/**
 * Full screen, independent player for Decks.
 *
 * @param match
 * @returns {*}
 * @constructor
 */
const Play = ({ match, embed = false, preview = false, isReference = false }) => {
  const [controls, setControls] = useState(null);
  const [deck, setDeck] = useState(undefined);
  const [slides, setSlides] = useState(undefined);
  const [progress, setProgress] = useState(0);
  const [firstReady, setFirstReady] = useState(false);
  const [ready, setReady] = useState(false);
  const [start, setStart] = useState(preview || embed || isReference);
  const [mainImage, setMainImage] = useState(null);

  const monitor = new ProgressTracker(() => {
    setReady(true);
  }, (p) => setProgress(p));

  const history = useHistory();
  const reloadPlayer = () => setStart(false);

  const exit = goBackOrReload(reloadPlayer, history);

  useEffect(() => {
    PlayModule.load(match.params.id, isReference)
      .then((loadedDeck) => {
        if (loadedDeck) {
          if (isReference) {
            setDeck(loadedDeck);
          } else {
            setDeck(loadedDeck);
            const image = getFirstImage(loadedDeck.content);
            if (image) {
              let { url, height, width } = image;
              if (isUnsplashUrl(url)) {
                url = `${image.url}&w=800&h=400&fit=crop`;
                height = 400;
                width = 800;
              }
              setMainImage({ ...image, url, height, width });
            }
          }
        } else {
          // eslint-disable-next-line
          if (!isDevMode()) {
            document.location = `${ROUTE_ERROR}/${match.params.id}`;
          } else {
            logger.error(`Unable to load deck ${match.params.id}`);
          }
        }
      })
      .catch((e) => {
        if (!isDevMode()) {
          document.location = `${ROUTE_ERROR}/${match.params.id}`;
        } else {
          logger.error(`Unable to load deck ${match.params.id}`);
          logger.error(e);
        }
      });

    document.querySelector("html").style.overflow = "hidden";
  }, [match.params.id]);

  useEffect(() => {
    if (deck) {
      setSlides(generateSlides(deck.content, Slide.View.FULL, deck.theme, monitor, setFirstReady));
    }
  }, [deck]);

  const [playerControls, setPlayerControls] = useState({
    previous: () => logger.debug("Previous slide"),
    next: () => logger.debug("Next slide"),
  });

  const [isBeginning, setIsBeginning] = useState();
  const [isEnd, setIsEnd] = useState();

  if (slides) {
    const { theme, branding } = deck;

    // Set deck name
    document.title = `${deck && deck.name ? deck.name : "Untitled"} 📽️ Dropdeck`;

    // Default theme
    let themeName = ThemeFactory.DEFAULT_THEME_NAME;

    // Override the theme if we get a new state from Redux, this causes change in Editor state
    if (theme) {
      themeName = theme || themeName;
    }

    const mouseMove = () => {
      controls.show(true);
    };

    const keyMap = {
      SHOW_KEYBOARD_SHORTCUTS: "cmd+shift+?",
      GO_HOME: "cmd+shift+h",
      CREATE_DECK: ["cmd+shift+n", "ctrl+shift+n"],
      GO_MEDIA: "cmd+shift+m",
      ESCAPE: "esc"
    };

    return (
      <KeyboardHandler keyMap={keyMap} reload={reloadPlayer}>
        <div style={{ height: "100vh", backgroundColor: "#000" }}>
          { start ? <LoadingComponent firstReady={firstReady} ready={ready} deck={deck} progress={progress}/> : <HoldingScreen firstReady={firstReady} progress={progress} deck={deck} start={start} setStart={setStart}/> }
          <div id="player" onMouseMove={mouseMove} style={{ position: "relative", marginTop: "auto", height: firstReady ? "100%" : 0, backgroundColor: "#000" }}>
            <Player playerControls={playerControls} setIsBeginning={setIsBeginning} setIsEnd={setIsEnd} aspect={deck.aspect} slides={slides} themeName={themeName} branding={branding} monitor={monitor} go={start}/>
          </div>
          { start ? <PlayControls isBeginning={isBeginning} isEnd={isEnd} playerControls={playerControls} ref={setControls} exit={!embed ? exit : null} /> : null }
        </div>
      </KeyboardHandler>
    );
  }

  return (<div style={{ backgroundColor: "#000" }}><LoadingStateComponent progress={1} player /></div>);
};
export default Play;
