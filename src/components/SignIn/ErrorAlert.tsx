import React from 'react';

import { Close } from '@mui/icons-material';
import { Alert, Collapse, IconButton } from '@mui/material';

import { IErrorAlert } from '../../types';

function ErrorAlert({ isVisible, handleClose, message }: IErrorAlert) {
  return (
    <Collapse in={isVisible}>
      <Alert
        severity="error"
        action={
          <IconButton aria-label="close" color="inherit" size="small" onClick={handleClose}>
            <Close fontSize="inherit" />
          </IconButton>
        }
        sx={{ mt: 1, mb: 1 }}
      >
        {message}
      </Alert>
    </Collapse>
  );
}

export default ErrorAlert;
