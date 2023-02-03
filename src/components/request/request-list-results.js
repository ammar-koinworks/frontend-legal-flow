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
import { Visibility } from '@mui/icons-material';
import { requests } from '../../api/request';

export const RequestListResults = ({ tableContext }) => {
  const { datas, totalDatas } = useGetDatasTable(tableContext.query, () => requests(tableContext.query));

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
                  Commercial Terms
                </TableCell>
                <TableCell>
                  Description
                </TableCell>
                <TableCell>
                  Category
                </TableCell>
                <TableCell>
                  PIC
                </TableCell>
                <TableCell>
                  Status
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
              {datas.length ? datas.map((data) => (
                <TableRow
                  hover
                  key={data.id}
                >
                  <TableCell>
                    {data.requester_name}
                  </TableCell>
                  <TableCell>
                    {data.agreement_title}
                  </TableCell>
                  <TableCell>
                    {data.commercial_terms}
                  </TableCell>
                  <TableCell>
                    {data.description}
                  </TableCell>
                  <TableCell>
                    {data.agreement_category?.name}
                  </TableCell>
                  <TableCell>
                    {data.related_pic?.fullname}
                  </TableCell>
                  <TableCell>
                    {data.request_status?.name}
                  </TableCell>
                  <TableCell>
                    {data.created_at}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      color="info"
                      onClick={() => Router.push(`requests/detail/${data.id}`)}
                      title="detail"
                    >
                      <Visibility />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
                :
                <TableRow>
                  <TableCell
                    colSpan={6}
                    align='center'
                  >
                    No data
                  </TableCell>
                </TableRow>
              }
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
