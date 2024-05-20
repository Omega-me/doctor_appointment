'use client';
import { memo } from 'react';
import { Grid, Paper } from '@mui/material';

interface HomeProps {}

const Home: React.FC<HomeProps> = props => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6} lg={6}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 240,
          }}>
          Customers
        </Paper>
      </Grid>
      <Grid item xs={12} md={6} lg={6}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 240,
          }}>
          Doctors
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>Appointments</Paper>
      </Grid>
    </Grid>
  );
};

export default memo(Home);
