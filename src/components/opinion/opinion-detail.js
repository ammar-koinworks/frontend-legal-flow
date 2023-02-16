import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  TextField,
  CircularProgress
} from '@mui/material';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import Router, { useRouter } from 'next/router';

import { useAlertContext } from '../../contexts/alert';
import { opinion, opinionUpdate } from '../../api/opinion';
import { useState } from 'react';
import { useGetDetail } from '../../hooks/detail';
import { OpinionDetailButton } from './opinion-detail-button';
import { useAuthContext } from '../../contexts/auth-context';

export const OpinionDetail = (props) => {
  // const { roleAccess } = useAuthContext();
  // const finish = roleAccess?.document?.finish;
  const { query: { id } } = useRouter();
  const { detail } = useGetDetail(() => opinion(id));
  const alertContext = useAlertContext();
  const [isEdit, setIsEdit] = useState(false);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      requester_name: detail.requester_name || '',
      opinion_title: detail.opinion_title || '',
      issue: detail.issue || '',
      usecase: detail.usecase || null,
    },
    validationSchema: Yup.object({
      requester_name: Yup
        .string()
        .max(255)
        .required('Requester name is required'),
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
        const res = await opinionUpdate(id, data);

        if (res.success) {
          alertContext.setAlert("success", res.message);
          setIsEdit(false);
        } else {
          alertContext.setAlert("error", res.message);
        }
      } catch (err) {
        alertContext.setAlert("error", err.message);
      }
    }
  });

  if (detail.id === null) {
    return (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    )
  }

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
                disabled="true"
                error={Boolean(formik.touched.requester_name && formik.errors.requester_name)}
                fullWidth
                helperText={formik.touched.requester_name && formik.errors.requester_name}
                label="Requester Name"
                margin="normal"
                name="requester_name"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.requester_name}
                variant="outlined"
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "black",
                  },
                }}
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                disabled={true}
                fullWidth
                label="Status"
                margin="normal"
                name="status"
                value={detail?.request_status?.name}
                variant="outlined"
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "black",
                  },
                }}
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                disabled={!isEdit}
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
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "black",
                  },
                }}
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                disabled={!isEdit}
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
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "black",
                  },
                }}
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                disabled={!isEdit}
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
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "black",
                  },
                }}
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Grid
          container
          spacing={3}
          p={2}
        >
          <Grid item xs={6}>
            <Button
              variant='contained'
              onClick={Router.back}
              color='inherit'
            >
              Back
            </Button>
          </Grid>
          <Grid item xs={6} textAlign='right'>
            <OpinionDetailButton edit={{ isEdit, setIsEdit }} formik={formik} />
          </Grid>
        </Grid>
      </Card>
    </form>
  );
};
