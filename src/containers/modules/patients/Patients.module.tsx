'use client';
import { CustomerInfoDTO, UserStateDTO } from '@/common/dto';
import { eApiRoutes, eHttpMethod } from '@/common/enums';
import { IResponse } from '@/common/interfaces';
import { Patients } from '@/containers/components';
import useAuth from '@/hooks/useAuth';
import { httpClient } from '@/services';
import { Box, CircularProgress } from '@mui/material';
import { user_role } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

const PatientsModule = () => {
  const { data } = useAuth<any>();
  const { token } = data.user;
  const rauter = useRouter();

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
      {data.user.role !== user_role.Doctor ? (
        <Patients onMoveDetail={onMoveDetail} user={data} patients={patients?.data as any} />
      ) : (
        <Box sx={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <CircularProgress />
        </Box>
      )}
    </>
  );
};

export default PatientsModule;
