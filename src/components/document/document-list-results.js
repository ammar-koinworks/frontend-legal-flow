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
import { Delete, Visibility } from '@mui/icons-material';
import { useDocumentAction } from '../../hooks/document';
import FinishButton from './finish-button';
import { useState } from 'react';

export const DocumentListResults = ({ tableContext, action = '' }) => {
  const [finish, setFinish] = useState(0);
  const { datas, totalDatas } = useGetDatasTable(tableContext.query, () => documents(tableContext.query), [finish]);
  const { deleteHandler } = useDocumentAction();

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
                  Status
                </TableCell>
                <TableCell>
                  Created At
                </TableCell>
                <TableCell align='center'>
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
                    {data.document_title}
                  </TableCell>
                  <TableCell>
                    {data.document_link ?? '-'}
                  </TableCell>
                  <TableCell>
                    {data.Description}
                  </TableCell>
                  <TableCell>
                    {data.request_status?.name}
                  </TableCell>
                  <TableCell>
                    {data.created_at}
                  </TableCell>
                  <TableCell align='center'>
                    <IconButton
                      color="info"
                      onClick={() => Router.push(`/documents/detail/${data.id}${action === 'finish' ? '?action=finish' : ''}`)}
                      title="detail"
                    >
                      <Visibility />
                    </IconButton>
                    {action !== 'finish' && data.request_status.name === 'Open' && <IconButton
                      color="error"
                      onClick={() => { deleteHandler(data.id); tableContext.pageHandler(1); }}
                      title="delete"
                    >
                      <Delete />
                    </IconButton>}
                    {action === 'finish' && data.document_link === null && <FinishButton id={data.id} icon setFinish={setFinish} />}
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
