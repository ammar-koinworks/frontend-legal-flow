import {
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  TextField,
  CircularProgress,
  Autocomplete,
  Box
} from '@mui/material';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import Router, { useRouter } from 'next/router';

import SelectAsync from '../select-async';
import ListAsync from  '../list-async'

import { getDatas, getDatasUser } from '../../api/masterData';
import { useAlertContext } from '../../contexts/alert';
import { useGetDetail } from '../../hooks/detail';
import { useState, useEffect } from 'react';
import { RequestDetailButton } from './request-detail-button';
import { request, requestUpdate } from '../../api/request';
import { useFile } from '../../hooks/file';
import FileDropzone from '../file-dropzone';

export const RequestDetailApproval = (props) => {
  const { action } = props;
  const { query: { id } } = useRouter();
  const { detail } = useGetDetail(() => request(id));
  const file = useFile('agreement', detail.agreement_upload);
  const alertContext = useAlertContext();
  const [isEdit, setIsEdit] = useState(false);
  
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      requester_name: detail.requester_name || '',
      agreement_title: detail.agreement_title || '',
      commercial_terms: detail.commercial_terms || '',
      description: detail.description || '',
      agreement_category_id: detail.agreement_category_id || null,
      add_related_pic_id: null,
      company_id: detail.company_id || null,
      file_id: detail.file_id || null,
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
      add_related_pic_id: Yup
        .number().typeError('PIC is Required')
        .required('PIC is required'),
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
        const newData = {
          requester_name: data.requester_name,
          agreement_title: data.agreement_title,
          commercial_terms: data.commercial_terms,
          description: data.description,
          related_pic_id: data.add_related_pic_id,
          company_id: data.company_id
        }
        
        const res = await requestUpdate(id, newData);

        if (res.success) {
          localStorage.removeItem('agreement');
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
                disabled={true}
                error={Boolean(formik.touched.requester_name && formik.errors.requester_name)}
                fullWidth
                helperText={formik.touched.requester_name && formik.errors.requester_name}
                label="Requesters Name"
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
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "black",
                  },
                }}
                multiline
                maxRows={5}
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
              mt={2}
            >
              <FileDropzone file={file} isEdit={isEdit} />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <ListAsync 
                name="PIC"
                data={() => getDatasUser('related-pic', { search: '' })}
                defaultValue={detail.related_pics}
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <SelectAsync
                disabled={true}
                name='Category'
                formName={'agreement_category_id'}
                formik={formik}
                data={(search) => getDatas('agreement-category', { search })}
                defaultValue={detail.agreement_category}
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
                disabled={!isEdit}
                name='Company'
                formik={formik}
                data={(search) => getDatas('company', { search })}
                defaultValue={detail.company}
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
            <RequestDetailButton edit={{ isEdit, setIsEdit }} action={action} detail={detail} />
          </Grid>
        </Grid>
      </Card>
    </form>
  );
};
