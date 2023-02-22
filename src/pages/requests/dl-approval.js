import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { DashboardLayout } from '../../components/dashboard-layout';
import { useTableContext } from '../../contexts/table-context';
import { RoleGuard } from '../../components/role-guard';
import { RequestListToolbar } from '../../components/request/request-list-toolbar';
import { RequestListResults } from '../../components/request/request-list-results';

const Page = () => {
  const tableContext = useTableContext();

  return (
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
        <Container maxWidth={false}>
          <RequestListToolbar tableContext={tableContext} action='dl-approval' />
          <Box sx={{ mt: 3 }}>
            <RequestListResults tableContext={tableContext} action='dl-approval' />
          </Box>
        </Container>
      </Box>
    </>
  )
};

Page.getLayout = (page) => (
  <DashboardLayout>
    <RoleGuard page='request' access='read'>
      {page}
    </RoleGuard>
  </DashboardLayout >
);

export default Page;
