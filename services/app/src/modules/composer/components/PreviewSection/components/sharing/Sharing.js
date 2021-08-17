import React, { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import ShareIcon from '@material-ui/icons/Share';
import { CopyToClipboard } from "react-copy-to-clipboard";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import IconButton from "@material-ui/core/IconButton";
import { subject } from "@casl/ability";
import { makeStyles } from "@material-ui/styles";
import ToggleButton from "../../../../../../common/components/ToggleButton";
import { setPermissions } from "../../../../../../actions/presentation";
import Abilities from "../../../../../../common/authz/ability/Abilities";
import { useAbility } from "../../../../../../common/authz/ability/useAbility";
import { config } from "../../../../../../config";
import Label from "../../../../../../common/components/controls/Label";

/**
 * Get the URL to copy to clipboard.
 *
 * @returns {string}
 */
export const getSharingLink = (id) => {
  const production = window.location.host === config.app.production.host;
  const { protocol, host } = window.location;
  const resource = production ? "" : "/play"; // If we're using deck.show we don't need the /play resource in there

  return `${protocol}//${production ? "deck.show" : host}${resource}/${id}`;
};

const styles = () => makeStyles((theme) => ({
  label: {
    color: theme.palette.popover.label,
    fontSize: 13
  },
}));

const Sharing = ({ id, presentation, user, permissions, setPermissions }) => {

  const useStyles = useCallback(styles(), []);
  const classes = useStyles();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  });
  const ability = useAbility();
  const canChangeSharing = ability.can(Abilities.Actions.SET_PERMISSIONS, subject(Abilities.Subjects.PRESENTATION, presentation));

  return (
    <div>
      {user.company ? (<ToggleButton color style={{ marginTop: 5 }} checked={permissions.company} label={<Label variant="span" className={classes.label} style={{ fontSize: 14 }}>Anyone at {user.company.name}</Label>} onChange={(checked) => setPermissions({ ...permissions, company: checked })}/>) : null}
      <ToggleButton color style={{ marginTop: 5 }} label={<Label variant="span" className={classes.label} style={{ fontSize: 14 }}>Open to anyone</Label>} checked={permissions.public} disabled={!canChangeSharing} onChange={(checked) => setPermissions({ ...permissions, public: checked })}/>
      <CopyToClipboard text={getSharingLink(id)} onCopy={() => setCopied(true)}>
        <div style={{ marginTop: 8 }}>
          <IconButton variant="outlined" onClick={(e) => e.preventDefault()} style={{ padding: 8, marginRight: 4, color: copied ? "#57FF00" : "#eee" }}>
            {copied ? <CheckCircleIcon fontSize="small"/> : <ShareIcon fontSize="small"/>}
          </IconButton>
          <Label className={classes.label} variant="span" style={{ color: copied ? "#57FF00" : "#ccc" }}>{copied ? "Copied to clipboard" : "Copy the link"}</Label>
        </div>
      </CopyToClipboard>
    </div>
  );
};
const mapDispatchToProps = {
  setPermissions
};

export default connect(null, mapDispatchToProps)(Sharing);
