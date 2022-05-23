
import React from 'react'
import { Layout } from '../../components/layouts';
import { Card, CardHeader, Grid, Typography, MenuItem, List } from '@mui/material';
import { PrescriptedSubmissions, TakenDoctorSubmissionCard  } from '../../components/submissions';


const taskHistory = () => {
 
  return (
    <Layout  >
      
      <Typography variant="h3"  sx={{ padding: '20px', fontWeight: 'bold', letterSpacing: '2px'}}>TASK HISTORY</Typography>

        <Grid container spacing={ 2 } sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'start'}}>

            {/* <TakenDoctorSubmissionCard />
            <TakenDoctorSubmissionCard />
            <TakenDoctorSubmissionCard />
            <TakenDoctorSubmissionCard />

          </Grid> */}

          <Grid item xs={ 12 } sm={ 6 }>
          <Card  sx={{ height: 'calc(100vh - 100px )' , borderRadius: '15px'}}>
          <CardHeader align='right' title="NOT PRESCRIPTED" sx={{ padding: '30px' }}/>
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
            <CardHeader align='right' title="PRESCRIPTED" sx={{ color:'gray', padding: '30px'}}/>

            <List sx={{overflow: 'auto', height: 'calc(90vh - 90px )'}}>
                <PrescriptedSubmissions />
                <PrescriptedSubmissions />
                <PrescriptedSubmissions />
            </List>

          </Card>
        </Grid>
        </Grid>


    </Layout>
  );
}

export default taskHistory;