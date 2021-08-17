import { vimeoUrlHandler } from "../vimeo/vimeoUrlHandler";
import { youTubeUrlHandler } from "../youTube/youTubeUrlHandler";

export const isVideoUrl = (url) => vimeoUrlHandler.matches(url) || youTubeUrlHandler.matches(url);
