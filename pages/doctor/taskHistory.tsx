
import React from 'react'
import { Layout } from '../../components/layouts';
import { Card, CardHeader, Grid, Typography, MenuItem, List } from '@mui/material';
import TakenDoctorSubmissionCard from '../../components/submissions/TakenDoctorSubmissions';

const taskHistory = () => {

    const menuItemDoctor = [
        {text: 'All submissions', href: './allSubmissions'},
        {text: 'Taken submission', href: './taskHistory'},
      ]

  const menuItemsGeneral = [
    {text: 'Log Out', href: '/auth/login'}];

 
  return (
    <Layout menuItems={menuItemDoctor}  menuItemsGeneral={menuItemsGeneral} >
      
      <Typography variant="h4" sx={{ padding: '20px', fontWeight: 'semi-bold' }}>Task History:</Typography>

        <Grid container spacing={ 2 } sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'start'}}>

            {/* <TakenDoctorSubmissionCard />
            <TakenDoctorSubmissionCard />
            <TakenDoctorSubmissionCard />
            <TakenDoctorSubmissionCard />

          </Grid> */}

          <Grid item xs={ 12 } sm={ 6 }>
          <Card  sx={{ height: 'calc(100vh - 100px )' , borderRadius: '15px'}}>
          <CardHeader  title="Not Prescripted" sx={{ color:'white' }}/>
            <List sx={{overflow: 'auto', height: 'calc(90vh - 90px )'}}>
                <TakenDoctorSubmissionCard />
                <TakenDoctorSubmissionCard />
                <TakenDoctorSubmissionCard />
                <TakenDoctorSubmissionCard />
            </List>

          </Card>
        </Grid>

        <Grid item xs={ 12 } sm={6 }>
          <Card   sx={{ height: 'calc(100vh - 100px )', borderRadius: '15px'}}>
            <CardHeader  title="Prescripted" sx={{ color:'gray' }}/>

            <List sx={{overflow: 'auto', height: 'calc(90vh - 90px )'}}>
                <TakenDoctorSubmissionCard />
                <TakenDoctorSubmissionCard />
                <TakenDoctorSubmissionCard />
                <TakenDoctorSubmissionCard />
            </List>

          </Card>
        </Grid>
        </Grid>


    </Layout>
  );
}

export default taskHistory;