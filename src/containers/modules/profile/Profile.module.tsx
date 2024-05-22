'use client';
import { UserStateDTO } from '@/common/dto';
import { Profile } from '@/containers/components';
import useAuth from '@/hooks/useAuth';
import { Box, CircularProgress } from '@mui/material';
import { user_role } from '@prisma/client';

const ProfileModule = () => {
  const { data } = useAuth<UserStateDTO>();

  return (
    <>
      {data.user.role !== user_role.Admin ? (
        <Profile />
      ) : (
        <Box sx={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <CircularProgress />
        </Box>
      )}
    </>
  );
};

export default ProfileModule;
