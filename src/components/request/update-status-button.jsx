import { InsertLink } from '@mui/icons-material';
import { Box, Button, IconButton, Modal, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik';
import { useState } from 'react';
import { documentFinish } from '../../api/document';
import { useAlertContext } from '../../contexts/alert';
import * as Yup from 'yup';

export default function UpdateStatusButton({ id, icon = false, setFinish = () => { } }) {
  const alertContext = useAlertContext();
  const [open, setOpen] = useState(false);

  const formik = useFormik({
    initialValues: {
      document_link: '',
    },
    validationSchema: Yup.object({
      document_link: Yup
        .string()
        .max(255)
        .url('Document Link must be valid URL')
        .required('Document Link is required')
    }),
    onSubmit: async (data) => {
      try {
        const res = await documentFinish(id, data);

        if (res.success) {
          setFinish(Math.random());
          setOpen(false);
          alertContext.setAlert("success", res.message);
        } else {
          alertContext.setAlert("error", res.message);
        }
      } catch (err) {
        alertContext.setAlert("error", err.message);
      }
    }
  });

  return (
    <>
      {icon
        ? <IconButton
          color="warning"
          onClick={() => setOpen(true)}
          title="finish"
        >
          <InsertLink />
        </IconButton>
        : <Button
          color="primary"
          variant='contained'
          onClick={() => setOpen(true)}
          title='finish'
        >
          Finish
        </Button>
      }
      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Insert document link
          </Typography>
          <TextField
            error={Boolean(formik.touched.document_link && formik.errors.document_link)}
            fullWidth
            helperText={formik.touched.document_link && formik.errors.document_link}
            label="Document Link"
            margin="normal"
            name="document_link"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.document_link}
            variant="outlined"
            sx={{ marginY: '2rem' }}
          />
          <Box style={{ textAlign: 'right' }}>
            <Button
              color="primary"
              variant="contained"
              onClick={formik.submitForm}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  )
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};