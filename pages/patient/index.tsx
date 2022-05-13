import React from 'react'
import { Layout } from '../../components/layouts';
import { Card, CardHeader, Grid, Typography } from '@mui/material';
import { borderRadius, fontWeight, height } from '@mui/system';
import SubmissionList from '../../components/submissions/SubmissionList';
import { grey, red } from '@mui/material/colors';

const patientDashboard = () => {

  const menuItemsGeneral = [
    {text: 'Log Out', href: '/auth/login'}];

  const menuItemsPatient = [{text: 'Dashboard', href: '/patient'}, {text: 'Personal Info', href: '/auth/login'}];

  return (
    <Layout menuItems={menuItemsPatient} menuItemsGeneral={menuItemsGeneral} >
      
      <Typography variant="h4" sx={{ padding: '20px', fontWeight: 'semi-bold' }}>Submission Dashboard:</Typography>
      
      <Grid container spacing={ 2 }>

        <Grid item xs={ 12 } sm={ 4 }>
          <Card   sx={{ height: 'calc(100vh - 100px )', borderRadius: '15px'}}>
            <CardHeader  title="Pending" sx={{ color:'gray' }}/>

            <SubmissionList />
            {/* Agregar una nueva entrada */}
            {/* Listado de las entradas */}
            {/* <NewEntry />
            <EntryList status='pending'/> */}



          </Card>
        </Grid>

        <Grid item xs={ 12 } sm={ 4 }>
          <Card  sx={{ height: 'calc(100vh - 100px )' , borderRadius: '15px'}}>
            <CardHeader title="In Progress" sx={{ color:'gray' }} />
            <SubmissionList />
            {/* <EntryList status='in-progress' /> */}
          </Card>
        </Grid>

        <Grid item xs={ 12 } sm={ 4 }>
          <Card  sx={{ height: 'calc(100vh - 100px )', borderRadius: '15px' }}> 
            <CardHeader title="Ready" sx={{ color:'gray' }}/>
            <SubmissionList />
            {/* <EntryList status='finished' /> */}
          </Card>
        </Grid>


      </Grid>

    </Layout>
  )
}

export default patientDashboard;