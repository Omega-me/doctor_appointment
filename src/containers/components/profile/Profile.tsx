'use client';
import { memo } from 'react';
import s from './profile.module.scss';
import { Grid, Paper } from '@mui/material';

interface ProfileProps {}

const Profile: React.FC<ProfileProps> = props => {
  return (
    <div className={s.profile}>
      <Grid item xs={12} md={12} lg={12}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 240,
          }}>
          Profile
        </Paper>
      </Grid>
    </div>
  );
};

export default memo(Profile);
