import Head from 'next/head';
import { Box, Container, Typography } from '@mui/material';
import { DashboardLayout } from '../../../components/dashboard-layout';
import { OpinionDetail } from '../../../components/opinion/opinion-detail';
import { RoleGuard } from '../../../components/role-guard';

const Page = () => (
  <>
    <Head>
      <title>
        Opinions | Legal Web
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
          Opinion Form
        </Typography>
        <OpinionDetail />
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => (
  <DashboardLayout>
    <RoleGuard page='document' access='read'>
      {page}
    </RoleGuard>
  </DashboardLayout>
);

export default Page;
