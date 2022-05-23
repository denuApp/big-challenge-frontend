
import { Layout } from "../../components/layouts";
import { Button, Card, CardHeader, Grid, Typography } from "@mui/material";
import { NewSubmission } from "../../components/dialogs";
import { useContext, useState } from "react";
import { PatientReadySubmissionCard, SubmissionList } from "../../components/submissions";
import { ISubmission } from "../../interfaces";
import { SubmissionsContext } from '../../context/submissions';


const dashboard = () => {
  const [openModal, setOpenModal] = useState(false);
  const [value, setValue] = useState("");
  const {submissions, addNewSubmission} = useContext(SubmissionsContext);


  const OpenAddSubmission = () => {
    setOpenModal(true);
  };

  // const handleChangeSymptoms = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setValue(event.target.value);
  // };

  const CancelAddSubmission = () => {
    setValue("");
    setOpenModal(false);
  };

  const handleAddSubmission = () => {
    // add submission to database
    addNewSubmission(value);
    setOpenModal(false);
    setValue('');
  };

  return (
    <Layout >
      <Grid sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h3" 
          sx={{ padding: '20px', fontWeight: 'bold', letterSpacing: '2px' }}
        >
          SUBMISSION DASHBOARD
        </Typography>
        <Button
          variant="outlined"
          onClick={OpenAddSubmission}
          color="secondary"
          sx={{ height: 40, marginTop: 3, marginRight: 2 }}
        >
          NEW SUBMISSION
        </Button>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}  >
          <Card sx={{ height: "calc(100vh - 100px )", borderRadius: "15px"  }} >
            <CardHeader align='right' title="PENDING" sx={{ padding: '30px', color: '#c62828' }} />

            <SubmissionList />
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ height: "calc(100vh - 100px )", borderRadius: "15px" }}>
          <CardHeader align='right' color="yellow" title="IN PROGRESS" sx={{ padding: '30px', color: '#fdd835' }} />
            <SubmissionList />
            {/* <EntryList status='in-progress' /> */}
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ height: "calc(100vh - 100px )", borderRadius: "15px" }}>
          <CardHeader align='right' color="green" title="READY" sx={{ padding: '30px', color: '#7cb342' }} />
            <PatientReadySubmissionCard />
            {/* <EntryList status='finished' /> */}
          </Card>
        </Grid>
      </Grid>

      <NewSubmission
        open={openModal}
        value={value}
        setValue={setValue}
        onClose={CancelAddSubmission}
        onSubmit={handleAddSubmission}
      />
    </Layout>
  );
};

export default dashboard;
