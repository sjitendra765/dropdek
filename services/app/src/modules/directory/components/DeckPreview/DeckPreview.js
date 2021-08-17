import React, { useEffect, useState } from "react";
import CardMedia from "@material-ui/core/CardMedia";
import Cover from "../../../presenter/components/Cover/Cover";
import { slideById } from "../../../composer/components/DeckEditor/modules/plugins/slide/transforms/slideById";
import { PreviewPlayer } from "./components/PreviewPlayer";
import { DEFAULT_ASPECT_RATIO } from "../../../../common/model/Deck";
import { apiHost } from "../../../../App";
import { ThemeFactory } from "../../../../common/theme/ThemeFactory";

/**
 * Preview component that toggles between a cover slide and swipeable player.
 *
 * @param deck
 * @returns {*}
 * @constructor
 */
const DeckPreview = ({ deck }) => {

  const [preview, setPreview] = useState(undefined);

  useEffect(() => {
    if (deck !== undefined) {
      const { coverId, theme, branding, content } = deck;
      const cover = slideById(content, coverId);
      setPreview(<Cover node={cover} themeName={theme || ThemeFactory.DEFAULT_THEME_NAME} branding={branding} aspect={DEFAULT_ASPECT_RATIO} />);
    }
  }, [deck]);

  let delay = null;
  const togglePlayer = (e) => {
    const { type } = e;
    if (type === "mouseenter") {
      delay = setTimeout(() => setPreview(<PreviewPlayer deck={deck}/>), 50);
    } else if (type === "touchstart") {
      setPreview(<PreviewPlayer deck={deck}/>);
    } else if (type === "mouseleave" && delay !== null) {
      clearTimeout(delay);
    }
  };

  return <div style={{ height: "100%" }} onMouseEnter={togglePlayer} onMouseLeave={togglePlayer} onTouchStart={togglePlayer}>{preview}</div>;
};
export default DeckPreview;
