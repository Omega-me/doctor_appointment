'use client';
import { BaseSyntheticEvent, memo } from 'react';
import s from './loginregister.module.scss';
import { Grid, CssBaseline, Paper, Box, Avatar, Typography, TextField, FormControlLabel, Checkbox, Button, Snackbar, CircularProgress } from '@mui/material';
import { Link as MuiLink } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Link from 'next/link';
import { Copyright } from '../ui';
import { eRoutes } from '@/common/enums';
import { LoginUserDTO, CreateUserDTO } from '@/common/dto';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

interface LoginRegisterProps {
  register?: boolean;
  registerField: UseFormRegister<LoginUserDTO | CreateUserDTO>;
  onSubmit: (e?: BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
  isLoading: boolean;
  message: string;
  finishProcess: boolean;
  resetFinishProcessState: () => void;
  errors: FieldErrors<({ passwordConfirm: string } & LoginUserDTO) | CreateUserDTO>;
}

const LoginRegister: React.FC<LoginRegisterProps> = props => {
  return (
    <div className={s.loginregister}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: t => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {props.register ? 'Register' : 'Sign in'}
            </Typography>
            <Box component="form" noValidate onSubmit={props.onSubmit} sx={{ mt: 1 }}>
              <TextField
                {...props.registerField('email', { required: true })}
                margin="normal"
                error={!!props.errors.email}
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                {...props.registerField('password', { required: true })}
                margin="normal"
                error={!!props.errors.password}
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              {props.register && (
                <TextField
                  {...props.registerField('passwordConfirm', { required: true })}
                  margin="normal"
                  error={!!props.errors.passwordConfirm}
                  required
                  fullWidth
                  name="passwordConfirm"
                  label="Password Confirm"
                  type="password"
                  id="passwordConfirm"
                  autoComplete="current-password"
                />
              )}
              <FormControlLabel control={<Checkbox {...props.registerField('remember')} name="remember" color="primary" />} label="Remember me" />
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                {props.isLoading ? <CircularProgress size={25} color="inherit" /> : props.register ? 'Register' : 'Sign in'}
              </Button>
              <Grid container>
                <Grid item>
                  {props.register ? (
                    <Link href={eRoutes.LOGIN}>
                      <MuiLink variant="body2">{'Already have an account? Log In'}</MuiLink>
                    </Link>
                  ) : (
                    <Link href={eRoutes.REGISTER}>
                      <MuiLink variant="body2">{"Don't have an account? Sign Up"}</MuiLink>
                    </Link>
                  )}
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={props.finishProcess && props.message.trim() !== ''}
        onClose={props.resetFinishProcessState}
        message={props.message}
      />
    </div>
  );
};

export default memo(LoginRegister);
