import chroma from "chroma-js";
import ColorThief from "colorthief";

export const browserExtractImageColorsWorker = async (url) => new Promise((resolve) => {
  const image = new Image();
  image.crossOrigin = "Anonymous";
  image.src = url;
  image.addEventListener("load", () => {
    const colorThief = new ColorThief();
    const palette = colorThief.getPalette(image, 5)
      .map((color) => chroma(color[0], color[1], color[2])
        .hex());
    resolve(palette);
  });
});
