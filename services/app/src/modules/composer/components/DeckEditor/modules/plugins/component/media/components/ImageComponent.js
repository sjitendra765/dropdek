/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React from "react";
import useDimensions from "react-cool-dimensions";

const getImageComponent = (url, onLoad, label, onMouseOver, onMouseOut) => {
  if (onMouseOver && onMouseOut) {
    return <img src={url} onLoad={onLoad} alt={label} onMouseOver={onMouseOver} onMouseOut={onMouseOut} crossOrigin="anonymous" />;
  }
  return <img src={url} onLoad={onLoad} alt={label} />;
};

export const ImageComponent = ({ url, label, onReady, onMouseOver, onMouseOut, backgroundColor }) => {

  const { ref, width, height } = useDimensions();

  const urlGenerator = (typeof url === 'function');
  return urlGenerator ? (
    <div className={`imgWrap${backgroundColor && backgroundColor.length > 0 ? " opaqueBg" : ""}`} style={{ backgroundSize: 'cover', background: backgroundColor || "inherit" }}>
      {getImageComponent(url(width, height), onReady, label, onMouseOver, onMouseOut)}
    </div>
  ) : (
    <div className={`imgWrap${backgroundColor && backgroundColor.length > 0 ? " opaqueBg" : ""}`} ref={ref} style={{ backgroundSize: 'cover', background: backgroundColor || "inherit" }}>
      {getImageComponent(url, onReady, label, onMouseOver, onMouseOut)}
    </div>
  );
};
