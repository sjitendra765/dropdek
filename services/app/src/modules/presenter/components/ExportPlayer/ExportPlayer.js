import React, { useEffect, useLayoutEffect, useState } from 'react';
import 'highlight.js/styles/default.css';
import { useLocation } from "react-use";
import { generateSlides } from "../../../../common/slide/SlideFactory";
import Dropdeck from "../../../../common/api/sdk/Dropdeck";
import { Slide } from "../../../../common/slide/Slide";
import { ThemeFactory } from "../../../../common/theme/ThemeFactory";
import { ProgressTracker } from "../../../../common/util/ProgressTracker";
import { Deck } from "../../../../common/model/Deck";
import { LoadingComponent } from "../LoadingComponent";
import SlideListing from "./components/SlideListing";
import LoadingStateComponent from "../../../composer/components/LoadingStateComponent";
import "./ExportPlayer.css";
import { slideById } from "../../../composer/components/DeckEditor/modules/plugins/slide/transforms/slideById";
import { useQuery } from "../../../../common/util/useQuery";

/**
 * Full screen rendering of the cover slide.
 *
 * @param match
 * @returns {*}
 * @constructor
 */
const ExportPlayer = ({ match, cover }) => {
  const [deck, setDeck] = useState(undefined);
  const [slides, setSlides] = useState(undefined);
  const [firstReady, setFirstReady] = useState(false);
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);
  const query = useQuery();
  const width = query.get("w");
  const height = query.get("h");
  const dimensions = width && height ? { width, height } : undefined;
  const showCover = cover;

  const monitor = new ProgressTracker(() => {
    setReady(true);
  }, (p) => setProgress(p));

  useEffect(() => {
    Dropdeck.Decks.play(match.params.id)
      .then((payload) => {
        const d = Deck.fromDataObject(payload.data);
        setDeck(d);
        const nodes = showCover ? [slideById(d.content, d.coverId)] : d.content;
        const deckSlides = generateSlides(nodes, Slide.View.PDF, d.theme, monitor, setFirstReady);
        setSlides(deckSlides);
      })
      .catch((e) => {
        document.location = `/error/${match.params.id}`;
      });

  }, [match.params.id]);

  useEffect(() => {
    if (progress === 100) {
      window.deckLoaded = true;
    }
  }, [progress]);

  if (slides) {
    const { theme, branding } = deck;

    // Set deck name
    document.title = `${deck && deck.name ? deck.name : "Untitled"}`;

    // Default theme
    const themeName = theme || ThemeFactory.DEFAULT_THEME_NAME;

    return (
      <div style={{ height: "100vh", backgroundColor: "#000" }}>
        <LoadingComponent firstReady={firstReady} ready={ready} deck={deck} progress={progress}/>
        <div id="player" style={{ position: "relative", marginTop: "auto", height: "100%" }}>
          <SlideListing dimensions={dimensions} aspect={deck.aspect} slides={slides} themeName={themeName} branding={branding} monitor={monitor} animate={false} />
        </div>
      </div>
    );
  }
  return (<div style={{ backgroundColor: "#000" }}><LoadingStateComponent progress={1} player /></div>);
};
export default ExportPlayer;
