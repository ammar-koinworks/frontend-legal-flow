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

import { useAlertContext } from '../../contexts/alert';
import { useAuthContext } from '../../contexts/auth-context';
import { opinionStore } from '../../api/opinion';

export const OpinionFormAdd = (props) => {
  const { user } = useAuthContext();
  const alertContext = useAlertContext();

  const formik = useFormik({
    initialValues: {
      requester_name: user.fullname,
      opinion_title: '',
      issue: '',
      usecase: '',
    },
    validationSchema: Yup.object({
      opinion_title: Yup
        .string()
        .max(255)
        .required('Opinion title is required'),
      issue: Yup
        .string()
        .max(255)
        .required('Issue is required'),
      usecase: Yup
        .string()
        .max(255)
        .required('Usecase is required'),
    }),
    onSubmit: async (data) => {
      try {
        const res = await opinionStore(data);

        if (res.success) {
          alertContext.setAlert("success", res.message);
          Router.push('/opinions');
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
                error={Boolean(formik.touched.opinion_title && formik.errors.opinion_title)}
                fullWidth
                helperText={formik.touched.opinion_title && formik.errors.opinion_title}
                label="Opinion Title"
                margin="normal"
                name="opinion_title"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.opinion_title}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                error={Boolean(formik.touched.usecase && formik.errors.usecase)}
                fullWidth
                helperText={formik.touched.usecase && formik.errors.usecase}
                label="Usecase"
                margin="normal"
                name="usecase"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.usecase}
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
                error={Boolean(formik.touched.issue && formik.errors.issue)}
                fullWidth
                helperText={formik.touched.issue && formik.errors.issue}
                label="Issue"
                margin="normal"
                name="issue"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.issue}
                variant="outlined"
                multiline
                maxRows={5}
              />
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
