import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import { useGetDatasTable } from '../../hooks/table';
import { documents } from '../../api/document';

export const DocumentListResults = ({ tableContext }) => {
  const { datas, totalDatas } = useGetDatasTable(tableContext.query, documents(tableContext.query));

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
