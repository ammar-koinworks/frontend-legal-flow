import React from 'react'
import { Button } from '@mui/material';
import { documentFinish } from '../../api/document';
import { useAlertContext } from '../../contexts/alert';
import { useRouter } from 'next/router';
import { useAuthContext } from '../../contexts/auth-context';

export const OpinionDetailButton = ({ edit: { isEdit, setIsEdit }, formik }) => {
  const alertContext = useAlertContext();
  const { query: { id } } = useRouter();
  const { roleAccess: { opinion } } = useAuthContext();

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
          {opinion.update &&
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
          {opinion.update &&
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
        </>
      }
    </>
  )
}
