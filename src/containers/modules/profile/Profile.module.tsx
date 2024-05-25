'use client';
import { CustomerUserStateDTO, DoctorUserStateDTO } from '@/common/dto';
import { UserStateType } from '@/common/interfaces';
import { Profile } from '@/containers/components';
import useAuth from '@/hooks/useAuth';
import { Box, CircularProgress } from '@mui/material';
import { user_role } from '@prisma/client';
import { useForm } from 'react-hook-form';

const ProfileModule = () => {
  const { data } = useAuth<UserStateType>();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CustomerUserStateDTO | DoctorUserStateDTO>({
    defaultValues: {
      dob: data?.dob,
      first_name: data?.first_name,
      last_name: data?.last_name,
      gender: data?.gender,
      role: data?.role,
      id: data?.id,
      info: data?.info,
      phone: data?.phone,
      user_id: data?.user_id,
    },
  });
  const onSubmit = handleSubmit(data => console.log(data));

  return (
    <>
      {data?.user.role !== user_role.Admin ? (
        <Profile setValue={setValue} onSubmit={onSubmit} register={register} data={data} errors={errors} />
      ) : (
        <Box sx={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <CircularProgress />
        </Box>
      )}
    </>
  );
};

export default ProfileModule;
