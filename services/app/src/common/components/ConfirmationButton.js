import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

/**
 * A Button that doesn't immediately perform action, but changes state for a confirmation.
 *
 * @param onConfirm
 * @param id
 * @param size
 * @param icon
 * @param label
 * @returns {*}
 * @constructor
 */
const ConfirmationButton = ({ onConfirm, id, size = "small", icon = <DeleteIcon fontSize="small"/> , label = "Delete", style }) => {
  const [confirmation, setConfirmation] = useState(false);

  const confirm = () => {
    onConfirm(id);
    setConfirmation(false);
  };

  if (confirmation) {
    return (
      <div style={{ ...style }}>
        <Button size={size} style={{ marginRight: 12 }} aria-label="cancel" onClick={() => setConfirmation(false)}>
          Cancel
        </Button>
        <Button size={size} style={{ marginLeft: 12 }} aria-label="delete-confirm" color="primary" onClick={confirm}
          variant="outlined">
          {label}
          <DeleteIcon style={{ marginLeft: 8 }} fontSize={size} color="primary"/>
        </Button>
      </div>
    );
  }
  return (
    <div style={{ ...style }}>
      <IconButton size={size} color="primary" aria-label="delete" onClick={() => setConfirmation(true)}>
        {icon}
        {icon ? null : label}
      </IconButton>
    </div>
  );
};
export default ConfirmationButton;
