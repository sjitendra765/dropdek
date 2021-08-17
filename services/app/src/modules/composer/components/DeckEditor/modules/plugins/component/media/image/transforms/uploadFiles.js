import axios from "axios";
import { apiHost } from "../../../../../../../../../../App";
import { logger } from "../../../../../../../../../../common/util/logger";

export const uploadFiles = (
  deckId,
  files,
  {
    process,
    processMany,
    onSuccess = () => {},
    onError = () => {},
    clearTimeout = () => {}
  }
) => {
  const data = new FormData();
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    data.append("files", file);
  }
  axios.post(`${apiHost()}/decks/${deckId}/files`, data, { withCredentials: true })
    .then((response) => {
      const fileResults = response.data ? response.data : data;
      if (processMany) {
        const fileElements = fileResults.map((file) => {
          const { name, from, swatch } = file;
          return {
            url: `/assets/${deckId}/${name}`,
            name,
            from,
            swatch
          };
        });
        processMany(fileElements);
        onSuccess();
      } else if (process) {
        for (let i = 0; i < fileResults.length; i++) {
          const file = fileResults[i];
          process(`/assets/${deckId}/${file.name}`, file.name, { from: file.from, swatch: file.swatch });
        }
        onSuccess();
      }

      setTimeout(() => {
        clearTimeout();
      }, 2000);

    })
    .catch((e) => {
      logger.error(e);
      onError();
      setTimeout(() => {
        clearTimeout();
      }, 2000);
    });
};
