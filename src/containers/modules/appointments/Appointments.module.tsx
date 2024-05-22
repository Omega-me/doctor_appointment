'use client';
import { UserStateDTO, AppointmentDTO } from '@/common/dto';
import { eApiRoutes, eHttpMethod } from '@/common/enums';
import { Appointments } from '@/containers/components';
import useAuth from '@/hooks/useAuth';
import { httpClient } from '@/services';
import { user_role } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';

const AppointmentsModule = () => {
  const { data } = useAuth<UserStateDTO>();
  const { token } = data.user;

  const { data: appontments } = useQuery<AppointmentDTO[]>({
    queryKey: [eApiRoutes.APPOINTMENTS + '?isRequest'],
    queryFn: () =>
      httpClient(eHttpMethod.GET, eApiRoutes.APPOINTMENTS, {
        axiosConfig: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      }),
    enabled: !!token && data.user.role === user_role.Admin,
  });

  return <Appointments user={data} appontments={appontments} />;
};

export default AppointmentsModule;
