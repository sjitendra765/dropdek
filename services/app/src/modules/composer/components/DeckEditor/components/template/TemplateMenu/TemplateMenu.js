import { makeStyles, useTheme } from "@material-ui/styles";
import debounce from "lodash.debounce";
import React, { useCallback, useEffect, useState } from "react";
import { ReactEditor, useEditor } from "slate-react";
import { DataProvider } from "../../../../../../../common/api/plugins/template/DataProvider";
import { ImageDataProvider } from "../../../../../../../common/api/plugins/template/ImageDataProvider";
import { isDynamicTemplate } from "../../../../../../../common/api/plugins/template/queries/isDynamicTemplate";
import { nodeToQuery } from "../../../../../../../common/api/plugins/template/queries/nodeToQuery";
import { suggestImagesForSlide } from "../../../../../../../common/api/plugins/template/queries/suggestImagesForSlide";
import TemplateService from "../../../../../../../common/api/plugins/template/TemplateService";
import { encodeStructure } from "../../../../../../../common/api/plugins/template/transforms/encodeStructure";
import { slideStructure } from "../../../../../../../common/api/plugins/template/transforms/slideStructure";
import Popup from "../../../../../../../common/components/popup/Popup/Popup";
import { ThemeFactory } from "../../../../../../../common/theme/ThemeFactory";
import { LIGHTBOX_REMIXES_JSS_INDEX } from "../../../../../../presenter/components/Lightbox/Lightbox";
import { buildCombinedSlideStyles } from "../../../../../../presenter/queries/buildCombinedSlideStyles";
import { onKeyDownTemplateContainer } from "../onKeyDownTemplateContainer";
import TemplateGrid from "../TemplateGrid/TemplateGrid";
import { slidesFromTemplates } from "../TemplateGrid/transforms/slidesFromTemplates";
import TemplateDrawerContainer from "./components/TemplateDrawer/TemplateDrawerContainer";

const TEMPLATES_TO_SHOW = 3;

