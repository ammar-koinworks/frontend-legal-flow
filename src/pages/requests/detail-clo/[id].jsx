import Head from 'next/head';
import { Box, Container, Typography } from '@mui/material';
import { DashboardLayout } from '../../../components/dashboard-layout';
import { RoleGuard } from '../../../components/role-guard';
import { RequestDetailApproval } from '../../../components/request/request-detail-approval';

const Page = () => (
  <>
    <Head>
      <title>
        Agreements CLO Approval | Legal Web
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
          Agreement Detail
        </Typography>
        <RequestDetailApproval action='clo-approval' />
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
