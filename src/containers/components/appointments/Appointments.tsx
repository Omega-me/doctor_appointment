'use client';
import { memo } from 'react';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import { AppointmentDTO, UserStateDTO } from '@/common/dto';
import moment from 'moment';
import { eRoutes } from '@/common/enums';
import { UserStateType } from '@/common/interfaces';
import { user_role } from '@prisma/client';

interface AppointmentsProps {
  appontments?: AppointmentDTO[];
  myAppointments?: AppointmentDTO[];
  user: UserStateType;
  onMoveDetail: (url: string) => void;
}

const Appointments: React.FC<AppointmentsProps> = props => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell align="right">Patient</TableCell>
            <TableCell align="right">Doctor</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Patient informations</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        {props.user?.user.role === user_role.Admin ? (
          <TableBody>
            {props?.appontments?.map(row => (
              <TableRow key={row?.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {row?.id}
                </TableCell>
                <TableCell align="right">
                  {row?.customer_info?.first_name} {row?.customer_info?.last_name}
                </TableCell>
                <TableCell align="right">
                  {row?.doctor_info?.first_name} {row?.doctor_info?.last_name}
                </TableCell>
                <TableCell align="right">{moment(row?.date?.toString()).format('MMM Do YY')}</TableCell>
                <TableCell align="right">{row.info}</TableCell>
                <TableCell align="center">
                  <Button onClick={() => props.onMoveDetail(`${eRoutes.APPOINTMENTS}/${row?.id}`)} variant="text">
                    <VisibilityIcon />
                  </Button>
                  <Button color="error" variant="text">
                    <DeleteIcon color="error" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        ) : (
          <TableBody>
            {props?.myAppointments?.map(row => (
              <TableRow key={row?.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {row?.id}
                </TableCell>
                <TableCell align="right">
                  {row?.customer_info?.first_name} {row?.customer_info?.last_name}
                </TableCell>
                <TableCell align="right">
                  {row?.doctor_info?.first_name} {row?.doctor_info?.last_name}
                </TableCell>
                <TableCell align="right">{moment(row?.date?.toString()).format('MMM Do YY')}</TableCell>
                <TableCell align="right">{row.info}</TableCell>
                <TableCell align="center">
                  <Button onClick={() => props.onMoveDetail(`${eRoutes.APPOINTMENTS}/${row?.id}`)} variant="text">
                    <VisibilityIcon />
                  </Button>
                  <Button color="error" variant="text">
                    <DeleteIcon color="error" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
    </TableContainer>
  );
};

export default memo(Appointments);
