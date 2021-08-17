import React from "react";
import Button from "@material-ui/core/Button";
import { TemplatePreview } from "../TemplatePreview";
import Section from "../../../../../../../../../common/components/popup/Section";

export const TemplateDrawer = ({
  theme,
  hasMore,
  slideTemplates,
  loading,
  themeClasses,
  themeClass,
  templateMenuClasses,
  slideClasses,
  SlideTheme,
  onSelect,
  openModal,
}) => {

  const padding = "10px 0px 10px 0px";
  const border = `1px solid ${theme.dark() ? "rgba(36,37,38,0.95)" : "rgb(237, 237, 239)"}`;
  const backgroundColor = theme.dark() ? "rgba(42,42,42,0.95)" : "rgb(237, 237, 239)";
  const boxShadow = theme.dark() ? "inset 2px 2px 2px -1px rgba(29,30,32,0.75), inset -2px -2px 1px -1px rgba(29,31,32,0.65)" : "rgba(29,30,32,0.4) 0px 0px 1px, rgba(29,30,32,0.3) 0px 0px 4px";

  return (
    <Section override={{ padding, border, backgroundColor, boxShadow }}>
      <div className={templateMenuClasses.root}>
        <div className={templateMenuClasses.leftFade}> </div>
        <div className={`${slideClasses.remixStyles} ${templateMenuClasses.container}`}>
          <SlideTheme classes={themeClasses}>
            {slideTemplates.map(({
              slide,
              template,
              dynamic
            }) => (
              <TemplatePreview
                key={template.name}
                template={template}
                slide={slide}
                templateMenuClasses={templateMenuClasses}
                slideClasses={slideClasses}
                onSelect={onSelect}
                loading={loading && dynamic}
                themeClass={themeClass}
              />
            ))}
          </SlideTheme>
        </div>
        {
          hasMore && (
            <div className={templateMenuClasses.moreButton}>
              <Button variant="text" size="small" onClick={openModal} color="secondary">
                More
              </Button>
            </div>
          )
        }
      </div>
    </Section>
  );
};
