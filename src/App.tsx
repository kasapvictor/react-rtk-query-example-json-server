import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { Container, Typography, Box } from '@mui/material';

import { store } from '@app/store';
import { Posts } from '@app/features';

export const App = () => {
  return (
    <Provider store={store}>
      <Container>
        <Box sx={{ marginTop: 3 }}>
          <Typography variant="h2">RTK Query + Local Json Server</Typography>
        </Box>
        <Box sx={{ marginTop: 5 }}>
          <Posts />
        </Box>
      </Container>

      <ToastContainer position="bottom-right" />
    </Provider>
  );
};
