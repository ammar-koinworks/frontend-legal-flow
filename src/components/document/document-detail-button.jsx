import React from 'react'
import { Button } from '@mui/material';
import { documentDelete, documentFinish } from '../../api/document';
import { useAlertContext } from '../../contexts/alert';
import Router, { useRouter } from 'next/router';
import { useAuthContext } from '../../contexts/auth-context';

export const DocumentDetailButton = ({ edit: { isEdit, setIsEdit }, formik }) => {
  const alertContext = useAlertContext();
  const { query: { id } } = useRouter();
  const { roleAccess: { document } } = useAuthContext();

  const finishHandler = async () => {
    try {
      const document_link = formik.getFieldProps('document_link')?.value;
      if (!document_link) {
        alertContext.setAlert("error", "Document link is required");
        return;
      }

      const res = await documentFinish(id, { document_link });

      if (res.success) {
        setIsEdit(false);
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
          {document.update &&
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
          {document.finish &&
            <Button
              color="secondary"
              variant="contained"
              onClick={finishHandler}
            >
              Finish
            </Button>
          }
        </>
        :
        <>
          {document.update &&
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
          {document.delete &&
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
