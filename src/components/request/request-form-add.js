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
import SelectAsyncMultiple from '../select-async-multiple';

import { getDatas, getDatasUser } from '../../api/masterData';
import { useAlertContext } from '../../contexts/alert';
import { useAuthContext } from '../../contexts/auth-context';
import { useFile } from '../../hooks/file';
import FileDropzone from '../file-dropzone';
import { requestStore } from '../../api/request';

export const RequestFormAdd = (props) => {
  const { user } = useAuthContext();
  const alertContext = useAlertContext();
  const file = useFile('agreement');

  const formik = useFormik({
    initialValues: {
      requester_name: user.fullname,
      agreement_title: '',
      commercial_terms: '',
      description: '',
      agreement_category_id: null,
      related_pic_id: null,
      company_id: null,
      file_id: null,
    },
    validationSchema: Yup.object({
      requester_name: Yup
        .string()
        .max(255)
        .required('Requester name is required'),
      agreement_title: Yup
        .string()
        .max(255)
        .required('Document title is required'),
      commercial_terms: Yup
        .string()
        .max(255)
        .required('Commercial terms is required'),
      description: Yup
        .string()
        .max(255)
        .required('description is required'),
      agreement_category_id: Yup
        .number().typeError('Category is Required')
        .required('Category is required'),
      company_id: Yup
        .number().typeError('Company is Required')
        .required('Company is required'),
    }),
    onSubmit: async (data) => {
      try {
        const fileValidation = file.validateFile();
        if (!fileValidation) {
          alertContext.setAlert("error", 'File is required');
        } else {
          data.file_id = fileValidation;
        }

        const res = await requestStore(data);

        if (res.success) {
          localStorage.removeItem('agreement');
          alertContext.setAlert("success", res.message);
          Router.push('/requests');
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
                error={Boolean(formik.touched.agreement_title && formik.errors.agreement_title)}
                fullWidth
                helperText={formik.touched.agreement_title && formik.errors.agreement_title}
                label="Agreement Title"
                margin="normal"
                name="agreement_title"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.agreement_title}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                error={Boolean(formik.touched.commercial_terms && formik.errors.commercial_terms)}
                fullWidth
                helperText={formik.touched.commercial_terms && formik.errors.commercial_terms}
                label="Commercial Terms"
                margin="normal"
                name="commercial_terms"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.commercial_terms}
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
              <SelectAsync name='Category' formName={'agreement_category_id'} formik={formik} data={(search) => getDatas('agreement-category', { search })} />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <SelectAsyncMultiple name='PIC' formName={'related_pic_id'} formik={formik} data={(search) => getDatasUser('related-pic', { search })} user={true} />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
              mt={2}
            >
              <FileDropzone file={file} />
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
