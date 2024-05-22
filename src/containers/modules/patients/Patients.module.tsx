'use client';
import { CustomerInfoDTO, UserStateDTO } from '@/common/dto';
import { eApiRoutes, eHttpMethod } from '@/common/enums';
import { Patients } from '@/containers/components';
import useAuth from '@/hooks/useAuth';
import { httpClient } from '@/services';
import { Box, CircularProgress } from '@mui/material';
import { user_role } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';

const PatientsModule = () => {
  const { data } = useAuth<UserStateDTO>();
  const { token } = data.user;

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
      {data.user.role !== user_role.Doctor ? (
        <Patients user={data} patients={patients} />
      ) : (
        <Box sx={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <CircularProgress />
        </Box>
      )}
    </>
  );
};

export default PatientsModule;
