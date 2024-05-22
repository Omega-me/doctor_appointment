'use client';
import { UserStateDTO, DoctorInfoDTO } from '@/common/dto';
import { eApiRoutes, eHttpMethod } from '@/common/enums';
import { Doctors } from '@/containers/components';
import useAuth from '@/hooks/useAuth';
import { httpClient } from '@/services';
import { Box, CircularProgress } from '@mui/material';
import { user_role } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';

const DoctorsModule = () => {
  const { data } = useAuth<UserStateDTO>();
  const { token } = data.user;

  const { data: doctors } = useQuery<DoctorInfoDTO[]>({
    queryKey: [eApiRoutes.DOCTORS],
    queryFn: () =>
      httpClient(eHttpMethod.GET, eApiRoutes.DOCTORS, {
        axiosConfig: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      }),
    enabled: !!token && data.user.role === user_role.Admin,
  });
  return (
    <>
      {data.user.role !== user_role.Doctor ? (
        <Doctors user={data} doctors={doctors} />
      ) : (
        <Box sx={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <CircularProgress />
        </Box>
      )}
    </>
  );
};

export default DoctorsModule;
