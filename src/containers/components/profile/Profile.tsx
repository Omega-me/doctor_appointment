'use client';
import { BaseSyntheticEvent, memo } from 'react';
import s from './profile.module.scss';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Box, Button, Grid, MenuItem, Paper, Select, TextField } from '@mui/material';
import { CreateCustomerInfoDTO, CreateDoctorInfoDTO, CustomerUserStateDTO, DoctorUserStateDTO, UserStateDTO } from '@/common/dto';
import { customer_info_gender, user_role } from '@prisma/client';
import { FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import dayjs from 'dayjs';
import { UserStateType } from '@/common/interfaces';

interface ProfileProps {
  data: UserStateType;
  register: UseFormRegister<CreateCustomerInfoDTO | CreateDoctorInfoDTO | any>;
  errors: FieldErrors<CreateCustomerInfoDTO | CreateDoctorInfoDTO>;
  onSubmit: (e?: BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
  setValue: UseFormSetValue<CustomerUserStateDTO | DoctorUserStateDTO>;
}

const Profile: React.FC<ProfileProps> = props => {
  return (
    <div className={s.profile}>
      <Grid item xs={12} md={12} lg={12}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 240,
          }}>
          <Grid gap={10} item xs={6} md={6} lg={6}>
            <TextField sx={{ margin: '20px' }} value={props.data?.user.email} id="outlined-basic" label="Email" variant="outlined" />
            <TextField sx={{ margin: '20px' }} value={props.data?.user.role} id="outlined-basic" label="Role" variant="outlined" />
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={8} md={5} component={Paper}>
        <Box
          sx={{
            my: 2,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <Box component="form" noValidate onSubmit={props.onSubmit} sx={{ mt: 1 }}>
            <TextField
              {...props.register('first_name', { required: true })}
              margin="normal"
              error={!!props.errors.first_name}
              required
              fullWidth
              id="first_name"
              label="First Name"
              name="first_name"
              autoComplete="first_name"
              autoFocus
            />
            <TextField
              {...props.register('last_name', { required: true })}
              margin="normal"
              error={!!props.errors.last_name}
              required
              fullWidth
              name="last_name"
              label="Last Name"
              type="last_name"
              id="last_name"
            />
            <Select
              {...props.register('gender', { required: true })}
              error={!!props.errors.gender}
              name="gender"
              required
              fullWidth
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Gender">
              <MenuItem selected disabled value={'Gender'}>
                {'Gender'}
              </MenuItem>
              <MenuItem value={customer_info_gender.Male}>{customer_info_gender.Male}</MenuItem>
              <MenuItem value={customer_info_gender.Female}>{customer_info_gender.Female}</MenuItem>
            </Select>
            <TextField
              {...props.register('phone', { required: true })}
              margin="normal"
              error={!!props.errors.phone}
              required
              fullWidth
              name="phone"
              label="Phone Number"
              type="phone"
              id="phone"
            />
            <DatePicker
              sx={{ marginBottom: '10px' }}
              onChange={(value: any) => {
                props.setValue('dob', dayjs(value).format('MM/DD/YYYY') as any);
              }}
              name="dob"
              label="Date of Birth"
            />
            {props.data?.user.role === user_role.Patient ? (
              <Grid>
                <TextField
                  fullWidth
                  id="outlined-multiline-flexible"
                  {...props.register('info', { required: true })}
                  error={!!props.errors.info}
                  label="Info"
                  multiline
                  maxRows={4}
                />
              </Grid>
            ) : (
              <TextField
                {...props.register('role', { required: true })}
                margin="normal"
                error={!!(props.errors as any).role}
                required
                fullWidth
                name="role"
                label="Specialization"
                type="role"
                id="role"
              />
            )}

            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              {/* {props.isLoading ? <CircularProgress size={25} color="inherit" /> : props.register ? 'Register' : 'Sign in'} */}
              {props.data?.user.noProfile ? 'Create Profile' : 'Update Profile'}
            </Button>
          </Box>
        </Box>
      </Grid>
      {/* <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          open={props.finishProcess && props.message.trim() !== ''}
          onClose={props.resetFinishProcessState}
          message={props.message}
        /> */}
    </div>
  );
};

export default memo(Profile);
