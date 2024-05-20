'use client';
import { CreateUserDTO, LoginUserDTO } from '@/common/dto';
import { eRoutes } from '@/common/enums';
import { LoginRegister } from '@/containers/components';
import useAuth from '@/hooks/useAuth';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

const RegisterModule = () => {
  const { isLoading, data, signup, message, finishProcess, resetFinishProcessState } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginUserDTO | CreateUserDTO>({});

  const onSubmit = handleSubmit(data => signup(data as CreateUserDTO));

  useEffect(() => {
    if (data) {
      redirect(eRoutes.HOME);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <LoginRegister
      register={true}
      errors={errors}
      finishProcess={finishProcess}
      resetFinishProcessState={resetFinishProcessState}
      message={message}
      isLoading={isLoading}
      onSubmit={onSubmit}
      registerField={register}
    />
  );
};

export default RegisterModule;
