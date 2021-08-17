import React from 'react';
import Lightbox from './Lightbox';
import { logger } from "../../../../common/util/logger";

/**
 * {@link Lightbox} for showing slides when composing a presentation.
 *
 * @param props
 * @returns {*}
 * @constructor
 */
class LightboxContainer extends React.Component {

  /**
   * Re-render the Lightbox if, and only if, one or more of the following conditions are met:
   *
   * - There have been changes to the list of slides (determined by inspecting the time stamp on each Slide entry);
   * - The zoom level has been changed;
   * - The active slide has been changed.
   *
   * @param nextProps new properties.
   * @param nextState new state (ignored).
   * @param nextContext new context (ignored).
   * @returns {boolean}
   */
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    const slidesChanged = haveSlidesChanged(nextProps.slides, this.props.slides); // ObjectUtils.shallowEquals(nextProps, this.props);
    const zoomChanged = nextProps.cols !== this.props.cols;
    const activeSlideChanged = nextProps.activeSlide !== this.props.activeSlide;
    const aspectChanged = nextProps.aspect !== this.props.aspect;
    const hasChanged = slidesChanged || zoomChanged || activeSlideChanged || aspectChanged;
    if (hasChanged) {
      logger.trace(`Updating Lightbox because ${slidesChanged ? 'slides' : activeSlideChanged ? 'active slide' : aspectChanged ? 'aspect' : 'zoom'} changed`);
    }

    return hasChanged;
  }

  render() {
    if (this.props.slides) {
      return (<Lightbox {...this.props}/>);
    }
    return null;
  }
}
export default LightboxContainer;

const haveSlidesChanged = (newSlides, oldSlides) => {
  if ((!oldSlides && newSlides) || (oldSlides && !newSlides)) {
    return true;
  }
  if (!Array.isArray(oldSlides) || !Array.isArray(newSlides) || newSlides.length !== oldSlides.length) {
    return true;
  }

  // assert: newSlides.length === oldSlides.length

  for (let i = 0; i < oldSlides.length; i++) {
    const oldSlide = oldSlides[i];
    const newSlide = newSlides[i];
    if (oldSlide.id !== newSlide.id || oldSlide.timeStamp !== newSlide.timeStamp) {
      return true;
    }
  }
  return false;
};
