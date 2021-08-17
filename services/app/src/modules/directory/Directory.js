import React, { useCallback, useEffect, useState } from 'react';
import ApplicationBar from 'common/components/ApplicationBar';
import { connect } from 'react-redux';

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import { Link, Route, Switch, useHistory, useRouteMatch } from "react-router-dom";

import * as ErrorUtils from 'common/util/ErrorUtils';
import Button from '@material-ui/core/Button';
import InfoPanel from "./components/InfoPanel";

import LoadingStatusIndicator from "../../common/components/ApplicationBar/components/LoadingStatusIndicator";
import { useDeleteDeck, useUserDecks } from "../../common/api/sdk/hooks/DeckHooks";
import DirectoryViewStyling from "../../common/components/DirectoryViewStyling";
import DeckList from "./components/DeckList";
import ReferenceDecks from "../reference/decks/ReferenceDecks";
import { ROUTE_EDIT_DOCS, ROUTE_NEW_DECK, ROUTE_PLAY_DOCS } from "../../Routes";
import SwipeableStack from "../../common/components/help/SwipeableStack";
import EditorCommandsContent from "../../common/components/help/content/EditorCommandsContent";
import ImageCommandsContent from "../../common/components/help/content/ImageCommandsContent";
import RemixContent from "../../common/components/help/content/RemixContent";
import PaletteContent from "../../common/components/help/content/PaletteContent";
import ThemeContent from "../../common/components/help/content/ThemeContent";
import SlashCommandsContent from "../../common/components/help/content/SlashCommandsContent";
import CueCardWide from "../../common/components/help/CueCardWide";
import { useCompanyDecks } from "../../common/api/sdk/hooks/CompanyHooks";
import HelpdeskContent from "../../common/components/help/content/HelpdeskContent";
import LoadingStateComponent from "../composer/components/LoadingStateComponent";
import { BlankSlateCard } from "./components/BlankSlateCard";
import { config } from "../../config";

/**
 * Directory view for an organisation.
 *
 * @param props
 * @returns {boolean}
 * @constructor
 */
