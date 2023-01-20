import {
  Box,
  Card,
  CardContent,
  Typography
} from '@mui/material';

import { useAuthContext } from '../../contexts/auth-context';

export const AccountProfile = (props) => {
  const { user } = useAuthContext();

  return (
    <Card {...props}>
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h5"
          >
            {user.fullname}
          </Typography>
          <Typography
            color="textSecondary"
            variant="body2"
          >
            {user.department.name}
          </Typography>
          <Typography
            color="textSecondary"
            variant="body2"
          >
            {user.position.name}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
};
