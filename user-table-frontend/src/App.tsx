import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import UsersTable from './components/UsersTable';


const App: React.FC = () => {
  return (
    <Container maxWidth="lg">
      {/*Page header including title*/}
      <Box sx={{ my: 4, textAlign: 'center' }}>
        <Typography variant="h3" component="h1" gutterBottom>
          User Activity Dashboard
        </Typography>
      </Box>
      {/*Main table component in App*/}
      <UsersTable />
    </Container>
  );
};

export default App;
