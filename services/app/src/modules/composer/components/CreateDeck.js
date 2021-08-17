import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { LoadingState } from "../../../common/api/Constants";
import LoadingStateComponent from "./LoadingStateComponent";
import { newDeckState } from "./DeckEditor/transforms/newDeckState";
import { useCreateDeck } from "../../../common/api/sdk/hooks/DeckHooks";
import { ROUTE_EDIT_DECK } from "../../../Routes";
import { ThemeFactory } from "../../../common/theme/ThemeFactory";

/**
 * Interstitial to create a deck.
 *
 * @returns {*}
 * @constructor
 */
const CreateDeck = ({ location, user }) => {

  const [status, setStatus] = useState(LoadingState.NONE);
  const [createDeck, { deck, error }] = useCreateDeck();

  if (error && status === LoadingState.ERROR) {
    setStatus(LoadingState.ERROR);
  }
  if (deck && status !== LoadingState.DONE) {
    setStatus(LoadingState.DONE);
    window.location.replace(`${ROUTE_EDIT_DECK}/${deck._id}`);
  }

  useEffect(() => {
    if (status === LoadingState.NONE) {
      setStatus(LoadingState.UPDATING);
      const newDeck = {
        theme: ThemeFactory.DEFAULT_THEME_NAME,
        content: newDeckState(),
      };
      createDeck(newDeck);
    }
  });

  return (<LoadingStateComponent status={status}/>);
};

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps)(CreateDeck);
