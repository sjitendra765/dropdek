import { useEffect } from "react";
import { apiHost } from "../../../App";
import { verifyDeckCover } from "../transforms/verifyDeckCover";

/**
 * Delete decks that have not been saved.
 *
 * @param shouldCleanUp
 * @param id
 */
const useCleanUp = (presentation, content, shouldCleanUp) => {
  useEffect(() => {
    const cleanUp = () => {
      if (shouldCleanUp) {
        const payload = { coverId: verifyDeckCover(presentation, content).coverId, content };
        const headers = { type: "application/json" };
        const blob = new Blob([JSON.stringify(payload)], headers);
        navigator.sendBeacon(`${apiHost()}/decks/${presentation.id}/exit`, blob);
      }
    };

    window.addEventListener("beforeunload", cleanUp);
    return () => {
      window.removeEventListener("beforeunload", cleanUp);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldCleanUp]); // we only need to re-register the hook when the shouldCleanUp flag changes
};
export { useCleanUp };
