'use client';
import { memo } from 'react';
import { Button, Card, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { customer_info_gender } from '@prisma/client';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

interface PatientsAndDoctorsProps {
  isDoctor?: boolean;
}

function createData(name: string, phone: string, dob: string, gender: customer_info_gender) {
  return { name, phone, dob, gender };
}

const rows = [
  createData('Jane Smith', '555-1235', '1985-06-15', 'Female'),
  createData('Jane Smith', '555-1235', '1985-06-15', 'Female'),
  createData('Jane Smith', '555-1235', '1985-06-15', 'Female'),
];

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
            {rows.map(row => (
              <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.phone}</TableCell>
                <TableCell align="right">{row.dob}</TableCell>
                <TableCell align="right">{row.gender}</TableCell>
                <TableCell align="right">
                  <Button variant="text">
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
