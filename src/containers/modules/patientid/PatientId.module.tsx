'use client';
import { UserStateDTO, CustomerInfoDTO } from '@/common/dto';
import { eApiRoutes, eHttpMethod } from '@/common/enums';
import { IResponse } from '@/common/interfaces';
import { PatientId } from '@/containers/components';
import useAuth from '@/hooks/useAuth';
import { httpClient } from '@/services';
import { user_role } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';

interface PatientIdModuleProps {
  id: string;
}

const PatientIdModule: React.FC<PatientIdModuleProps> = props => {
  const { data } = useAuth<any>();
  const { token } = data.user;

  const { data: patient } = useQuery<IResponse<CustomerInfoDTO>>({
    queryKey: [`${eApiRoutes.PATIENTS}/${props.id}`],
    queryFn: () =>
      httpClient(eHttpMethod.GET, `${eApiRoutes.PATIENTS}/${props.id}`, {
        axiosConfig: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      }),
    enabled: !!token && data.user.role === user_role.Admin && !!props.id,
  });
  return <PatientId user={data} data={patient?.data} />;
};

export default PatientIdModule;
