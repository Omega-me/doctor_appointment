'use client';
import { DoctorInfoDTO } from '@/common/dto';
import { eApiRoutes, eHttpMethod } from '@/common/enums';
import { IResponse } from '@/common/interfaces';
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
  const { data } = useAuth<any>();
  const { token } = data.user;

  const { data: doctor } = useQuery<IResponse<DoctorInfoDTO>>({
    queryKey: [`${eApiRoutes.DOCTORS}/${props.id}`],
    queryFn: () =>
      httpClient(eHttpMethod.GET, `${eApiRoutes.DOCTORS}/${props.id}`, {
        axiosConfig: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      }),
    enabled: !!token && data.user.role !== user_role.Doctor && !!props.id,
  });
  return <DoctorId user={data} data={doctor?.data} />;
};

export default DoctorIdModule;
