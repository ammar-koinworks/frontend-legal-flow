import React from 'react'
import { Button } from '@mui/material';
import { useAlertContext } from '../../contexts/alert';
import Router, { useRouter } from 'next/router';
import { useAuthContext } from '../../contexts/auth-context';
import { requestUpdate, requestApprovePIC } from '../../api/request';

export const RequestDetailButton = ({ edit: { isEdit, setIsEdit }, formik, action = '', detail = {} }) => {
  const alertContext = useAlertContext();
  const { query: { id } } = useRouter();
  const { roleAccess } = useAuthContext();

  const approveHandler = async () => {
    try {
      const res = await requestUpdate(id, { go_to_next_status: true });

      if (res.success) {
        Router.push(`/requests/${action}`);
        alertContext.setAlert("success", res.message);
      } else {
        alertContext.setAlert("error", res.message);
      }

    } catch (err) {
      alertContext.setAlert("error", err.message);
    }
  };

  const rejectHandler = async () => {
    try {
      const res = await requestUpdate(id, { reject_to_review: true });

      if (res.success) {
        Router.push('/requests/manager-approval');
        alertContext.setAlert("success", res.message);
      } else {
        alertContext.setAlert("error", res.message);
      }

    } catch (err) {
      alertContext.setAlert("error", err.message);
    }
  };

  const approveHandlerPIC = async () => {
    try {
      const res = await requestApprovePIC(id, { is_approved: true });

      if (res.success) {
        Router.push(`/requests/${action}`);
        alertContext.setAlert("success", res.message);
      } else {
        alertContext.setAlert("error", res.message);
      }

    } catch (err) {
      alertContext.setAlert("error", err.message);
    }
  };

  const rejectHandlerPIC = async () => {
    try {
      const res = await requestApprovePIC(id, { is_approved: false });

      if (res.success) {
        Router.push('/requests/manager-approval');
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
          {roleAccess?.request?.update &&
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
          {roleAccess?.request?.update && action === '' &&
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
          {((action === 'manager-approval' && detail.request_status_id === 5) || (action === 'clo-approval' && detail.request_status_id === 6) || (action === 'dl-approval' && detail.request_status_id === 7)) &&
            <>
              <Button
                sx={{
                  marginRight: '1rem',
                }}
                color="error"
                variant="contained"
                onClick={rejectHandler}
              >
                Reject
              </Button>
              <Button
                sx={{
                  marginRight: '1rem',
                }}
                color="primary"
                variant="contained"
                onClick={approveHandler}
              >
                Approve
              </Button>
            </>
          }
          {action === 'pic-approval' && detail.request_status_id <= 8 &&
            <>
              <Button
                sx={{
                  marginRight: '1rem',
                }}
                color="error"
                variant="contained"
                onClick={rejectHandlerPIC}
              >
                Reject
              </Button>
              <Button
                sx={{
                  marginRight: '1rem',
                }}
                color="primary"
                variant="contained"
                onClick={approveHandlerPIC}
              >
                Approve
              </Button>
            </>
          }
        </>
      }
    </>
  )
}
