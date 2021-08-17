import React, { useCallback, useEffect, useMemo, useState } from 'react';
import debounce from "lodash.debounce";

import Grid from '@material-ui/core/Grid';
import { useMediaQuery, useTheme } from '@material-ui/core';
import { Presentation } from 'common/model/Deck';
import { connect } from 'react-redux';
import { ObserveKeys } from "react-hotkeys";
import { LoadingState } from 'common/api/Constants';
import { subject } from "@casl/ability";
import arrayMove from "array-move";
import { DndProvider } from "react-dnd";
import { makeStyles } from "@material-ui/styles";
import LoadingStateComponent from "./components/LoadingStateComponent";
import DeckEditor from "./components/DeckEditor/DeckEditor";
import { generateSlides } from "../../common/slide/SlideFactory";
import Breakpoints from "../../common/util/Breakpoints";
import KeyboardHandler from "../../KeyboardHandler";
import Dropdeck from "../../common/api/sdk/Dropdeck";
import { composerStyles } from "./composerStyles";
import { useUpdateDeck } from "../../common/api/sdk/hooks/DeckHooks";
import PreviewSection from "./components/PreviewSection/PreviewSection";
import { sendServerUpdates } from "./transforms/sendServerUpdates";
import { setPaletteForSlide } from "../../common/slide/transforms/palette/setPaletteForSlide";
import { setRemix, shiftRemix } from "./transforms/remix/shiftRemix";
import { resetRemix } from "./transforms/remix/resetRemix";
import { setDeckName, setPresentation } from "../../actions/presentation";
import { Slide } from "../../common/slide/Slide";
import { onContentChange } from "./transforms/onContentChange";
import Abilities from "../../common/authz/ability/Abilities";
import { useAbility } from "../../common/authz/ability/useAbility";
import ReferenceDecks from "../reference/decks/ReferenceDecks";
import { Can } from "../../common/authz/components/Can";
import { sendSlideUpdates } from "./transforms/sendSlideUpdates";
import { setScaling } from "./components/DeckEditor/modules/plugins/scaling/setScaling";
import AnonymousUser from "../../common/authz/AnonymousUser";
import SignInCTA from "./components/SignInCTA";
import { ThemeFactory } from "../../common/theme/ThemeFactory";
import { focusOnClick } from "./transforms/focusOnClick";
import { logger } from "../../common/util/logger";
import { resetScaling } from "./components/DeckEditor/modules/plugins/scaling/resetScaling";
import Inspiration from "./components/DeckEditor/components/Inspiration";
import useDebounce from "../../common/util/UseDebounce";
import { ROUTE_AUTH_EXPIRED, ROUTE_EDIT_DECK, ROUTE_ERROR } from "../../Routes";
import { useCleanUp } from "./hooks/DeckCleanUpHook";
import { SlideTransforms } from "./components/DeckEditor/services/transforms/SlideTransforms";
import { config } from "../../config";
import { NodeTransforms } from "./components/DeckEditor/services/transforms/NodeTransforms";
import { isTouchEnabled } from "./queries/isTouchEnabled";
import { dragImageOnNewSlide } from "./components/DeckEditor/modules/plugins/component/media/image/transforms/dragImageOnNewSlide";
import { dragImageOnSlide } from "./components/DeckEditor/modules/plugins/component/media/image/transforms/dragImageOnSlide";
import EditorFactory from "./components/DeckEditor/services/EditorFactory";
import { LIGHTBOX_THEME_JSS_INDEX } from "../presenter/components/Lightbox/Lightbox";
import { hasBeenUpdated } from "../../common/model/transforms/hasBeenUpdated";

const dndBackend = isTouchEnabled() ?
  require("react-dnd-touch-backend").TouchBackend :
  require("react-dnd-html5-backend").HTML5Backend;

/**
 * The {@link Composer} is made up of the editing capability including
 * the Rich Text {@link Editor}.
 *
 * @param props
 * @returns {*}
 * @constructor
 */
