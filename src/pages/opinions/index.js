import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { OpinionListResults } from '../../components/opinion/opinion-list-results';
import { OpinionListToolbar } from '../../components/opinion/opinion-list-toolbar';
import { DashboardLayout } from '../../components/dashboard-layout';
import { useTableContext } from '../../contexts/table-context';
import { RoleGuard } from '../../components/role-guard';

const Page = () => {
    const tableContext = useTableContext();
    tableContext.query.is_admin_approval = false;

    return (
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
                <Container maxWidth={false}>
                    <OpinionListToolbar tableContext={tableContext} />
                    <Box sx={{ mt: 3 }}>
                        <OpinionListResults tableContext={tableContext} />
                    </Box>
                </Container>
            </Box>
        </>
    )
};

Page.getLayout = (page) => (
    <DashboardLayout>
        <RoleGuard page='opinion' access='read'>
            {page}
        </RoleGuard>
    </DashboardLayout >
);

export default Page;
