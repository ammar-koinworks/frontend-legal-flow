import { Box, Button, Card, CardContent, CardHeader, Divider, TextField } from '@mui/material';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import { changePassword } from '../../api/auth';
import { useAlertContext } from '../../contexts/alert';

export const SettingsPassword = (props) => {
  const alertContext = useAlertContext();

  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      newPasswordConfirmation: '',
    },
    validationSchema: Yup.object({
      oldPassword: Yup
        .string()
        .max(255)
        .required('Old Password is required'),
      newPassword: Yup
        .string()
        .max(255)
        .required('New Password is required'),
      newPasswordConfirmation: Yup
        .string()
        .max(255)
        .required('New Password Confirmation is required'),
    }),
    onSubmit: async (data) => {
      try {
        const res = await changePassword({
          old_password: data.oldPassword,
          new_password: data.newPassword,
          new_password_confirmation: data.newPasswordConfirmation,
        });

        if (res.success) {
          formik.resetForm();
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
    <form {...props}>
      <Card>
        <CardHeader
          subheader="Update password"
          title="Password"
        />
        <Divider />
        <CardContent>
          <TextField
            error={Boolean(formik.touched.oldPassword && formik.errors.oldPassword)}
            fullWidth
            helperText={formik.touched.oldPassword && formik.errors.oldPassword}
            label="Old Password"
            margin="normal"
            name="oldPassword"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="password"
            value={formik.values.oldPassword}
            variant="outlined"
          />
          <TextField
            error={Boolean(formik.touched.newPassword && formik.errors.newPassword)}
            fullWidth
            helperText={formik.touched.newPassword && formik.errors.newPassword}
            label="New Password"
            margin="normal"
            name="newPassword"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="password"
            value={formik.values.newPassword}
            variant="outlined"
          />
          <TextField
            error={Boolean(formik.touched.newPasswordConfirmation && formik.errors.newPasswordConfirmation)}
            fullWidth
            helperText={formik.touched.newPasswordConfirmation && formik.errors.newPasswordConfirmation}
            label="New Password Confirmation"
            margin="normal"
            name="newPasswordConfirmation"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="password"
            value={formik.values.newPasswordConfirmation}
            variant="outlined"
          />
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
            Update
          </Button>
        </Box>
      </Card>
    </form>
  );
};
