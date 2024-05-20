'use client';
import React, { useEffect, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AppBar, Copyright, Drawer, ListMenuItems } from '@/containers/components/ui';
import {
  Box,
  CssBaseline,
  Toolbar,
  IconButton,
  Typography,
  Badge,
  Divider,
  List,
  Container,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  CircularProgress,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { eRoutes } from '@/common/enums';
import { UserStateType } from '@/common/interfaces';
import useAuth from '@/hooks/useAuth';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import LogoutIcon from '@mui/icons-material/Logout';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

const ClientLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [mode, setMode] = React.useState<'light' | 'dark'>('light');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  const pathname = usePathname();
  const router = useRouter();
  const { logout, data } = useAuth<UserStateType>();
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (!data) {
      router.push(eRoutes.LOGIN);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderTitle = () => {
    let title: string = 'Dashboard';
    switch (pathname) {
      case eRoutes.HOME:
        title = 'Dashboard';
        break;
      case eRoutes.PROFILE:
        title = 'Profile';
        break;
      case eRoutes.PATIENTS:
        title = 'Patients';
        break;
      case eRoutes.DOCTORS:
        title = 'Doctors';
        break;
      case eRoutes.APPOINTMENTS:
        title = 'Appointments';
        break;
      default:
        break;
    }
    return title;
  };

  const renderLayoutContnent = () => {
    if (pathname === eRoutes.LOGIN || pathname === eRoutes.REGISTER) {
      return <div>{children}</div>;
    } else {
      if (!data) {
        return (
          <Box sx={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <CircularProgress />
          </Box>
        );
      }
      return (
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />

          <AppBar position="absolute" open={open}>
            <Toolbar
              sx={{
                pr: '24px',
              }}>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer}
                sx={{
                  marginRight: '36px',
                  ...(open && { display: 'none' }),
                }}>
                <MenuIcon />
              </IconButton>
              <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
                {renderTitle()}
              </Typography>
              <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
                {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            </Toolbar>
          </AppBar>
          <Drawer variant="permanent" open={open}>
            <Toolbar
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                px: [1],
              }}>
              <IconButton onClick={toggleDrawer}>
                <ChevronLeftIcon />
              </IconButton>
            </Toolbar>
            <Divider />
            <List component="nav">
              <ListMenuItems />
              <Divider sx={{ my: 1 }} />
              <ListItemButton onClick={logout}>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </List>
          </Drawer>
          <Box
            component="main"
            sx={{
              backgroundColor: theme => (theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900]),
              flexGrow: 1,
              height: '100vh',
              overflow: 'auto',
            }}>
            <Toolbar />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              {children}
              <Copyright sx={{ pt: 4 }} />
            </Container>
          </Box>
        </Box>
      );
    }
  };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{<>{renderLayoutContnent()}</>}</ThemeProvider>;
    </ColorModeContext.Provider>
  );
};

export default ClientLayout;
