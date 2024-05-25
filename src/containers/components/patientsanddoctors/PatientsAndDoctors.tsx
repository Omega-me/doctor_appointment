'use client';
import { memo } from 'react';
import { Button, Card, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { DoctorInfoDTO, CustomerInfoDTO } from '@/common/dto';
import moment from 'moment';
import { eRoutes } from '@/common/enums';

interface PatientsAndDoctorsProps {
  isDoctor?: boolean;
  data?: DoctorInfoDTO[] | CustomerInfoDTO[];
  onMoveDetail: (url: string) => void;
}

const PatientsAndDoctors: React.FC<PatientsAndDoctorsProps> = props => {
  return (
    <Grid item xs={12} md={6} lg={6}>
      <Card sx={{ marginBottom: '20px', padding: '30px' }}>
        <Typography>{props.isDoctor ? 'Doctors' : 'Patients'}</Typography>
      </Card>
      <TableContainer component={Paper}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Phone No</TableCell>
              <TableCell align="right">Date of birth</TableCell>
              <TableCell align="right">Gender</TableCell>
              <TableCell align="right">More</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props?.data?.map(row => (
              <TableRow key={row?.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {row.first_name} {row.last_name}
                </TableCell>
                <TableCell align="right">{row?.phone}</TableCell>
                <TableCell align="right">{moment(row?.dob.toString()).format('MMM Do YY')}</TableCell>
                <TableCell align="right">{row?.gender}</TableCell>
                <TableCell align="right">
                  <Button onClick={() => props.onMoveDetail(`${props.isDoctor ? eRoutes.DOCTORS : eRoutes.PATIENTS}/${row?.id}`)} variant="text">
                    <ArrowForwardIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
};

export default memo(PatientsAndDoctors);
