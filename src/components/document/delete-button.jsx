import React from 'react'
import { Button } from '@mui/material';
import { useAlertContext } from '../../contexts/alert';
import Router, { useRouter } from 'next/router';
import { documentDelete } from '../../api/document'

export const DeleteButton = () => {
  const alertContext = useAlertContext();
  const { query: { id } } = useRouter();

  const deleteHandler = async () => {
    try {
      const res = await documentDelete(id);

      if (res.success) {
        Router.push('/documents');
        alertContext.setAlert("success", res.message);
      } else {
        alertContext.setAlert("error", res.message);
      }

    } catch (err) {
      alertContext.setAlert("error", err.message);
    }
  };

  return (
    <Button
      sx={{
        width: '6rem',
        marginLeft: '1rem',
      }}
      color="error"
      variant="contained"
      onClick={deleteHandler}
    >
      Delete
    </Button>

  )
}
