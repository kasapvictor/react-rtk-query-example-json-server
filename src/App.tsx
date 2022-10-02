import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export const App = () => {
  return (
    <Container>
      <Typography variant="h2">App Component</Typography>
      <Box>
        <Button sx={{ marginTop: 10 }} variant="contained">
          Hello World
        </Button>
      </Box>
    </Container>
  );
};
