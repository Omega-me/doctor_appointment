'use client';
import { memo } from 'react';
import s from './appointmentid.module.scss';
import { AppointmentDTO } from '@/common/dto';
import { Card, Typography } from '@mui/material';
import moment from 'moment';

interface AppointmentIdProps {
  data?: AppointmentDTO;
}

const AppointmentId: React.FC<AppointmentIdProps> = props => {
  return (
    <div className={s.appointmentid}>
      <Card sx={{ marginBottom: '20px', padding: '30px' }}>
        <Card sx={{ marginBottom: '10px', padding: '10px' }}>
          <Typography>Appointment Informations</Typography>
        </Card>
        <Card sx={{ marginBottom: '30px', padding: '30px' }}>
          <Typography>
            Appointment Id: <b>{props.data?.id}</b>{' '}
          </Typography>
          <Typography>
            Appointment Date <b>{props.data?.date ? moment(props.data?.date?.toString()).format('MMM Do YY') : 'No date set'}</b>{' '}
          </Typography>
        </Card>
        <Card sx={{ marginBottom: '10px', padding: '10px' }}>
          <Typography>Patient Informations</Typography>
        </Card>
        <Card sx={{ marginBottom: '30px', padding: '30px' }}>
          <Typography>
            Patient Id: <b>{props.data?.customer_info.id}</b>{' '}
          </Typography>
          <Typography>
            First Name: <b>{props.data?.customer_info.first_name}</b>{' '}
          </Typography>
          <Typography>
            Last Name: <b>{props.data?.customer_info.last_name}</b>
          </Typography>
          <Typography>
            Gender: <b>{props.data?.customer_info.gender}</b>
          </Typography>
          <Typography>
            Phone number: <b>{props.data?.customer_info.phone}</b>
          </Typography>
          <Typography>
            Informations: <b>{props.data?.customer_info.info}</b>
          </Typography>
          <Typography>
            Date of Birth: <b>{moment(props.data?.customer_info.dob?.toString()).format('MMM Do YY')}</b>
          </Typography>
          <Typography>
            Email: <b>{(props.data?.customer_info.user as any)?.email}</b>
          </Typography>
        </Card>
        <Card sx={{ marginBottom: '10px', padding: '10px' }}>
          <Typography>Doctor Informations</Typography>
        </Card>
        <Card sx={{ marginBottom: '30px', padding: '30px' }}>
          <Typography>
            Doctor Id: <b>{props.data?.doctor_info?.id}</b>{' '}
          </Typography>
          <Typography>
            First Name: <b>{props.data?.doctor_info?.first_name}</b>{' '}
          </Typography>
          <Typography>
            Last Name: <b>{props.data?.doctor_info?.last_name}</b>
          </Typography>
          <Typography>
            Gender: <b>{props.data?.doctor_info?.gender}</b>
          </Typography>
          <Typography>
            Phone number: <b>{props.data?.doctor_info?.phone}</b>
          </Typography>
          <Typography>
            Specialization: <b>{props.data?.doctor_info?.role}</b>
          </Typography>
          <Typography>
            Date of Birth: <b>{moment(props.data?.doctor_info?.dob?.toString()).format('MMM Do YY')}</b>
          </Typography>
          <Typography>
            Email: <b>{(props.data?.doctor_info?.user as any)?.email}</b>
          </Typography>
        </Card>
      </Card>
    </div>
  );
};

export default memo(AppointmentId);
