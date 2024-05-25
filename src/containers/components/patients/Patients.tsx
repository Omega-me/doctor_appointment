'use client';
import { memo } from 'react';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import { UserStateDTO, CustomerInfoDTO } from '@/common/dto';
import moment from 'moment';
import { eRoutes } from '@/common/enums';

interface PatientsProps {
  user: UserStateDTO;
  patients?: CustomerInfoDTO[];
  onMoveDetail: (url: string) => void;
}

const Patients: React.FC<PatientsProps> = props => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Gender</TableCell>
            <TableCell align="right">Phone</TableCell>
            <TableCell align="right">Patient informations</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Date of birth</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props?.patients?.map(row => (
            <TableRow key={row?.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {row?.id}
              </TableCell>
              <TableCell align="right">
                {row?.first_name} {row?.last_name}
              </TableCell>
              <TableCell align="right">{row?.gender}</TableCell>
              <TableCell align="right">{row?.phone}</TableCell>
              <TableCell align="right">{row?.info}</TableCell>
              <TableCell align="right">{(row?.user as any)?.email}</TableCell>
              <TableCell align="right">{moment(row?.dob?.toString()).format('MMM Do YY')}</TableCell>
              <TableCell align="center">
                <Button onClick={() => props.onMoveDetail(`${eRoutes.PATIENTS}/${row?.id}`)} variant="text">
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

export default memo(Patients);
