'use client';
import { memo } from 'react';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import { AppointmentDTO, UserStateDTO } from '@/common/dto';

interface AppointmentsProps {
  appontments?: AppointmentDTO[];
  user: UserStateDTO;
}

function createData(id: number, patientName: string, doctorName: string, date: string, patientInfo: string) {
  return { id, patientName, doctorName, date, patientInfo };
}

const rows = [
  createData(1, 'Olken merxira', 'Dr.Olken Merxira', '06-21-2024', 'Problems with knee'),
  createData(1, 'Olken merxira', 'Dr.Olken Merxira', '06-21-2024', 'Problems with knee'),
  createData(1, 'Olken merxira', 'Dr.Olken Merxira', '06-21-2024', 'Problems with knee'),
  createData(1, 'Olken merxira', 'Dr.Olken Merxira', '06-21-2024', 'Problems with knee'),
  createData(1, 'Olken merxira', 'Dr.Olken Merxira', '06-21-2024', 'Problems with knee'),
  createData(1, 'Olken merxira', 'Dr.Olken Merxira', '06-21-2024', 'Problems with knee'),
  createData(1, 'Olken merxira', 'Dr.Olken Merxira', '06-21-2024', 'Problems with knee'),
  createData(1, 'Olken merxira', 'Dr.Olken Merxira', '06-21-2024', 'Problems with knee'),
  createData(1, 'Olken merxira', 'Dr.Olken Merxira', '06-21-2024', 'Problems with knee'),
  createData(1, 'Olken merxira', 'Dr.Olken Merxira', '06-21-2024', 'Problems with knee'),
  createData(1, 'Olken merxira', 'Dr.Olken Merxira', '06-21-2024', 'Problems with knee'),
  createData(1, 'Olken merxira', 'Dr.Olken Merxira', '06-21-2024', 'Problems with knee'),
];

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
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">{row.patientName}</TableCell>
              <TableCell align="right">{row.doctorName}</TableCell>
              <TableCell align="right">{row.date}</TableCell>
              <TableCell align="right">{row.patientInfo}</TableCell>
              <TableCell align="center">
                <Button variant="text">
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

export default memo(Appointments);
