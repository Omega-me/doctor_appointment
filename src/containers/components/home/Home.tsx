'use client';
import { memo } from 'react';
import { Button, Card, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { PatientsAndDoctors } from '..';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import { AppointmentDTO, DoctorInfoDTO, CustomerInfoDTO, UserStateDTO } from '@/common/dto';

interface HomeProps {
  appontments?: AppointmentDTO[];
  doctors?: DoctorInfoDTO[];
  patients?: CustomerInfoDTO[];
  user: UserStateDTO;
}

function createData(id: number, patientName: string, phone: string, patientInfo: string) {
  return { id, patientName, phone, patientInfo };
}

const rows = [
  createData(1, 'Olken merxira', '355696621145', 'Problems with knee'),
  createData(1, 'Olken merxira', '355696621145', 'Problems with knee'),
  createData(1, 'Olken merxira', '355696621145', 'Problems with knee'),
  createData(1, 'Olken merxira', '355696621145', 'Problems with knee'),
];

const Home: React.FC<HomeProps> = props => {
  return (
    <Grid container spacing={3}>
      <PatientsAndDoctors />
      <PatientsAndDoctors isDoctor={true} />
      <Grid item xs={12}>
        <Card sx={{ marginBottom: '20px', padding: '30px' }}>
          <Typography>Appointment requests</Typography>
        </Card>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell align="right">Patient</TableCell>
                <TableCell align="right">Phone</TableCell>
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
                  <TableCell align="right">{row.phone}</TableCell>
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
      </Grid>
    </Grid>
  );
};

export default memo(Home);
