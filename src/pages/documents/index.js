import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { DocumentListResults } from '../../components/document/document-list-results';
import { DocumentListToolbar } from '../../components/document/document-list-toolbar';
import { DashboardLayout } from '../../components/dashboard-layout';
import { useTableContext } from '../../contexts/table-context';
import { RoleGuard } from '../../components/role-guard';

const Page = () => {
  const tableContext = useTableContext();

  return (
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
        <Container maxWidth={false}>
          <DocumentListToolbar tableContext={tableContext} />
          <Box sx={{ mt: 3 }}>
            <DocumentListResults tableContext={tableContext} />
          </Box>
        </Container>
      </Box>
    </>
  )
};

Page.getLayout = (page) => (
  <DashboardLayout>
    <RoleGuard page='document' access='read'>
      {page}
    </RoleGuard>
  </DashboardLayout >
);

export default Page;
