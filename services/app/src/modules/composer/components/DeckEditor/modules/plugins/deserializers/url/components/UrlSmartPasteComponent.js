import CircularProgress from "@material-ui/core/CircularProgress";
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabPanel from '@material-ui/lab/TabPanel';
import React, { useCallback, useEffect, useState } from "react";
import { Editor, Path, Transforms } from "slate";
import { useEditor } from "slate-react";
import { componentBuilder } from "../../../../../../../../../common/api/plugins/builder/ComponentBuilder";
import LinkService from "../../../../../../../../../common/api/sdk/services/Links";
import GenericButton from "../../../../../../../../../common/components/buttons/GenericButton";
import GenericButtonGroup from "../../../../../../../../../common/components/buttons/GenericButtonGroup";
import TabList from "../../../../../../../../../common/components/popup/editor/TabList";
import Section from "../../../../../../../../../common/components/popup/editor/Section";
import { LinkSettings } from "../../../../../components/LinkMenu/LinkMenu";
import { SlideTransforms } from "../../../../../services/transforms/SlideTransforms";
import { urlSmartPasteComponentStyles } from "./UrlSmartPasteComponent.styles";
import { FROM_UNSPLASH } from "../../../component/media/image/components/ImageEditorElement";
import { setRemix } from "../../../../../../../transforms/remix/shiftRemix";
import { textImages5050FullBleedRemix } from "../../../../../../../../../common/remix/rules/textImage/fullBleed/50-50/textImages5050FullBleed/textImages5050FullBleed";

export const UrlSmartPasteComponent = ({
  data,
  onClose
}) => {
  const editor = useEditor();
  const [tab, setTab] = useState(0);
  const [target] = useState(editor.selection);
  const selectedText = Editor.string(editor, target);

  const handleTabChange = (event, value) => {
    setTab(value);
  };

  const [state, setState] = useState({
    loading: true,
    metadata: undefined,
  });

  useEffect(() => {
    if (!selectedText || selectedText.length === 0) {
      LinkService.scrape(url)
        .then((metadata) => {
          setState((prevState) => ({
            ...prevState,
            loading: false,
            metadata,
          }));
        })
        .catch((error) => {
          setState((prevState) => ({
            ...prevState,
            loading: false,
          }));
        });
    }
  }, []);

  const addAsNewSlide = (event) => {
    event.preventDefault();
    const builder = componentBuilder();
    const nodes = [];
    if (state.metadata.title) {
      nodes.push(builder.title(state.metadata.title));
    }
    if (state.metadata.site) {
      nodes.push(builder.subtitle(state.metadata.site));
    }
    if (state.metadata.description) {
      nodes.push(builder.paragraph(state.metadata.description));
    }
    if (state.metadata.image) {
      nodes.push(builder.image({
        url: state.metadata.image,
        from: FROM_UNSPLASH,
        label: state.metadata.query,
      }));
    }

    if (nodes.length > 0) {
      const slide = SlideTransforms.currentSlide(editor);
      const isEmpty = SlideTransforms.isSlideEmpty(editor, slide[0]);

      let newSlidePath;
      if (isEmpty) {
        Editor.withoutNormalizing(editor, () => {
          const targetPath = slide[1].concat(0);
          Transforms.removeNodes(editor,{ at: targetPath });
          Transforms.insertNodes(editor, nodes, { at: targetPath, select: true });
          setRemix(editor)({ path: SlideTransforms.getSlidePath(editor, targetPath) }, textImages5050FullBleedRemix.name());
        });
      } else {
        const currentSlidePosition = SlideTransforms.getIndexOfCurrentSlide(editor);
        const position = currentSlidePosition !== undefined ? currentSlidePosition + 1 : undefined;
        newSlidePath = editor.insertSlide({ children: nodes, position });
        if (newSlidePath) {
          setRemix(editor)({ path: SlideTransforms.getSlidePath(editor, newSlidePath) }, textImages5050FullBleedRemix.name());
        }
      }

      if (newSlidePath) {
        Transforms.select(editor, newSlidePath);
      }
    }
    onClose();
  };

  const url = data;
  const useStyles = useCallback(urlSmartPasteComponentStyles(), []);
  const urlSmartPasteComponentClasses = useStyles();

  // Don't use smart paste scraping when user has text selected.
  if (selectedText && selectedText.length > 0) {
    return (
      <LinkSettings
        sectionStyle={{ minHeight: 189 }}
        buttonVariant="text"
        addButtonText="Insert Link"
        closeMenu={onClose}
        editor={editor}
        target={target}
        initialUrl={data}
        initialText={selectedText}
      />
    );
  }

  return (
    <>
      {
        state.loading && (
          <div className={urlSmartPasteComponentClasses.loadingSpinner} style={{ minHeight: 180, display: "flex", alignItems: "center" }}>
            <CircularProgress className="icon" color="primary" size={30}/>
          </div>
        )
      }
      {
        !state.loading && (
          <TabContext value={tab}>
            <TabList onChange={handleTabChange}>
              <Tab label="Link" value={0} style={{ minWidth: 130 }}/>
              <Tab label="Create Slide" style={{ minWidth: 130 }} value={1} disabled={!state.metadata}/>
            </TabList>
            <TabPanel value={0} style={{ padding: 0 }}>
              <LinkSettings
                buttonVariant="text"
                addButtonText="Add Link"
                closeMenu={onClose}
                editor={editor}
                target={target}
                initialUrl={data}
                initialText={state.metadata?.title}
                showCancelButton={false}
              />
            </TabPanel>
            {
              state.metadata && (
                <TabPanel value={1} style={{ padding: 0 }}>
                  <Section>
                    <div style={{ color: "#fff" }}>
                      <div style={{ fontWeight: 600, fontSize: "0.9em" }}>{state.metadata.title}</div>
                      <div style={{ fontSize: "0.75em", fontWeight: 600, textTransform: "uppercase", padding: "4px 0 4px 0" }}>{state.metadata.site}</div>
                      <div style={{ fontSize: "0.75em" }}>
                        {
                          state.metadata.image && (<img alt="from web page" src={state.metadata.image} align="right" style={{ width: "35%", float: "right", margin: "0 0 2px 2px" }}/>)
                        }
                        {state.metadata.description}
                      </div>
                    </div>
                  </Section>

                  <div style={{ display: "flex", justifyContent: "space-between", padding: 10 }}>
                    <div> </div>
                    <GenericButtonGroup>
                      <GenericButton aria-label="cancel" onClick={onClose}>Cancel</GenericButton>
                      <GenericButton primary submit aria-label="add" onClick={addAsNewSlide}>Create Slide</GenericButton>
                    </GenericButtonGroup>
                  </div>
                </TabPanel>
              )
            }
          </TabContext>
        )
      }
    </>
  );
};
