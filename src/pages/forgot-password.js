import Head from 'next/head';
import NextLink from 'next/link';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Container, Grid, Link, TextField, Typography } from '@mui/material';

// data & helpers
import { useAlertContext } from '../contexts/alert';
import { GuestGuard } from '../components/guest-guard';
import { forgotPassword, newPassword } from '../api/auth';

const ForgotPassword = () => {
  const alertContext = useAlertContext();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      passwordConfirmation: '',
      otp: '',
    },
    validationSchema: Yup.object({
      otp: Yup
        .string()
        .max(255)
        .required('Otp Code is required'),
      email: Yup
        .string()
        .email('Must be a valid email')
        .max(255)
        .required('Email is required'),
      password: Yup
        .string()
        .max(255)
        .required('Password is required'),
      passwordConfirmation: Yup
        .string()
        .max(255)
        .required('Password Confirmation is required'),
    }),
    onSubmit: async (data) => {
      try {
        const res = await newPassword({
          'email': data.email,
          'otp': data.otp,
          'new_password': data.password,
          'new_password_confirmation': data.passwordConfirmation,
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

  const otpHandler = async () => {
    try {
      const email = formik.getFieldProps('email')?.value;
      if (!email) {
        alertContext.setAlert("error", "email is required");
        return;
      }

      const res = await forgotPassword({ email });

      if (res.success) {
        alertContext.setAlert("success", res.message);
      } else {
        alertContext.setAlert("error", res.message);
      }

    } catch (err) {
      alertContext.setAlert("error", err.message);
    }
  };

  return (
    <GuestGuard>
      <Head>
        <title>Forgot Password | Legal Web</title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexGrow: 1,
          minHeight: '100%'
        }}
      >
        <Container maxWidth="sm">
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ my: 1 }}>
              <Typography
                color="textPrimary"
                variant="h4"
              >
                Forgot Password
              </Typography>
              <Typography
                color="textSecondary"
                gutterBottom
                variant="body2"
              >
                Please do send otp first before submitting new password
              </Typography>
            </Box>
            <Grid container spacing={2} >
              <Grid item xs={9}>
                <TextField
                  error={Boolean(formik.touched.email && formik.errors.email)}
                  fullWidth
                  helperText={formik.touched.email && formik.errors.email}
                  label="Email Address"
                  margin="normal"
                  name="email"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="email"
                  value={formik.values.email}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={3} paddingX={1}>
                <Box alignItems={'center'} display={'flex'} height={'100%'}>
                  <Button
                    color="primary"
                    disabled={formik.isSubmitting}
                    fullWidth
                    variant="contained"
                    onClick={otpHandler}
                  >
                    Send OTP
                  </Button>
                </Box>
              </Grid>
            </Grid>
            <TextField
              error={Boolean(formik.touched.otp && formik.errors.otp)}
              fullWidth
              helperText={formik.touched.otp && formik.errors.otp}
              label="Otp Code"
              margin="normal"
              name="otp"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.otp}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label="Password"
              margin="normal"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.password}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.passwordConfirmation && formik.errors.passwordConfirmation)}
              fullWidth
              helperText={formik.touched.passwordConfirmation && formik.errors.passwordConfirmation}
              label="Password Confirmation"
              margin="normal"
              name="passwordConfirmation"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.passwordConfirmation}
              variant="outlined"
            />
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Submit
              </Button>
            </Box>
            <NextLink
              href="/login"
            >
              <Link
                to="/login"
                variant="subtitle2"
                underline="hover"
                sx={{
                  cursor: 'pointer'
                }}
              >
                back to l ogin page
              </Link>
            </NextLink>
          </form>
        </Container>
      </Box>
    </GuestGuard >
  );
};

export default ForgotPassword;
