import { vimeoUrlHandler } from "../vimeo/vimeoUrlHandler";
import { youTubeUrlHandler } from "../youTube/youTubeUrlHandler";

export const fetchVideoMetadata = (url, resolve) => {
  if (vimeoUrlHandler.matches(url)) {
    return vimeoUrlHandler.fetchMetadata(url);
  }
  return youTubeUrlHandler.fetchMetadata(url);
};
