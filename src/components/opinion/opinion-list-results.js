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
import { useState, useEffect } from 'react';
// import { useGetDatasTable } from '../../hooks/table';
import { opinions, opinionDelete } from '../../api/opinion';
import { Visibility, Delete } from '@mui/icons-material';
import { useAlertContext } from '../../contexts/alert';

export const OpinionListResults = ({ tableContext }) => {
  const alertContext = useAlertContext();
  // const { datas, totalDatas } = useGetDatasTable(tableContext.query, () => opinions(tableContext.query));
  const [datas, setDatas] = useState([]);
  const [totalDatas, setTotalDatas] = useState(0);

  const getData = async () => {
    const res = await opinions(tableContext.query);
    setDatas(res.data);
    setTotalDatas(res.count);
  };

  useEffect(() => {
    getData();
  }, [tableContext.query]);

  const deleteHandler = async (id) => {
    try {
      const res = await opinionDelete(id);

      if (res.success) {
        alertContext.setAlert("success", res.message);
        getData();
      } else {
        alertContext.setAlert("error", res.message);
      }

    } catch (err) {
      alertContext.setAlert("error", err.message);
    }
  };

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
                  <TableCell>
                    <IconButton
                      color="info"
                      onClick={() => Router.push(`opinions/detail/${data.id}`)}
                      title="detail"
                    >
                      <Visibility />
                    </IconButton>
                    <IconButton
                      color="info"
                      onClick={() => deleteHandler(data.id)}
                      title="detail"
                    >
                      <Delete />
                    </IconButton>
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
