import React from 'react'
import { Button } from '@mui/material';
import { opinionFinish, opinionDelete } from '../../api/opinion';
import { useAlertContext } from '../../contexts/alert';
import Router, { useRouter } from 'next/router';
import { useAuthContext } from '../../contexts/auth-context';

export const OpinionDetailButton = ({ edit: { isEdit, setIsEdit }, formik }) => {
  const alertContext = useAlertContext();
  const { query: { id, action } } = useRouter();
  const { roleAccess } = useAuthContext();

  const finishHandler = async () => {
    try {
      const res = await opinionFinish(id);

      if (res.success) {
        Router.push('/opinions/approval');
        alertContext.setAlert("success", res.message);
      } else {
        alertContext.setAlert("error", res.message);
      }

    } catch (err) {
      alertContext.setAlert("error", err.message);
    }
  };

  const deleteHandler = async () => {
    try {
      const res = await opinionDelete(id);

      if (res.success) {
        Router.push('/opinions');
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
          {roleAccess?.opinion?.finish &&
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
          {action !== 'finish' &&
            <>
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
              <Button
                sx={{
                  marginRight: '1rem',
                }}
                color="error"
                variant="contained"
                onClick={deleteHandler}
              >
                Delete
              </Button>
            </>
          }
          {action === 'finish' &&
            <Button
              sx={{
                marginRight: '1rem',
              }}
              color="primary"
              variant="contained"
              onClick={finishHandler}
            >
              Finish
            </Button>
          }
        </>
      }
    </>
  )
}
