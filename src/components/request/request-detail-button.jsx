import React from 'react'
import { Button } from '@mui/material';
import { useAlertContext } from '../../contexts/alert';
import Router, { useRouter } from 'next/router';
import { useAuthContext } from '../../contexts/auth-context';
import { requestDelete } from '../../api/request';

export const RequestDetailButton = ({ edit: { isEdit, setIsEdit }, formik }) => {
  const alertContext = useAlertContext();
  const { query: { id } } = useRouter();
  const { roleAccess: { request } } = useAuthContext();

  const deleteHandler = async () => {
    try {
      const res = await requestDelete(id);

      if (res.success) {
        Router.push('/requests');
        alertContext.setAlert("success", res.message);
      } else {
        alertContext.setAlert("error", res.message);
      }

    } catch (err) {
      alertContext.setAlert("error", err.message);
    }
  };

  return (
    <>
      {isEdit ?
        <>
          <Button
            sx={{
              marginRight: '1rem',
            }}
            color="inherit"
            variant="contained"
            onClick={() => { setIsEdit(false); formik.setErrors({}) }}
          >
            Cancel
          </Button>
          {request.update &&
            <Button
              sx={{
                marginRight: '1rem',
              }}
              color="primary"
              variant="contained"
              onClick={formik.submitForm}
            >
              Update
            </Button>
          }
        </>
        :
        <>
          {request.update &&
            <Button
              sx={{
                marginRight: '1rem',
              }}
              color="primary"
              variant="contained"
              onClick={() => setIsEdit(true)}
            >
              Edit
            </Button>
          }
          {request.delete &&
            <Button
              color="error"
              variant="contained"
              onClick={deleteHandler}
            >
              Delete
            </Button>
          }
        </>
      }
    </>
  )
}
