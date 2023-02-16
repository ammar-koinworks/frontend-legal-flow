import React from 'react'
import { Button } from '@mui/material';

export const EditButton = ({ edit: { isEdit, setIsEdit }, formik }) => {
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
          <Button
            sx={{
              width: '6rem',
            }}
            color="primary"
            variant="contained"
            onClick={formik.submitForm}
          >
            Update
          </Button>
        </>
        :
        <Button
          color="primary"
          variant="contained"
          onClick={() => setIsEdit(true)}
          sx={{ width: '6rem' }}
        >
          Edit
        </Button>
      }
    </>
  )
}
