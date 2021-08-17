import { Transforms } from "slate";
import { ReactEditor } from "slate-react";
// eslint-disable-next-line import/no-webpack-loader-syntax
import { insertImages } from "./insertImage";
import { processUnsplashResults } from "./processUnsplashResults";

export const insertUnsplashImages = ({ editor, path, image, query, callback }) => {
  processUnsplashResults(image, query)
    .then((imageMetadata) => {
      const nodesAdded = insertImages(editor, imageMetadata, {
        at: path,
        select: true
      });
      const newPath = path.length === 2 ? [path[0], path[1] + nodesAdded] : path;

      // Path of the original paragraph where the image was triggered from.
      Transforms.select(editor, newPath);
      ReactEditor.focus(editor);

      callback();
    });
};
