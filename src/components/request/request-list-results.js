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
import { Visibility, Delete } from '@mui/icons-material';
import { requests, requestsAdmin, requestsManager, requestsDirectLine,requestsCLO, requestsPIC } from '../../api/request';
import { useRequestAction } from '../../hooks/request';

export const RequestListResults = ({ tableContext, action = '' }) => {
  let fetch, path;
  if (action === 'admin-approval') {
    fetch = requestsAdmin(tableContext.query);
    path = 'detail-admin';
  } else if (action === 'manager-approval') {
    fetch = requestsManager(tableContext.query);
    path = 'detail-manager';
  } else if (action === 'clo-approval') {
    fetch = requestsCLO(tableContext.query);
    path = 'detail-clo';
  } else if (action === 'dl-approval') {
    fetch = requestsDirectLine(tableContext.query);
    path = 'detail-dl';
  } else if (action === 'pic-approval') {
    fetch = requestsPIC(tableContext.query);
    path = 'detail-pic';
  } else {
    fetch =  requests(tableContext.query);
    path = 'detail';
  }
  const { datas, totalDatas } = useGetDatasTable(tableContext.query, () => fetch);
  const { deleteHandler } = useRequestAction();

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
                    {data.request_status?.name}
                  </TableCell>
                  <TableCell>
                    {data.created_at}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      color="info"
                      onClick={() => Router.push(`/requests/${path}/${data.id}`)}
                      title="detail"
                    >
                      <Visibility />
                    </IconButton>
                    {action === '' && data.request_status_id <= 3 && <IconButton
                      color="error"
                      onClick={() => { deleteHandler(data.id); tableContext.pageHandler(1); }}
                      title="detail"
                    >
                      <Delete />
                    </IconButton>}
                  </TableCell>
                </TableRow>
              ))
                :
                <TableRow>
                  <TableCell
                    colSpan={'100'}
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
