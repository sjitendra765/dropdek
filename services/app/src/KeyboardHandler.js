import React from "react";
import { useHistory } from "react-router-dom";
import { HotKeys } from "react-hotkeys";
import KeyboardShortcuts from "./common/components/KeyboardShortcuts";
import { ROUTE_MEDIA, ROUTE_NEW_DECK, ROUTE_ROOT } from "./Routes";
import { goBackOrReload } from "./modules/presenter/queries/goBackOrReload";

const KeyboardHandler = ({ children, noFocus, keyMap, reload }) => {

  const [open, setOpen] = React.useState(false);

  const history = useHistory();

  const focus = (c) => {
    if (!noFocus && c && !c.contains(document.activeElement)) {
      c.focus();
    }
  };

  const defaultKeyMap = {
    GO_HOME: "cmd+shift+h",
    CREATE_DECK: ["cmd+shift+n", "ctrl+shift+n"],
    SHOW_KEYBOARD_SHORTCUTS: "shift+?",
    GO_MEDIA: "cmd+shift+m"
  };

  const handlers = {
    SHOW_KEYBOARD_SHORTCUTS: (e) => {
      e.preventDefault();
      setOpen(true);
    },
    CREATE_DECK: (e) => {
      e.preventDefault();
      history.push(ROUTE_NEW_DECK);
    },
    GO_HOME: (e) => {
      e.preventDefault();
      history.push(ROUTE_ROOT);
    },
    GO_MEDIA: (e) => {
      e.preventDefault();
      history.push(ROUTE_MEDIA);
    },
    ESCAPE: goBackOrReload(reload, history),
  };

  return (
    <HotKeys keyMap={keyMap || defaultKeyMap} handlers={handlers} innerRef={focus}>
      {children}
      <KeyboardShortcuts open={open} setOpen={setOpen}/>
    </HotKeys>
  );
};
export default KeyboardHandler;
