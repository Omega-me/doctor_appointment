'use client';
import { AppointmentDTO } from '@/common/dto';
import { eApiRoutes, eHttpMethod } from '@/common/enums';
import { IResponse, UserStateType } from '@/common/interfaces';
import { Appointments } from '@/containers/components';
import useAuth from '@/hooks/useAuth';
import { httpClient } from '@/services';
import { user_role } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

const AppointmentsModule = () => {
  const { data } = useAuth<UserStateType>();
  const { token } = data?.user as any;
  const rauter = useRouter();

  const { data: appontments } = useQuery<IResponse<AppointmentDTO[]>>({
    queryKey: [eApiRoutes.APPOINTMENTS],
    queryFn: () =>
      httpClient(eHttpMethod.GET, eApiRoutes.APPOINTMENTS, {
        axiosConfig: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      }),
    enabled: !!token && data?.user.role === user_role.Admin,
  });

  const { data: myAppointments } = useQuery<IResponse<AppointmentDTO[]>>({
    queryKey: [`${eApiRoutes.AUTH_ME}${eApiRoutes.APPOINTMENTS}`],
    queryFn: () =>
      httpClient(eHttpMethod.GET, `${eApiRoutes.AUTH_ME}${eApiRoutes.APPOINTMENTS}`, {
        axiosConfig: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      }),
    enabled: !!token && data?.user.role !== user_role.Admin,
  });

  const onMoveDetail = (url: string) => {
    rauter.push(url);
  };

  return <Appointments myAppointments={myAppointments?.data} onMoveDetail={onMoveDetail} user={data} appontments={appontments?.data} />;
};

export default AppointmentsModule;
