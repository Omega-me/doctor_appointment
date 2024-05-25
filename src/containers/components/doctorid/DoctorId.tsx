'use client';
import { memo } from 'react';
import s from './doctorid.module.scss';
import { DoctorInfoDTO, UserStateDTO } from '@/common/dto';
import { Autocomplete, Button, Card, TextField, Typography } from '@mui/material';
import moment from 'moment';
import { user_role } from '@prisma/client';
import { UserStateType } from '@/common/interfaces';

interface DoctorIdProps {
  data?: DoctorInfoDTO;
  user: UserStateType;
}

const DoctorId: React.FC<DoctorIdProps> = props => {
  return (
    <div className={s.doctorid}>
      <Card sx={{ marginBottom: '20px', padding: '30px' }}>
        <Card sx={{ marginBottom: '10px', padding: '10px' }}>
          <Typography>Doctor Informations</Typography>
        </Card>
        <Card sx={{ marginBottom: '30px', padding: '30px' }}>
          <Typography>
            Doctor Id: <b>{props.data?.id}</b>{' '}
          </Typography>
          <Typography>
            First Name: <b>{props.data?.first_name}</b>{' '}
          </Typography>
          <Typography>
            Last Name: <b>{props.data?.last_name}</b>
          </Typography>
          <Typography>
            Gender: <b>{props.data?.gender}</b>
          </Typography>
          <Typography>
            Phone number: <b>{props.data?.phone}</b>
          </Typography>
          <Typography>
            Specialization: <b>{props.data?.role}</b>
          </Typography>
          <Typography>
            Date of Birth: <b>{moment(props.data?.dob?.toString()).format('MMM Do YY')}</b>
          </Typography>
          <Typography>
            Email: <b>{(props.data?.user as any)?.email}</b>
          </Typography>
        </Card>
      </Card>
      {props.user?.user?.role === user_role.Admin && (
        <>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={[
              { label: user_role.Admin, role: user_role.Admin },
              { label: user_role.Doctor, role: user_role.Doctor },
              { label: user_role.Patient, role: user_role.Patient },
            ]}
            sx={{ width: 300 }}
            defaultValue={{ label: user_role.Doctor, role: user_role.Doctor }}
            renderInput={params => <TextField {...params} label="Role" />}
          />
          <Button>Change Role</Button>
        </>
      )}
    </div>
  );
};

export default memo(DoctorId);
