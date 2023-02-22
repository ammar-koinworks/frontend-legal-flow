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
import SelectAsyncMultiple from '../select-async-multiple';
import ListAsync from '../list-async'
import HorizontalLinearStepper from './request-status';

import { getDatas, getDatasUser } from '../../api/masterData';
import { useAlertContext } from '../../contexts/alert';
import { useGetDetail } from '../../hooks/detail';
import { useState, useEffect } from 'react';
import { RequestDetailButton } from './request-detail-button';
import UpdateStatusButton from './update-status-button';
import { request, requestUpdate } from '../../api/request';
import { useFile } from '../../hooks/file';
import FileDropzone from '../file-dropzone';

export const RequestDetailAdmin = (props) => {
  const { action } = props;
  const { query: { id } } = useRouter();
  const { detail } = useGetDetail(() => request(id));
  const file = useFile('agreement', detail.agreement_upload);
  const alertContext = useAlertContext();
  const [isEdit, setIsEdit] = useState(false);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      agreement_category_id: detail.agreement_category_id || null,
      add_related_pic_id: null,
      file_id: detail.file_id || null,
      asignee_id: detail.asignee_id || null,
      comments: detail.comments || null,
    },
    validationSchema: Yup.object({
      agreement_category_id: Yup
        .number().typeError('Category is Required')
        .required('Category is required'),
      asignee_id: Yup
        .number().typeError('Assign is Required')
        .required('Assign is required'),
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
          agreement_category_id: data.agreement_category_id,
          related_pic_id: data.add_related_pic_id,
          asignee_id: data.asignee_id,
          comments: data.comments
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
              md={12}
              xs={12}
            >
              <HorizontalLinearStepper
                id={detail.id}
                status={detail.request_status}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
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
                fullWidth
                label="Requesters Name"
                margin="normal"
                name="requester_name"
                value={detail?.requester_name}
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
                label="Agreement Title"
                margin="normal"
                name="agreement_title"
                value={detail?.agreement_title}
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
                label="Commercial Terms"
                margin="normal"
                name="commercial_terms"
                value={detail?.commercial_terms}
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
                label="Description"
                margin="normal"
                name="description"
                value={detail?.description}
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
              <SelectAsyncMultiple
                disabled={!isEdit}
                name='Add PIC'
                formName={'add_related_pic_id'}
                formik={formik}
                data={(search) => getDatasUser('related-pic', { search })}
                user={true}
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
                name='Assign to'
                formName={'asignee_id'}
                formik={formik}
                data={(search) => getDatasUser('asignees', { search })}
                defaultValue={detail.asignee}
                user={true}
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
                disabled={!isEdit}
                error={Boolean(formik.touched.comments && formik.errors.comments)}
                fullWidth
                helperText={formik.touched.comments && formik.errors.comments}
                label="Comments"
                margin="normal"
                name="comments"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.comments}
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
            <RequestDetailButton edit={{ isEdit, setIsEdit }} formik={formik} />
          </Grid>
        </Grid>
      </Card>
    </form>
  );
};
