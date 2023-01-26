import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import Router from 'next/router';
import { useGetDatasTable } from '../../hooks/table';
import { documents } from '../../api/document';
import { Visibility } from '@mui/icons-material';

export const DocumentListResults = ({ tableContext }) => {
  const { datas, totalDatas } = useGetDatasTable(tableContext.query, () => documents(tableContext.query));

  return (
    <Card>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Requester
                </TableCell>
                <TableCell>
                  Title
                </TableCell>
                <TableCell>
                  Link
                </TableCell>
                <TableCell>
                  Description
                </TableCell>
                <TableCell>
                  Created At
                </TableCell>
                <TableCell>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {datas.map((data) => (
                <TableRow
                  hover
                  key={data.id}
                >
                  <TableCell>
                    {data.requester_name}
                  </TableCell>
                  <TableCell>
                    {data.document_title}
                  </TableCell>
                  <TableCell>
                    {data.document_link ?? '-'}
                  </TableCell>
                  <TableCell>
                    {data.Description}
                  </TableCell>
                  <TableCell>
                    {data.created_at}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      color="info"
                      onClick={() => Router.push(`documents/detail/${data.id}`)}
                      title="detail"
                    >
                      <Visibility />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={totalDatas}
        onPageChange={(e, n) => tableContext.pageHandler(n + 1)}
        onRowsPerPageChange={(e) => tableContext.rowHandler(e.target.value)}
        page={tableContext.query.page - 1}
        rowsPerPage={tableContext.query.row}
        rowsPerPageOptions={tableContext.rowOptions}
      />
    </Card>
  );
};
