import Head from 'next/head';
import { Box, Container, Typography } from '@mui/material';
import { DashboardLayout } from '../../../components/dashboard-layout';
import { RoleGuard } from '../../../components/role-guard';
import { RequestDetail } from '../../../components/request/request-detail';

const Page = () => (
  <>
    <Head>
      <title>
        Requests | Legal Web
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
          Request Form
        </Typography>
        <RequestDetail />
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => (
  <DashboardLayout>
    <RoleGuard page='request' access='read'>
      {page}
    </RoleGuard>
  </DashboardLayout>
);

export default Page;
