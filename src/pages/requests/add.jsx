import Head from 'next/head';
import { Box, Container, Typography } from '@mui/material';
import { DashboardLayout } from '../../components/dashboard-layout';
import { RoleGuard } from '../../components/role-guard';
import { RequestFormAdd } from '../../components/request/request-form-add';

const Page = () => (
  <>
    <Head>
      <title>
        Agreements | Legal Web
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="lg">
        <Typography
          sx={{ mb: 3 }}
          variant="h4"
        >
          Agreement Form
        </Typography>
        <RequestFormAdd />
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => (
  <DashboardLayout>
    <RoleGuard page='request' access='create'>
      {page}
    </RoleGuard>
  </DashboardLayout>
);

export default Page;
