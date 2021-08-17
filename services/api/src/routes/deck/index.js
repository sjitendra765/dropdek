import deck from './decks.js';
import play from './play.js';
import inspiration from './inspiration.js';

export default (router) => {
  deck(router);
  play(router);
  inspiration(router);
};
