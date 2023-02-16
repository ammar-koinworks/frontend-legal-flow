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
import Router, { useRouter } from 'next/router';

import SelectAsync from '../select-async';

import { getDatas } from '../../api/masterData';
import { useAlertContext } from '../../contexts/alert';
import { document, documentUpdate } from '../../api/document';
import { useState } from 'react';
import { useGetDetail } from '../../hooks/detail';
import { EditButton } from './edit-button';
import { useAuthContext } from '../../contexts/auth-context';
import FinishButton from './finish-button';

export const DocumentDetail = (props) => {
  const { roleAccess } = useAuthContext();
  const { query: { id, action } } = useRouter();
  const [finish, setFinish] = useState(0);
  const { detail } = useGetDetail(() => document(id), [finish]);
  const alertContext = useAlertContext();
  const [isEdit, setIsEdit] = useState(false);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      requester_name: detail.requester_name || '',
      document_title: detail.document_title || '',
      description: detail.Description || '',
      company_id: detail.company_id || null,
      document_link: detail.document_link || '',
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
        const res = await documentUpdate(id, data);

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

  if (detail.id === null) return <>Loading</>

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
                disabled={true}
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
                disabled={!isEdit}
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
              <SelectAsync
                name='Company'
                formik={formik}
                data={(search) => getDatas('company', { search })}
                disabled={!isEdit}
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "black",
                  },
                }}
                defaultValue={detail.company}
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                disabled={true}
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
            {action !== 'finish' && roleAccess?.document?.update && <EditButton edit={{ isEdit, setIsEdit }} formik={formik} />}
            {action === 'finish' && roleAccess?.document?.finish && detail.document_link === null && <FinishButton id={id} setFinish={setFinish} />}
          </Grid>
        </Grid>
      </Card>
    </form>
  );
};