function Composer({
  isReference,
  presentation,
  setPresentation,
  match, preview,
  user,
  ...props
}) {

  // Default permissions for a deck, should be shared with API/schema
  const DEFAULT_PERMISSIONS = { public: false, company: false };
  const [activeSlide, setActiveSlide] = useState(null);
  const [contentState, setContentState] = useState(null);
  const [newDeck, setNewDeck] = useState(false);
  const [slides, setSlides] = useState([]);
  const [serverCommunicationStatus, communicatingWithServer] = useState(LoadingState.NONE);
  const [, setStatus] = useState(LoadingState.NONE);
  const [theme, setTheme] = useState(null);
  const [aspect, setAspect] = useState(null);
  const [highlightedPath, setHighlightedPath] = useState(null);
  const [readyForUpdates, setReadyForUpdates] = useState(false);
  const [dirtyState, setDirtyState] = useState(false);
  const [pasteHandler, setPasteHandler] = useState(null);
  const [promptSession, setPromptSession] = useState(undefined);
  const deckId = match.params.id;
  const materialTheme = useTheme();

  // Only re-generate the theme CSS if the theme changes.
  const themePackage = theme ? ThemeFactory.instance.get(theme, presentation.branding) : undefined;
  const useThemeStyles = useCallback(
    makeStyles(themePackage ? themePackage.component.css() : {}, { deterministic: false, meta: 'LightboxTheme', index: LIGHTBOX_THEME_JSS_INDEX }),
    [theme]
  );
  const themeClasses = useThemeStyles();

  const [showInspiration, setShowInspiration] = useState(undefined);

  // Show icon when we have active updates.
  const [setUpdate, { deck, error: setUpdateError }] = useUpdateDeck();
  useEffect(() => {
    if (deck) {
      communicatingWithServer(LoadingState.DONE);
      // Delay dispatching an action to remove componentReadyCallback state.
      setTimeout(() => {
        communicatingWithServer(LoadingState.NONE);
      }, 1000);
    }

    if (setUpdateError) {
      const statusCode = setUpdateError.response?.status;

      // Missing authentication (user's session has expired):
      if (statusCode && statusCode === 404) {
        document.location = `${ROUTE_AUTH_EXPIRED}?redirect=${encodeURI(`${ROUTE_EDIT_DECK}/${match.params.id}`)}`;
      } else {
        communicatingWithServer(LoadingState.ERROR);
      }
    }
  }, [deck, setUpdateError]);

  const setDocumentTitle = (presentation) => {
    //  Set deck name
    document.title = `${presentation && presentation.name ? presentation.name : "Untitled"} ✏️ Dropdeck`;
  };

  // Create a Slate editor object that won't change across renders.
  const editor = useMemo(() => EditorFactory.instance(materialTheme).createEditor(match.params.id, undefined, { setPasteHandler }), []);

  // --------------------------------------
  // DATA HOOKS
  // --------------------------------------

  const setDeck = (payload) => {
    const { data } = payload;
    const loadedPresentationObject = Presentation.fromDataObject(data);
    const { content } = data;
    setNewDeck(!hasBeenUpdated(data));
    setPresentation(loadedPresentationObject);
    setTheme(loadedPresentationObject.theme);
    setAspect(loadedPresentationObject.aspect);
    setContentState(content);
    setSlides(generateSlides(content, Slide.View.LIGHTBOX, loadedPresentationObject.theme));
    communicatingWithServer(LoadingState.DONE);
    setDocumentTitle(loadedPresentationObject);
  };

  /**
   * Load a presentation and override what's currently in the editor.
   */
  const overrideDeck = (payload) => {
    const data = { ...payload.data, _id: presentation.id, identifiers: presentation.identifiers, owner: presentation.owner, name: presentation.name, permissions: DEFAULT_PERMISSIONS };
    const loadedPresentationObject = Presentation.fromDataObject(data);
    const { content } = payload.data;
    setPresentation(loadedPresentationObject);
    setTheme(loadedPresentationObject.theme);
    setAspect(loadedPresentationObject.aspect);
    setContentState(content);
    setSlides(generateSlides(content, Slide.View.LIGHTBOX, loadedPresentationObject.theme));
    communicatingWithServer(LoadingState.DONE);
    setReadyForUpdates(false); // to avoid a double server update
    const dto = { ...loadedPresentationObject.toDataObject(), content };
    setUpdate(dto._id, { ...dto });
  };

  const loadDeck = (id) => {
    setStatus(LoadingState.LOADING);
    Dropdeck.Decks.byId(id)
      .then((payload) => {
        setDeck(payload);

        // Delay dispatching an action to remove done state.
        setTimeout(() => {
          communicatingWithServer(LoadingState.NONE);
        }, 2000);
      })
      .catch((e) => {
        logger.error(e);
        if (!config.app.isDevMode) document.location = `${ROUTE_ERROR}/${match.params.id}`;
      });
  };

  // Initial load of a deck from the server.
  useEffect(() => {
    if (!presentation) {
      if (isReference) {
        setStatus(LoadingState.DONE);
        const deck = ReferenceDecks.instance().get(match.params.id) || {};
        const { content } = deck;
        setPresentation(Presentation.fromDataObject(deck));
        setTheme(deck.theme);
        setAspect(deck.aspect);
        setContentState(content);
        setSlides(generateSlides(content, Slide.View.LIGHTBOX, deck.theme));
        setDocumentTitle(presentation);

      } else {
        loadDeck(match.params.id);
      }
    }
  }, [match.params.id]);

  const ability = useAbility();
  const readOnly = ability.cannot(Abilities.Actions.EDIT, subject(Abilities.Subjects.PRESENTATION, presentation));

  // 300 ms delay in sending server updates
  const debouncedPresentationDTO = useDebounce(presentation, 300);
  useEffect(
    () => {
      if (debouncedPresentationDTO) {
        if (readyForUpdates && !readOnly) {
          const dto = { ...debouncedPresentationDTO.toDataObject() };
          setUpdate(dto._id, { ...dto });
        } else {
          setReadyForUpdates(true); // avoids redundant PUT requests on first load
        }

      }
    },
    [debouncedPresentationDTO], // Only call effect if debounced presentation changes
  );

  // Post dirty state on window unloading.
  useCleanUp(presentation, contentState, dirtyState);

  // Re-render slides if either the theme or the aspect ratio change.
  useEffect(
    () => {
      if (presentation && contentState) {
        if (theme !== presentation.theme) {
          resetScaling(editor, contentState);

          // Re-generate slides if the theme changes.
          setSlides(generateSlides(contentState, Slide.View.LIGHTBOX, presentation.theme));
          setTheme(presentation.theme);
        }
        if (aspect && aspect !== presentation.aspect) {
          resetScaling(editor, contentState);
          setAspect(presentation.aspect);
        }
      }
      setDocumentTitle(presentation);
    },
    [presentation], // Only call effect if presentation changes
  );

  // --------------------------------------
  // RENDERING
  // --------------------------------------

  const isPhoneSize = useMediaQuery(materialTheme.breakpoints.down('xs'));

  // If preview is not explicitly set in the state, fall back on defaulting to editor if app is phone sized.
  // You can see the corresponding setting in the PreviewToggle, where same logic is assumed.
  if (preview === undefined) {
    preview = !isPhoneSize || isReference;
  }

  // Default theme
  const themeName = (presentation ? presentation.theme : ThemeFactory.DEFAULT_THEME_NAME) || ThemeFactory.DEFAULT_THEME_NAME;

  // Debounce server updates by 1s.
  const sendServerUpdatesDebounced = useCallback(debounce(
    sendServerUpdates(presentation, (data) => setUpdate(presentation.id, data), () => setDirtyState(false)), 1000
  ), [presentation]);

  // Debounce slide updates by 400ms or 10ms per slide (whichever is greater).
  const sendSlideUpdatesDebounced = useCallback(debounce(
    sendSlideUpdates(themeName), Math.max(400, slides.length * 10)
  ), [themeName]);

  const moveSlide = (slides, oldIndex, newIndex) => {
    SlideTransforms.moveSlide(editor, slides[oldIndex].id, newIndex);
    setSlides(arrayMove(slides, oldIndex, newIndex));
  };

  const onChange = onContentChange({
    editor,
    currentContent: contentState,
    setContentState,
    setActiveSlide,
    activeSlide,
    slides,
    setSlides,
    sendServerUpdates: sendServerUpdatesDebounced,
    sendSlideUpdates: sendSlideUpdatesDebounced,
    setHighlightedPath,
    setDirtyState,
  });

  const focusOnClickMemo = useMemo(() => focusOnClick(editor, setHighlightedPath), [editor, setHighlightedPath]);

  const useStyles = useCallback(composerStyles(), []);
  const classes = useStyles();

  const deckEditor = () => (
    <DeckEditor
      user={user}
      route={match}
      deckId={deckId}
      newDeck={newDeck}
      editor={editor}
      readOnly={readOnly}
      activeSlide={activeSlide}
      setDeckName={setDeckName}
      isPhoneSize={isPhoneSize} initialState={contentState}
      onContentChange={onChange}
      communicatingWithServer={communicatingWithServer}
      serverCommunicationStatus={serverCommunicationStatus}
      nameSetExplicitly={presentation && presentation.name !== null}
      highlightedPath={highlightedPath}
      pasteHandler={pasteHandler}
      setPasteHandler={setPasteHandler}
      themeName={themeName}
      themeClasses={themeClasses}
    />
  );

  const showEditor = () => (
    <Grid item {...Breakpoints.editor(preview)}
      className={`${classes.composerPane} ${preview ? 'preview-show' : 'preview-hide'}`}>
      {deckEditor()}
      {(user instanceof AnonymousUser) ? <SignInCTA/> : null}
      <Inspiration overrideDeck={overrideDeck} editor={editor} contentState={contentState} show={showInspiration} setShow={setShowInspiration}/>
    </Grid>
  );

  const hideEditor = () => (
    <div style={{ display: 'none' }}>
      {deckEditor()}
    </div>
  );

  const operations = {
    swapElements: (path1, path2) => NodeTransforms.swap(editor, path1, path2),
    setFontScaling: readOnly ? undefined : setScaling(editor),
    onImageDrop: dragImageOnSlide(editor, deckId),
    resetRemix: resetRemix(editor),
    shiftRemix: shiftRemix(editor),
    setRemix: setRemix(editor),
    pickPalette: setPaletteForSlide(editor),
    focusOnClick: focusOnClickMemo,
    moveSlide,
    editor: readOnly ? undefined : editor,
    onWidgetDrop: dragImageOnNewSlide(editor, deckId),
  };

  const mainSection = () => {
    if (presentation && contentState) {
      return (
        <div>
          <DndProvider backend={dndBackend}>
            <Grid container spacing={0} className={classes.main}>
              {/* Editor */}
              <Can I={Abilities.Actions.EDIT} this={subject(Abilities.Subjects.PRESENTATION, presentation)}>
                {(!isPhoneSize || (isPhoneSize && !preview)) ? showEditor() : hideEditor()}
              </Can>

              {/* Preview */}
              {preview ? (
                <PreviewSection
                  slides={slides}
                  user={user}
                  themeName={themeName}
                  readOnly={readOnly}
                  isReference={isReference}
                  presentation={presentation}
                  isPhoneSize={isPhoneSize}
                  activeSlide={activeSlide}
                  themeClasses={themeClasses}
                  operations={operations}
                />
              ) : null}
            </Grid>
          </DndProvider>
        </div>
      );
    }
    return (
      <LoadingStateComponent status={serverCommunicationStatus}/>
    );
  };

  const keyMap = {
    SHOW_KEYBOARD_SHORTCUTS: "cmd+shift+?",
    GO_HOME: "cmd+shift+h",
    CREATE_DECK: ["cmd+shift+n", "ctrl+shift+n"],
    GO_MEDIA: "cmd+shift+m"
  };

  return (
    <div className={classes.root}>
      <KeyboardHandler keyMap={keyMap}>
        <ObserveKeys>
          {mainSection()}
        </ObserveKeys>
      </KeyboardHandler>
    </div>
  );
}

const mapDispatchToProps = {
  setPresentation,
  setDeckName,
};

function mapStateToProps(state) {
  return {
    preview: state.app.preview,
    user: state.user,
    presentation: Presentation.fromDataObject(state.composer.presentation)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Composer);
