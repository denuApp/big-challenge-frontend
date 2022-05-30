
import React from 'react'
import { Layout } from '../../components/layouts';
import { Card, CardHeader, Grid, Typography, MenuItem } from '@mui/material';
import { borderRadius, fontWeight, height } from '@mui/system';
import { grey, red } from '@mui/material/colors';
import { DoctorSubmissionCard } from '../../components/submissions';
import SubmissionsService from '../../services/SubmissionsService';
import { ISubmission } from '../../interfaces/submission';
import { useState, useEffect } from 'react';

const allSumbissions = () => {
  const { getPendingSubmissions } = new SubmissionsService();
  const [submissions, setSubmissions] = useState<ISubmission[]>([]);

  const getCurrentSubmissions = async () => {
    const { submissions } = await getPendingSubmissions();
    setSubmissions(submissions);
  };

  const afterTake = (taken: ISubmission) => {
    const subs = submissions.filter( submission => 
    submission.id !== taken.id);
    console.log(taken);
    console.log(subs);
    setSubmissions(subs);
  }

  useEffect(() => {
    getCurrentSubmissions();
  }, []);
 
  return (
    <Layout>
      
      <Typography variant="h3" sx={{ padding: '20px', fontWeight: 'bold', letterSpacing: '2px' }}>SUBMISSION DASHBOARD</Typography>

        <Grid container spacing={ 2 } sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'start'}}>

          {submissions.map((submission) => (
            <DoctorSubmissionCard key={submission.id} submission={submission} afterTake={afterTake}/>
          ))}

          </Grid>


    </Layout>
  );
}

export default allSumbissions;