'use client';
import { memo, useEffect } from 'react';
import { Button, Card, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { PatientsAndDoctors } from '..';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import { AppointmentDTO, DoctorInfoDTO, CustomerInfoDTO, UserStateDTO } from '@/common/dto';
import { eRoutes } from '@/common/enums';

interface HomeProps {
  appontments?: AppointmentDTO[];
  doctors?: DoctorInfoDTO[];
  patients?: CustomerInfoDTO[];
  user: UserStateDTO;
  onMoveDetail: (url: string) => void;
}

const Home: React.FC<HomeProps> = props => {
  return (
    <Grid container spacing={3}>
      <PatientsAndDoctors onMoveDetail={props.onMoveDetail} data={props?.patients} />
      <PatientsAndDoctors onMoveDetail={props.onMoveDetail} isDoctor={true} data={props?.doctors} />
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
              {props?.appontments?.map(row => (
                <TableRow key={row?.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {row?.id}
                  </TableCell>
                  <TableCell align="right">
                    {row?.customer_info?.first_name} {row?.customer_info?.last_name}
                  </TableCell>
                  <TableCell align="right">{row?.customer_info?.phone}</TableCell>
                  <TableCell align="right">{row?.info}</TableCell>
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
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default memo(Home);
