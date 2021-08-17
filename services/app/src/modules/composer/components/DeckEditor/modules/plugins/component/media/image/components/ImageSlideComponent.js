import React from "react";
import SlideComponent from "../../../../../../../../../../common/slide/SlideComponent";
import { getLabel, getUrl } from "../transforms/imageTransforms";
import { ImageComponent } from "../../components/ImageComponent";
import { Slide } from "../../../../../../../../../../common/slide";
import { isUnsplashUrl } from "../queries/isUnsplashUrl";

const imageScaling = (view, url) => {
  // TODO Need a more reliable way to deal with Unsplash vs other images
  if (isUnsplashUrl(url)) {
    if (view === Slide.View.PDF) {
      return `${url}&w=800`;
    }

    return (width, height) => {

      // If we both have width and height then we crop the image (fit=crop).
      if (width > 0 && height > 0) {
        return `${url}&w=${width.toFixed()}&h=${height.toFixed()}&fit=crop`;
      }

      // If we only have height then that is the constraining dimension.
      if (height > 0) {
        return `${url}&h=${height.toFixed()}`;
      }

      // Otherwise we constrain by width.
      return `${url}&w=${(width > 0) ? width.toFixed() : 800}`;
    };
  }
  return url;
};

export class ImageSlideComponent extends SlideComponent {
  constructor(node, view, themeName, settings, monitor) {
    super();

    const url = getUrl(node);
    const label = getLabel(node);

    // Interpret relative URLs relative to the API service.
    if (url !== undefined) {
      this.setComponent(<ImageComponent url={imageScaling(view, url)} label={label} onReady={monitor.watch(url)}/>);
    }
  }
}
