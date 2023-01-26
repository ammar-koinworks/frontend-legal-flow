import Head from 'next/head';
import { Box, Container, Typography } from '@mui/material';
import { DashboardLayout } from '../../../components/dashboard-layout';
import { DocumentDetail } from '../../../components/document/document-detail';
import { RoleGuard } from '../../../components/role-guard';

const Page = () => (
  <>
    <Head>
      <title>
        Documents | Legal Web
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
          Document Form
        </Typography>
        <DocumentDetail />
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
