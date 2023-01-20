import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField
} from '@mui/material';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import SelectAsync from '../select-async';

import { updateProfile } from '../../api/auth';
import { getDatas } from '../../api/masterData';
import { useAlertContext } from '../../contexts/alert';
import { useAuthContext } from '../../contexts/auth-context';

export const AccountProfileDetails = (props) => {
  const { user } = useAuthContext();
  const alertContext = useAlertContext();

  const formik = useFormik({
    initialValues: {
      email: user.email,
      firstName: user.firstname,
      lastName: user.lastname,
      userName: user.username,
      position: user.position_id,
      department: user.department_id,
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email('Must be a valid email')
        .max(255)
        .required('Email is required'),
      firstName: Yup
        .string()
        .max(255)
        .required('First name is required'),
      lastName: Yup
        .string()
        .max(255)
        .required('Last name is required'),
      userName: Yup
        .string()
        .max(255)
        .required('User name is required'),
      position: Yup
        .number().typeError('Position is Required')
        .required('Position is required'),
      department: Yup
        .number().typeError('Department is Required')
        .required('Department is required'),
    }),
    onSubmit: async (data) => {
      try {
        const res = await updateProfile(user.id, {
          email: data.email,
          firstname: data.firstName,
          lastname: data.lastName,
          username: data.userName,
          position_id: data.position,
          department_id: data.department,
        });

        if (res.success) {
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
    <form
      autoComplete="off"
      noValidate
      {...props}
    >
      <Card>
        <CardHeader
          subheader="The information can be edited"
          title="Profile"
        />
        <Divider />
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
                error={Boolean(formik.touched.firstName && formik.errors.firstName)}
                fullWidth
                helperText={formik.touched.firstName && formik.errors.firstName}
                label="First Name"
                margin="normal"
                name="firstName"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.firstName}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                error={Boolean(formik.touched.lastName && formik.errors.lastName)}
                fullWidth
                helperText={formik.touched.lastName && formik.errors.lastName}
                label="Last Name"
                margin="normal"
                name="lastName"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.lastName}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                error={Boolean(formik.touched.email && formik.errors.email)}
                fullWidth
                helperText={formik.touched.email && formik.errors.email}
                label="Email"
                margin="normal"
                name="email"
                type="email"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.email}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                error={Boolean(formik.touched.userName && formik.errors.userName)}
                fullWidth
                helperText={formik.touched.userName && formik.errors.userName}
                label="User Name"
                margin="normal"
                name="userName"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.userName}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <SelectAsync name='Position' formik={formik} data={(search) => getDatas('position', { for_member: true, search })} defaultValue={user.position} />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <SelectAsync name='Department' formik={formik} data={(search) => getDatas('department', { for_member: true, search })} defaultValue={user.department} />
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
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
};
