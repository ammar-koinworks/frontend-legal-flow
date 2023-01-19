import { Alert, Snackbar } from '@mui/material'
import React from 'react'

import { useAlertContext } from '../contexts/alert'

export default function CustomAlert() {
  const alertContext = useAlertContext();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    alertContext.setAlert(null, "");
  };

  return (
    <>
      {alertContext.alert &&
        <Snackbar open={alertContext.alert != null} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={alertContext.alert} sx={{ width: '100%' }}>
            {alertContext.message}
          </Alert>
        </Snackbar>
      }
    </>
  )
}
