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
import { useState } from 'react';
import { useGetDatasTable } from '../../hooks/table';
import { opinions } from '../../api/opinion';
import { Visibility, Delete, CheckCircleOutline } from '@mui/icons-material';
import { useOpinionAction } from'../../hooks/opinion';

export const OpinionListResults = ({ tableContext, action = '' }) => {
  const { datas, totalDatas } = useGetDatasTable(tableContext.query, () => opinions(tableContext.query));
  const { deleteHandler, finishHandler } = useOpinionAction();

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
                    {data.opinion_title}
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
                      onClick={() => Router.push(`opinions/detail/${data.id}`)}
                      title="detail"
                    >
                      <Visibility />
                    </IconButton>
                    {action !== 'finish' && <IconButton
                      color="error"
                      onClick={() => { deleteHandler(data.id); tableContext.pageHandler(1); }}
                      title="detail"
                    >
                      <Delete />
                    </IconButton>}
                    {action === 'finish' && data.request_status.name === 'Open' && <IconButton
                      color="warning"
                      onClick={() => { finishHandler(data.id); tableContext.pageHandler(1); }}
                      title="detail"
                    >
                      <CheckCircleOutline />
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
