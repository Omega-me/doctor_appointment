'use client';
import { AppointmentDTO, CustomerInfoDTO, DoctorInfoDTO, UserStateDTO } from '@/common/dto';
import { eApiRoutes, eHttpMethod, eRoutes } from '@/common/enums';
import { IResponse } from '@/common/interfaces';
import { Home } from '@/containers/components';
import useAuth from '@/hooks/useAuth';
import { httpClient } from '@/services';
import { Box, CircularProgress } from '@mui/material';
import { user_role } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

const HomeModule = () => {
  const { data } = useAuth<UserStateDTO>();
  const { token } = data.user;
  const rauter = useRouter();

  const { data: appontments } = useQuery<IResponse<AppointmentDTO[]>>({
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

  const { data: doctors } = useQuery<IResponse<DoctorInfoDTO[]>>({
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

  const { data: patients } = useQuery<IResponse<CustomerInfoDTO[]>>({
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

  const onMoveDetail = (url: string) => {
    rauter.push(url);
  };

  return (
    <>
      {data.user.role === user_role.Admin ? (
        <Home onMoveDetail={onMoveDetail} user={data} appontments={appontments?.data} doctors={doctors?.data} patients={patients?.data} />
      ) : (
        <Box sx={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <CircularProgress />
        </Box>
      )}
    </>
  );
};

export default HomeModule;
