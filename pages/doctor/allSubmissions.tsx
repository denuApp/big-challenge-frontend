
import React from 'react'
import { Layout } from '../../components/layouts';
import { Card, CardHeader, Grid, Typography, MenuItem } from '@mui/material';
import { borderRadius, fontWeight, height } from '@mui/system';
import { grey, red } from '@mui/material/colors';
import { DoctorSubmissionCard } from '../../components/submissions';

const allSumbissions = () => {
 
  return (
    <Layout>
      
      <Typography variant="h3" sx={{ padding: '20px', fontWeight: 'bold', letterSpacing: '2px' }}>SUBMISSION DASHBOARD</Typography>

        <Grid container spacing={ 2 } sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'start'}}>

            <DoctorSubmissionCard />
            <DoctorSubmissionCard />
            <DoctorSubmissionCard />
            <DoctorSubmissionCard />

          </Grid>


    </Layout>
  );
}

export default allSumbissions;