'use client';
import { UserStateDTO, DoctorInfoDTO } from '@/common/dto';
import { eApiRoutes, eHttpMethod } from '@/common/enums';
import { DoctorId } from '@/containers/components';
import useAuth from '@/hooks/useAuth';
import { httpClient } from '@/services';
import { user_role } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

interface DoctorIdModuleProps {
  id: string;
}

const DoctorIdModule: React.FC<DoctorIdModuleProps> = props => {
  const { data } = useAuth<UserStateDTO>();
  const { token } = data.user;

  const { data: doctor } = useQuery<DoctorInfoDTO>({
    queryKey: [`${eApiRoutes.DOCTORS}/${props.id}`],
    queryFn: () =>
      httpClient(eHttpMethod.GET, `${eApiRoutes.DOCTORS}/${props.id}`, {
        axiosConfig: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      }),
    enabled: !!token && data.user.role === user_role.Admin && !!props.id,
  });
  return <DoctorId />;
};

export default DoctorIdModule;
