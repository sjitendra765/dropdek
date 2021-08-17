import React from "react";
import SlideComponent from "../../../../../../../../../../common/slide/SlideComponent";
import { ImageComponent } from "../../components/ImageComponent";
import { getColors, getIsWhiteOnTransparent, getLabel, getUrl } from "../../image/transforms/imageTransforms";

export class LogoSlideComponent extends SlideComponent {
  constructor(node, view, themeName, settings, monitor) {
    super();
    const url = getUrl(node);
    const label = getLabel(node);
    const whiteOnTransparent = getIsWhiteOnTransparent(node);
    const colors = getColors(node);
    const bgColor = colors?.bgColor ? colors?.bgColor : whiteOnTransparent ? colors?.accent : null;

    if (url !== undefined) {
      this.setComponent(<ImageComponent url={url} label={label} onReady={monitor.watch(url)} backgroundColor={bgColor}/>);
    }
  }
}
