import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon, Typography
} from '@mui/material';
import { Search as SearchIcon } from '../../icons/search';
import { debounce } from '@mui/material/utils';
import Router from 'next/router';
import { useAuthContext } from '../../contexts/auth-context';

export const RequestListToolbar = ({ tableContext, action = '' }) => {
  const { roleAccess } = useAuthContext();
  let title;
  if (action === 'admin-approval') title = 'Admin Approval';
  if (action === 'manager-approval') title = 'Manager Approval';
  if (action === 'clo-approval') title = 'CLO Approval';
  if (action === 'dl-approval') title = 'Direct-Line Approval';
  if (action === 'pic-approval') title = 'PIC Approval';


  return (
    <Box>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          m: -1
        }}
      >
        <Typography
          sx={{ m: 1 }}
          variant="h4"
        >
          Agreements {title}
        </Typography>
        {roleAccess?.request?.create && action === '' &&
          <Box sx={{ m: 1 }}>
            <Button
              color="primary"
              variant="contained"
              onClick={() => Router
                .push('/requests/add')
                .catch(console.error)}
            >
              Add Request
            </Button>
          </Box>
        }
      </Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Box sx={{ maxWidth: 500 }}>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon
                        color="action"
                        fontSize="small"
                      >
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  )
                }}
                placeholder="Search request"
                variant="outlined"
                onChange={debounce(e => tableContext.searchHandler(e.target.value), 500)}
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  )
};
