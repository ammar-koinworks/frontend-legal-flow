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

export const OpinionListToolbar = ({ tableContext }) => {
  const { roleAccess } = useAuthContext();

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
          Opinions
        </Typography>
        {roleAccess?.opinion?.create &&
          <Box sx={{ m: 1 }}>
            <Button
              color="primary"
              variant="contained"
              onClick={() => Router
                .push('/opinions/add')
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
                placeholder="Search document"
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