const Directory = ({ user }) => {

  const history = useHistory();

  const [decks, refetch, error, pageNumber, setPageNumber] = useUserDecks();
  const [companyDecks] = useCompanyDecks(user);
  const [deleteDeckById, deleteStatus] = useDeleteDeck();
  const referenceDecks = ReferenceDecks.instance().decks();

  if (error) {
    ErrorUtils.redirectOnError(error);
  }

  useEffect(() => {
    if (user) {
      refetch();
    }
    if (deleteStatus) refetch();
  }, [user, deleteStatus]);
  
  const newDeck = () => {
    history.push({ pathname: ROUTE_NEW_DECK, state: { permissions: { company: false, public: false } } });
  };

  const deleteDeck = (id) => {
    deleteDeckById(id);
    refetch();
  };

  const [showInfoPanel, setShowInfoPanel] = useState(false);
  const [infoPanelDeckId, setInfoPanelDeckId] = useState();
  
  const toggleInfoPanel = (show, id) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    if (show) {
      setInfoPanelDeckId(id);
    }
    setShowInfoPanel(show);
  };
  const useStyles = useCallback(DirectoryViewStyling(), []);
  const classes = useStyles();

  const getInfoPanel = () => (
    <InfoPanel deckId={infoPanelDeckId} deleteDeck={deleteDeck} toggleInfoPanel={toggleInfoPanel}
      infoPanel={showInfoPanel} setShowInfoPanel={setShowInfoPanel} />
  );

  const { path } = useRouteMatch();

  const openReferenceDeck = (deck) => () => {
    window.location = `${ROUTE_EDIT_DOCS}/${deck._id}`;
  };

  const LinkTab = (props) => (
    <Tab
      component={Link}
      {...props}
      to={props.value}
      classes={{
        root: classes.tab,
        selected: classes.tabSelected,
        wrapper: classes.tabLabel
      }}
    />
  );

  if (!decks) {
    return <LoadingStateComponent message="Fetching your decks..." />;
  }

  const noDecks = decks.length === 0 && (companyDecks && companyDecks.length === 0);
  const yourDeckListing = () => {
    if (noDecks) {
      return <BlankSlateCard classes={classes} />;
    }
    return (
      <React.Fragment>
        <DeckList title="Your Decks" decks={decks} createIcon toggleInfoPanel={toggleInfoPanel} loadMore setPageNumber={setPageNumber} pageNumber={pageNumber}/>
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      <div className={classes.root}>
        <ApplicationBar user={user}>
          <div className={classes.toolbarMenu}>
            <div className={classes.loadstatus}>
              <LoadingStatusIndicator/>
            </div>
          </div>
        </ApplicationBar>

        {/* Sub Navigation */}
        <div className={classes.line}> </div>
        <div className={classes.subnav}>
          <div className={classes.subnavInner}>
            <Tabs variant="scrollable" scrollButtons="on" indicatorColor="primary" value={path} classes={{ root: classes.tabs, scrollButtons: classes.tabsScrollButtons, indicator: classes.tabIndicator }}>
              <LinkTab label="Dashboard" value={config.app.paths.home}/>
              <LinkTab label="Your Decks" value={`${config.app.paths.home}/me`}/>
              {user.company ? (
                <LinkTab label={user.company.name} value={`${config.app.paths.home}/company`}/>
              ) : null}
              <LinkTab label="Hints &amp; Tips" value={`${config.app.paths.home}/docs`}/>
            </Tabs>
            <Button
              className={classes.cta}
              onClick={newDeck}
              variant="contained"
              color="primary"
              size="medium"
            >
              <span>New</span><span className="full" style={{ marginLeft: 5 }}> Deck</span>
            </Button>

          </div>
        </div>

        {/* Decks Section */}
        <div className={classes.main} style={{ paddingTop: 52 }}>
          <Switch>

            {/* == Tab: Dashboard == */}
            <Route exact path={config.app.paths.home}>
              { yourDeckListing() }
              { user.company ? <DeckList company title={`Shared with ${user.company.name}`} decks={companyDecks.filter((deck) => deck.owner._id !== user._id)} createIcon toggleInfoPanel={toggleInfoPanel}/> : null }
              { referenceDecks ? (
                <>
                  <DeckList
                    title="Hints &amp; Tips"
                    decks={referenceDecks}
                    onClickToPlay={(id) => `${ROUTE_PLAY_DOCS}/${id}`}
                    onClickToOpen={openReferenceDeck}
                    grid={{ xs: 12, sm: 6, md: 6, lg: 4 }}>
                    <CueCardWide>
                      <SwipeableStack content={[<SlashCommandsContent/>, <EditorCommandsContent/>, <ImageCommandsContent/>, <RemixContent/>, <PaletteContent/>, <ThemeContent/>, <HelpdeskContent/>]}/>
                    </CueCardWide>
                  </DeckList>
                
                </>
              ) : null }
            </Route>

            {/* == Tab: Your Decks == */}
            <Route path={`${config.app.paths.home}/me`}>
              <DeckList title="Your Decks" decks={decks} createIcon toggleInfoPanel={toggleInfoPanel} loadMore setPageNumber={setPageNumber} pageNumber={pageNumber} />
            </Route>

            {/* == Tab: Company Decks == */}
            <Route path={`${config.app.paths.home}/company`}>
              { user.company ? <DeckList company title={user.company.name} decks={companyDecks} createIcon toggleInfoPanel={toggleInfoPanel}/> : null }
            </Route>

            {/* == Tab: Help Decks == */}
            <Route path={`${config.app.paths.home}/docs`}>
              { referenceDecks ? (
                <DeckList title="Hints &amp; Tips" decks={referenceDecks} onClickToPlay={(id) => `${ROUTE_PLAY_DOCS}/${id}`} onClickToOpen={openReferenceDeck} grid={{ xs: 12, sm: 6, md: 6, lg: 4 }}>
                  <CueCardWide>
                    <SwipeableStack content={[<SlashCommandsContent/>, <EditorCommandsContent/>, <ImageCommandsContent/>, <RemixContent/>, <PaletteContent/>, <ThemeContent/>, <HelpdeskContent/>]}/>
                  </CueCardWide>
                </DeckList>
              ) : null }
            </Route>

          </Switch>
        </div>

      </div>
      {infoPanelDeckId ? getInfoPanel() : null}
    </React.Fragment>
  );
};

function mapStateToProps(state) {
  return { user: state.user };
}

export default connect(mapStateToProps)(Directory);
