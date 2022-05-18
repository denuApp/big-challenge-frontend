import React from "react";
import { Layout } from "../../components/layouts";
import {
  Button,
  Card,
  CardHeader,
  Grid,
  Typography,
} from "@mui/material";
import SubmissionList from "../../components/submissions/SubmissionList";
import { NewSubmission } from "../../components/dialogs";

const patientDashboard = () => {
  const [openModal, setOpenModal] = React.useState(false);
  const [value, setValue] = React.useState("");

  const OpenAddSubmission = () => {
    setOpenModal(true);
  };

  const handleChangeSymptoms = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const CancelAddSubmission = () => {
    setValue("");
    setOpenModal(false);
  };

  const handleAddSubmission = () => {
    // add submission to database
    setOpenModal(false);
    setValue("");
  };

  const menuItemsGeneral = [{ text: "Log Out", href: "/auth/login" }];

  const menuItemsPatient = [
    { text: "Dashboard", href: "/patient" },
    { text: "Personal Info", href: "/auth/login" },
  ];

  return (
    <Layout menuItems={menuItemsPatient} menuItemsGeneral={menuItemsGeneral}>
      <Grid sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h4"
          sx={{ padding: "20px", fontWeight: "semi-bold" }}
        >
          Submission Dashboard:
        </Typography>
          <Button
            variant="outlined"
            onClick={OpenAddSubmission}
            sx={{ height: 40, marginTop: 2, marginRight: 2 }}
          >
            NEW SUBMISSION
          </Button>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: "calc(100vh - 100px )", borderRadius: "15px" }}>
            <CardHeader title="Pending" sx={{ color: "gray" }} />

            <SubmissionList />
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card sx={{ height: "calc(100vh - 100px )", borderRadius: "15px" }}>
            <CardHeader title="In Progress" sx={{ color: "gray" }} />
            <SubmissionList />
            {/* <EntryList status='in-progress' /> */}
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card sx={{ height: "calc(100vh - 100px )", borderRadius: "15px" }}>
            <CardHeader title="Ready" sx={{ color: "gray" }} />
            <SubmissionList />
            {/* <EntryList status='finished' /> */}
          </Card>
        </Grid>
      </Grid>

      <NewSubmission open={openModal} value={value} setValue={setValue} onClose={CancelAddSubmission} onSubmit={handleAddSubmission} />

    </Layout>
  );
};

export default patientDashboard;
