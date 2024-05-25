'use client';
import { memo } from 'react';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import { UserStateDTO, DoctorInfoDTO } from '@/common/dto';
import moment from 'moment';
import { eRoutes } from '@/common/enums';

interface DoctorsProps {
  user: UserStateDTO;
  doctors?: DoctorInfoDTO[];
  onMoveDetail: (url: string) => void;
}

const Doctors: React.FC<DoctorsProps> = props => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Specialization</TableCell>
            <TableCell align="right">Gender</TableCell>
            <TableCell align="right">Phone</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">Date of birth</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props?.doctors?.map(row => (
            <TableRow key={row?.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {row?.id}
              </TableCell>
              <TableCell align="right">
                {row?.first_name} {row?.last_name}
              </TableCell>
              <TableCell align="right">{row?.role}</TableCell>
              <TableCell align="right">{row?.gender}</TableCell>
              <TableCell align="right">{row?.phone}</TableCell>
              <TableCell align="right">{(row?.user as any).email}</TableCell>
              <TableCell align="right">{moment(row?.dob?.toString()).format('MMM Do YY')}</TableCell>
              <TableCell align="center">
                <Button onClick={() => props.onMoveDetail(`${eRoutes.DOCTORS}/${row?.id}`)} variant="text">
                  <VisibilityIcon />
                </Button>
                <Button color="error" variant="text">
                  <DeleteIcon color="error" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default memo(Doctors);
