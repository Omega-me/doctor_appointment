'use client';
import { AppointmentDTO, UserStateDTO } from '@/common/dto';
import { eApiRoutes, eHttpMethod } from '@/common/enums';
import { IResponse } from '@/common/interfaces';
import { AppointmentId } from '@/containers/components';
import useAuth from '@/hooks/useAuth';
import { httpClient } from '@/services';
import { useQuery } from '@tanstack/react-query';

interface AppointmentIdModuleProps {
  id: string;
}

const AppointmentIdModule: React.FC<AppointmentIdModuleProps> = props => {
  const { data } = useAuth<UserStateDTO>();
  const { token } = data.user;

  const { data: appointment } = useQuery<IResponse<AppointmentDTO>>({
    queryKey: [`${eApiRoutes.APPOINTMENTS}/${props.id}`],
    queryFn: () =>
      httpClient(eHttpMethod.GET, `${eApiRoutes.APPOINTMENTS}/${props.id}`, {
        axiosConfig: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      }),
    enabled: !!token && !!props.id,
  });
  return <AppointmentId data={appointment?.data} />;
};

export default AppointmentIdModule;
