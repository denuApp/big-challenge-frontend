
import React from 'react'
import { Layout } from '../../components/layouts';
import { Card, CardHeader, Grid, Typography, MenuItem } from '@mui/material';
import { borderRadius, fontWeight, height } from '@mui/system';
import { grey, red } from '@mui/material/colors';
import DoctorSubmissionCard from '../../components/submissions/DoctorSubmissionCard';
import PatientSubmissionCard from '../../components/submissions/PatientSubmissionCard';

const allSumbissions = () => {

    const menuItemDoctor = [
        {text: 'All submissions', href: './allSubmissions'},
        {text: 'Taken submission', href: './taskHistory'},
      ]

  const menuItemsGeneral = [
    {text: 'Log Out', href: '/auth/login'}];

 
  return (
    <Layout menuItems={menuItemDoctor}  menuItemsGeneral={menuItemsGeneral} >
      
      <Typography variant="h4" sx={{ padding: '20px', fontWeight: 'semi-bold' }}>Submission Dashboard:</Typography>

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