import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import { useRouter, usePathname } from 'next/navigation';
import { eRoutes } from '@/common/enums';
import useAuth from '@/hooks/useAuth';
import { UserStateDTO } from '@/common/dto';
import { user_role } from '@prisma/client';

const ListMenuItems = () => {
  const { data } = useAuth<UserStateDTO>();
  const { role } = data.user;
  const router = useRouter();
  const pathname = usePathname();

  return (
    <React.Fragment>
      {role === user_role.Admin && (
        <ListItemButton selected={pathname === eRoutes.HOME} onClick={() => router.push(eRoutes.HOME)}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
      )}
      {role !== user_role.Admin && (
        <ListItemButton selected={pathname === eRoutes.PROFILE} onClick={() => router.push(eRoutes.PROFILE)}>
          <ListItemIcon>
            <ShoppingCartIcon />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItemButton>
      )}
      {role === user_role.Admin && (
        <ListItemButton selected={pathname === eRoutes.PATIENTS} onClick={() => router.push(eRoutes.PATIENTS)}>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Patients" />
        </ListItemButton>
      )}
      {role !== user_role.Doctor && (
        <ListItemButton selected={pathname === eRoutes.DOCTORS} onClick={() => router.push(eRoutes.DOCTORS)}>
          <ListItemIcon>
            <BarChartIcon />
          </ListItemIcon>
          <ListItemText primary="Doctors" />
        </ListItemButton>
      )}
      <ListItemButton selected={pathname === eRoutes.APPOINTMENTS} onClick={() => router.push(eRoutes.APPOINTMENTS)}>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Appointments" />
      </ListItemButton>
    </React.Fragment>
  );
};

export default ListMenuItems;
