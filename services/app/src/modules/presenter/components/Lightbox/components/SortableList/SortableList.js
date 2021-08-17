/* eslint-disable jsx-a11y/no-static-element-interactions */

import React from "react";
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import SortableItem from "../SortableItem";
import TutorialHelper from "../TutorialHelper";
import { LightboxDropZone } from "../LightboxDropZone/LightboxDropZone";
import { slideTransitionClass } from './transforms/slideTransitionClass';

export const SortableList = SortableContainer(({
  slides,
  deckId,
  activeSlide,
  lightboxClasses,
  cols,
  showTutorial,
  variant,
  aspect,
  slideClasses,
  operations,
  branding,
  themePackage,
  themeClasses,
  square,
  remixPreviewClasses,
  toolbarClasses,
  metadata,
  readOnly,
  focusOnClick,
  dropZoneProperties,
}) => {
  const { noOfFiles, dropZoneIndex, dropZonePosition, dropZoneInLightBox } = dropZoneProperties;
  return (
    <Grid container className={`${slideClasses.remixStyles}`}>
      {slides.map((slide, index) => {
        let transitionClass = '';
        let selectWidgetPosition = '';
        if (dropZoneIndex !== -1) {
          const slideClasses = slideTransitionClass(dropZoneIndex, cols, slides, dropZonePosition, index);
          transitionClass = slideClasses.slideTransitionClass;
          selectWidgetPosition = slideClasses.selectWidgetPosition;
        }
        if (dropZoneIndex === index) {
          const lastPosition = dropZoneInLightBox || ((dropZoneIndex === slides.length - 1) && ((slides.length - 1) % cols !== 0));
          return (
            <React.Fragment key="dropZone">
              {
                selectWidgetPosition === 'left' && (
                  <Box flexBasis="100%" height={0} marginRight="160px" />
                )
              }
              <LightboxDropZone
                lightboxClasses={lightboxClasses}
                cols={cols}
                aspect={aspect}
                index={index}
                slideValue={slides[dropZoneIndex - 1]}
                onWidgetDrop={operations.onWidgetDrop}
                noOfFiles={noOfFiles}
                selectWidgetPosition={selectWidgetPosition}
                lastPosition={lastPosition}
                slideLength={slides.length}
              />
            </React.Fragment>
          );
        }

        return (
          <SortableItem
            key={`sortable-${slide.id}`}
            index={index}
            slideIndex={index}
            slide={slide}
            isActive={activeSlide !== undefined && activeSlide === slide.id}
            lightboxClasses={lightboxClasses}
            cols={cols}
            deckId={deckId}
            variant={variant}
            aspect={aspect}
            slideClasses={slideClasses}
            themePackage={themePackage}
            themeClasses={themeClasses}
            square={square}
            remixPreviewClasses={remixPreviewClasses}
            metadata={metadata}
            readOnly={readOnly}
            toolbarClasses={toolbarClasses}
            dropZoneProperties={dropZoneProperties}
            slideTransitionClass={transitionClass}
            operations={operations}
          />
        );
      })}
      {(!readOnly && showTutorial) ? <TutorialHelper show={showTutorial} cols={cols} /> : null}
    </Grid>
  );
});
