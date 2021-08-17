/* eslint-disable jsx-a11y/no-static-element-interactions */

import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import MessageFactory, { StatusMessage } from "../../../../../../../common/util/MessageFactory";
import { templateGridStyles } from "./TemplateGrid.styles";
import Breakpoints from "../../../../../../../common/util/Breakpoints";
import TemplateService from "../../../../../../../common/api/plugins/template/TemplateService";
import { slidesFromTemplates } from "./transforms/slidesFromTemplates";
import LightboxSlide from "../../../../../../presenter/components/Lightbox/components/LightboxSlide";
import { ThemeFactory } from "../../../../../../../common/theme/ThemeFactory";
import { buildCombinedSlideStyles } from "../../../../../../presenter/queries/buildCombinedSlideStyles";
import { LIGHTBOX_REMIXES_JSS_INDEX } from "../../../../../../presenter/components/Lightbox/Lightbox";
import { remixPreviewStyles } from "../../../../../../presenter/components/Lightbox/remixPreviewStyles";
import Label from "../../../../../../../common/components/controls/Label";
import { suggestImagesForSlide } from "../../../../../../../common/api/plugins/template/queries/suggestImagesForSlide";
import { ImageDataProvider } from "../../../../../../../common/api/plugins/template/ImageDataProvider";
import { isDynamicTemplate } from "../../../../../../../common/api/plugins/template/queries/isDynamicTemplate";
import { DataProvider } from "../../../../../../../common/api/plugins/template/DataProvider";
import { nodeToQuery } from "../../../../../../../common/api/plugins/template/queries/nodeToQuery";
import { componentBuilder } from "../../../../../../../common/api/plugins/builder/ComponentBuilder";
import { onKeyDownTemplateContainer } from "../onKeyDownTemplateContainer";
import GenericButton from "../../../../../../../common/components/buttons/GenericButton";

const Portal = ({ children }) => ReactDOM.createPortal(children, document.body);

const setScalingNoOp = () => {};

export const blankTemplate = componentBuilder().template({ name: 'Blank slide' });