export const TemplateMenu = ({
  popupAnchor,
  setPopupAnchor,
  popupWidth,
  toggleMagicDrawer,
  showInitially,
  setShowInitially,
  templateMenuClasses,
  applyTemplate,
  path,
  node,
  themeName,
  themeClasses,
  closeMenu,
  user,
}) => {

  const themePackage = ThemeFactory.instance.get(themeName);
  const themeClass = themePackage.component;
  const SlideTheme = themeClass.wrapWithoutStyles;
  const templateService = TemplateService.instance();
  const slideEncoding = encodeStructure(slideStructure(node));
  const isOpen = Boolean(popupAnchor);

  const editor = useEditor();

  const [showMagicGrid, setShowMagicGrid] = useState(showInitially);

  const [state, setState] = useState({
    styles: undefined,
    slideTemplates: [],
    slideTemplateHash: undefined,
    dataProvider: new DataProvider(user),
    stylesInitialized: false,
    loading: false,
    hasMore: false,
    showSearchMenu: false,
    query: '',
  });

  const openModal = () => {
    toggleMagicDrawer(false);
    setShowMagicGrid(true);
  };

  const onSelectGrid = (template) => {
    applyTemplate(template);
    setShowMagicGrid(false);
    toggleMagicDrawer(false);
    setShowInitially(false);
  };

  const onSelect = (template) => {
    setState((prevState) => ({
      ...prevState,
      loading: true,
    }));
    applyTemplate(template);
    setState((prevState) => ({
      ...prevState,
      loading: false,
    }));
    setShowInitially(false);
    setShowMagicGrid(false);
    toggleMagicDrawer(false);
  };

  const onCancel = () => {
    setShowInitially(false);
    setShowMagicGrid(false);
    toggleMagicDrawer(false);
    ReactEditor.focus(editor);
  };

  const useSlideStyles = useCallback(
    makeStyles(
      state.styles || {},
      { deterministic: false, meta: 'ThemeGridStyles', index: LIGHTBOX_REMIXES_JSS_INDEX + 1 }
    ), [state.styles]
  );
  const slideClasses = useSlideStyles();

  // Register key events
  const handleKeyDownContainer = useCallback(onKeyDownTemplateContainer(closeMenu), []);
  useEffect(() => {
    document.removeEventListener("keydown", handleKeyDownContainer);
    document.addEventListener("keydown", handleKeyDownContainer);
    return () => {
      document.removeEventListener("keydown", handleKeyDownContainer);
    };
  }, []);

  // Rebuild template slides
  useEffect(() => {
    if (state.dataProvider) {
      const templateMatches = templateService.search('', slideEncoding);
      const hasMore = templateMatches.length > TEMPLATES_TO_SHOW;
      const initialTemplateMatches = hasMore ? templateMatches.slice(0, TEMPLATES_TO_SHOW) : templateMatches;
      const templateCollection = initialTemplateMatches.map(({ template }) => {
        if (isDynamicTemplate(template)) {
          return {
            dynamic: true,
            template: template(state.dataProvider),
          };
        }
        return {
          dynamic: false,
          template,
        };
      });
      const slides = slidesFromTemplates(templateCollection.map(({ template }) => template), path, node, themeName);
      const slideTemplates = slides.map((slide, i) => ({
        slide,
        template: templateCollection[i].template,
        dynamic: templateCollection[i].dynamic,
      }));
      const styles = buildCombinedSlideStyles(slides, themeName, themePackage, {}, false, false);
      setState((prevState) => ({
        ...prevState,
        slideTemplates,
        slideTemplateHash: new Date().getTime(),
        stylesInitialized: true,
        hasMore,
        styles,
      }));
    }
  }, [state.dataProvider]);

  // Fetch initial template placeholder data
  useEffect(() => {
    if (!isOpen) {
      setState((prevState) => ({
        ...prevState,
        dataProvider: undefined,
        loading: false,
      }));
      return;
    }
    if (user && state.query && state.query.length > 1) {
      const evaluator = suggestImagesForSlide(state.query);
      setState((prevState) => ({
        ...prevState,
        loading: true,
      }));
      evaluator().then((images) => {
        const dataProvider = (images === undefined || images.length === 0) ? new DataProvider(user) : new ImageDataProvider(state.query, images, user);
        setState((prevState) => ({
          ...prevState,
          dataProvider,
          loading: false,
        }));
      });
    }
  }, [user, isOpen, state.query, slideEncoding]);

  // Debounce content updates to fetch new templates.
  const updateQuery = (query) => {
    setState((prevState) => ({
      ...prevState,
      query,
    }));
  };
  const updateQueryDebounced = useCallback(debounce(updateQuery, 1000), []);

  const nodeQuery = nodeToQuery(node);
  useEffect(() => {
    updateQueryDebounced(nodeQuery);
  }, [nodeQuery]);

  const theme = useTheme();
  return (
    <div>
      <Popup
        persistent
        inset
        instant
        disableFlip
        color={theme.dark() ? "#39393b" : "#fff"}
        arrowStyle={{ marginLeft: "-93%" }}
        anchor={popupAnchor}
        setAnchor={setPopupAnchor}
        open={isOpen}
        defaultPlacement="bottom"
        width={popupWidth}>

        <TemplateDrawerContainer
          slideHash={state.slideTemplateHash}
          theme={theme}
          hasMore={state.hasMore}
          slideTemplates={state.slideTemplates}
          loading={state.loading}
          themeClasses={themeClasses}
          themeClass={themeClass}
          templateMenuClasses={templateMenuClasses}
          slideClasses={slideClasses}
          SlideTheme={SlideTheme}
          onSelect={onSelect}
          openModal={openModal}
        />
      </Popup>
      {showMagicGrid && (
        <TemplateGrid
          newDeck={showInitially}
          slideNode={node}
          filter={slideEncoding}
          themeClasses={themeClasses}
          onSelect={onSelectGrid}
          onCancel={onCancel}
          path={path}
          themeName={themeName}
          user={user}
        />
      )}
    </div>
  );
};
