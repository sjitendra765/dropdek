import tutorialDeck from './tutorial/deck.json';

export default class ReferenceDecks {

  constructor() {
    ReferenceDecks.__singleton = this;
    this.deckMap = {
      tutorial: readOnly(tutorialDeck),
    };
  }

  decks = () => Object.values(this.deckMap);

  get = (id) => this.deckMap[id];

  static instance() {
    return ReferenceDecks.__singleton === undefined ? new ReferenceDecks() : ReferenceDecks.__singleton;
  }
}

const readOnly = (deck) => {
  deck.readOnly = true;
  return deck;
};