const TemplateGrid = ({
  onSelect,
  query,
  preview,
  onCancel,
  path,
  slideNode,
  themeName,
  themeClasses,
  filter,
  newDeck = false,
  user,s
}) => {
  const [state, setState] = useState({
    query,
    elements: [],
    styles: undefined,
    dataProvider: undefined,
    stylesInitialized: false,
    focusedIndex: -1,
    showErrorMessage: false,
    fetchingImages: true,
    applyingTemplate: false,
  });
  const gridRef = useRef();
  const inputRef = useRef();
  const scrollEndRef = useRef();
  const focusedElementRef = useRef();
  const scrollRef = useRef();
  const themePackage = ThemeFactory.instance.get(themeName);
  const themeClass = themePackage.component;
  const SlideTheme = themeClass.wrapWithoutStyles;
  const templateService = TemplateService.instance();

  const useSlideStyles = useCallback(
    makeStyles(
      state.styles || {},
      { deterministic: false, meta: 'ThemeGridStyles', index: LIGHTBOX_REMIXES_JSS_INDEX + 1 }
    ), [state.styles]
  );
  const slideClasses = useSlideStyles();

  // Rebuild template slides
  useEffect(() => {
    if (state.dataProvider) {
      const { query = '' } = state;
      let templates = templateService.search(query, filter).map(({ template }) => (isDynamicTemplate(template) ? template(state.dataProvider) : template));
      if (newDeck && query === '') {
        templates = [blankTemplate, ...templates];
      }
      const slides = slidesFromTemplates(templates, path, slideNode, themeName);
      const elements = slides.map((slide, i) => ({ slide, template: templates[i] }));
      const styles = buildCombinedSlideStyles(slides, themeName, themePackage, {}, false, false);
      setState((prevState) => ({
        ...prevState,
        elements,
        stylesInitialized: true,
        styles,
      }));
    }
  }, [state.query, state.dataProvider]);

  // Fetch initial template placeholder data.
  useEffect(() => {
    const nodeQuery = nodeToQuery(slideNode);
    const evaluator = suggestImagesForSlide(nodeQuery);
    evaluator().then((images) => {
      const dataProvider = (images === undefined || images.length === 0) ? new DataProvider(user) : new ImageDataProvider(nodeQuery, images, user);
      setState((prevState) => ({
        ...prevState,
        dataProvider,
        fetchingImages: false,
      }));
    });
  }, []);

  const handleChangeQuery = (e) => {
    const query = e.target.value;

    setState((prevState) => ({
      ...prevState,
      query,
    }));
    // inputRef.current.focus();
  };

  // Register key events
  const handleKeyDownContainer = useCallback(onKeyDownTemplateContainer(onCancel), []);
  useEffect(() => {
    document.removeEventListener("keydown", handleKeyDownContainer);
    document.addEventListener("keydown", handleKeyDownContainer);
    return () => {
      document.removeEventListener("keydown", handleKeyDownContainer);
    };
  }, []);

  const useStyles = useCallback(templateGridStyles(), []);
  const classes = useStyles();

  const useRemixPreviewStyles = useCallback(remixPreviewStyles(), []);
  const remixPreviewClasses = useRemixPreviewStyles();

  const [welcome] = useState(MessageFactory.getText(StatusMessage.Welcome));

  return (
    <Portal>
      <Grid container>
        <Grid item {...Breakpoints.editor(preview)} className={classes.root}>
          <div className={classes.outer}>
            {newDeck && (
              <div style={{ padding: 25, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                <Label variant="h2" style={{ margin: "0px 15% 10px 15%" }}>{welcome}</Label>
                <Label variant="h3" style={{ margin: 15 }}>Welcome to Dropdeck</Label>
                <Label variant="p">Start from a template or a blank slate...</Label>
                <Label variant="p" style={{ fontSize: "0.7em" }}>Hint: Hit the escape key to start without a template!</Label>
              </div>
            )}
            <div style={{ display: "flex", flexDirection: "row", width: "100%", alignItems: "baseline", zIndex: 1 }}>
              <span className={classes.inputLabel}>Searching for: </span>
              <input
                ref={inputRef}
                className={classes.input}
                placeholder=" "
                onChange={handleChangeQuery}
              />
              <GenericButton secondary style={{ marginLeft: 16, padding: '3px 15px' }} onClick={onCancel}>
                Cancel
              </GenericButton>
            </div>
            <div className={`${slideClasses.remixStyles} ${classes.templateGridInner}`} ref={scrollRef}>
              {
                state.elements.length > 0 && (
                  <Box flex={1} width="100%">
                    <Grid
                      ref={gridRef}
                      container
                      spacing={1}
                      className={`${remixPreviewClasses.container} ${classes.templateGridItems}`}
                      tabIndex={-1}
                    >
                      {state.elements.map((element, index) => {
                        const { slide, template } = element;
                        return (
                          <Grid
                            key={template.name}
                            item
                            xs={6}
                            sm={4}
                            md={4}
                            lg={4}
                            className={classes.templateGridItemContainer}
                            ref={state.focusedIndex === index ? focusedElementRef : null}>
                            <div onClick={() => onSelect(template)} className={classes.templateGridItem}>
                              <SlideTheme classes={themeClasses}>
                                <LightboxSlide
                                  readOnly
                                  operations={{ setFontScaling: setScalingNoOp }}
                                  theme={themeClass}
                                  // branding={themeClass.branded && branding}
                                  className={slideClasses.slideRoot}
                                  style={{ pointerEvents: 'none', cursor: 'pointer', userSelect: 'none' }}
                                  paletteOverrideClasses={slideClasses}
                                  slide={slide}
                                />
                              </SlideTheme>
                            </div>
                            <div onClick={() => onSelect(template)}>
                              <Label className={classes.templateName}>{template.name}</Label>
                            </div>
                          </Grid>
                        );
                      })}
                    </Grid>
                    {
                      state.fetchingImages && (
                        <CircularProgress className={classes.loadMoreSpinner} color="primary" size={20}/>
                      )
                    }
                    <div ref={scrollEndRef}/>
                  </Box>
                )
              }
              {
                (state && state.elements && state.elements.length === 0 && state.showErrorMessage) && (
                  <p className={classes.noResults}>No templates found for &ldquo;{state.query}&rdquo;</p>
                )
              }
            </div>
            {
              ((state.applyingTemplate || state.fetchingImages) && !(state.showErrorMessage)) && (
                <div className={classes.insertSpinner}>
                  <CircularProgress color="primary" size={40}/>
                </div>
              )
            }
          </div>
        </Grid>
      </Grid>
    </Portal>
  );
};

function mapStateToProps(state) {
  return {
    preview: state.app.preview,
  };
}

export default connect(mapStateToProps, null)(TemplateGrid);
