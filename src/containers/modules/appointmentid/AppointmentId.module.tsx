'use client';
import { AppointmentDTO, UserStateDTO } from '@/common/dto';
import { eApiRoutes, eHttpMethod } from '@/common/enums';
import { AppointmentId } from '@/containers/components';
import useAuth from '@/hooks/useAuth';
import { httpClient } from '@/services';
import { user_role } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';

interface AppointmentIdModuleProps {
  id: string;
}

const AppointmentIdModule: React.FC<AppointmentIdModuleProps> = props => {
  const { data } = useAuth<UserStateDTO>();
  const { token } = data.user;

  const { data: appointment } = useQuery<AppointmentDTO>({
    queryKey: [`${eApiRoutes.APPOINTMENTS}/${props.id}`],
    queryFn: () =>
      httpClient(eHttpMethod.GET, `${eApiRoutes.APPOINTMENTS}/${props.id}`, {
        axiosConfig: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      }),
    enabled: !!token && data.user.role === user_role.Admin && !!props.id,
  });
  return <AppointmentId />;
};

export default AppointmentIdModule;
