'use client';
import { AppointmentDTO, CustomerInfoDTO, DoctorInfoDTO, UserStateDTO } from '@/common/dto';
import { eApiRoutes, eHttpMethod } from '@/common/enums';
import { Home } from '@/containers/components';
import useAuth from '@/hooks/useAuth';
import { httpClient } from '@/services';
import { Box, CircularProgress } from '@mui/material';
import { user_role } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';

const HomeModule = () => {
  const { data } = useAuth<UserStateDTO>();
  const { token } = data.user;

  const { data: appontments } = useQuery<AppointmentDTO[]>({
    queryKey: [eApiRoutes.APPOINTMENTS + '?isRequest'],
    queryFn: () =>
      httpClient(eHttpMethod.GET, eApiRoutes.APPOINTMENTS + '?isRequest', {
        axiosConfig: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      }),
    enabled: !!token && data.user.role === user_role.Admin,
  });

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

  const { data: patients } = useQuery<CustomerInfoDTO[]>({
    queryKey: [eApiRoutes.PATIENTS],
    queryFn: () =>
      httpClient(eHttpMethod.GET, eApiRoutes.PATIENTS, {
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
      {data.user.role === user_role.Admin ? (
        <Home user={data} appontments={appontments} doctors={doctors} patients={patients} />
      ) : (
        <Box sx={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <CircularProgress />
        </Box>
      )}
    </>
  );
};

export default HomeModule;
