import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  TextField
} from '@mui/material';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import Router from 'next/router';

import SelectAsync from '../select-async';

import { getDatas } from '../../api/masterData';
import { useAlertContext } from '../../contexts/alert';
import { useAuthContext } from '../../contexts/auth-context';
import { documentStore } from '../../api/document';

export const DocumentFormAdd = (props) => {
  const { user } = useAuthContext();
  const alertContext = useAlertContext();

  const formik = useFormik({
    initialValues: {
      requester_name: user?.fullname,
      document_title: '',
      description: '',
      company_id: null,
    },
    validationSchema: Yup.object({
      requester_name: Yup
        .string()
        .max(255)
        .required('Requester name is required'),
      document_title: Yup
        .string()
        .max(255)
        .required('Document title is required'),
      description: Yup
        .string()
        .max(255)
        .required('description is required'),
      company_id: Yup
        .number().typeError('Company is Required')
        .required('Company is required'),
    }),
    onSubmit: async (data) => {
      try {
        const res = await documentStore(data);

        if (res.success) {
          alertContext.setAlert("success", res.message);
          Router.push('/documents');
        } else {
          alertContext.setAlert("error", res.message);
        }
      } catch (err) {
        alertContext.setAlert("error", err.message);
      }
    }
  });

  return (
    <form
      autoComplete="off"
      noValidate
      {...props}
    >
      <Card>
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                error={Boolean(formik.touched.document_title && formik.errors.document_title)}
                fullWidth
                helperText={formik.touched.document_title && formik.errors.document_title}
                label="Document Title"
                margin="normal"
                name="document_title"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.document_title}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                error={Boolean(formik.touched.description && formik.errors.description)}
                fullWidth
                helperText={formik.touched.description && formik.errors.description}
                label="Description"
                margin="normal"
                name="description"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.description}
                variant="outlined"
                multiline
                maxRows={5}
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <SelectAsync name='Company' formik={formik} data={(search) => getDatas('company', { search })} />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          <Button
            color="primary"
            variant="contained"
            onClick={formik.submitForm}
          >
            Submit
          </Button>
        </Box>
      </Card>
    </form>
  );
};
