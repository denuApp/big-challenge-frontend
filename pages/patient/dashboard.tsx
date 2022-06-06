import { Layout } from "../../components/layouts";
import { Button, Card, CardHeader, Grid, Typography } from "@mui/material";
import { NewAlert, NewSubmission } from "../../components/dialogs";
import { useState, useEffect } from "react";
import { SubmissionList } from "../../components/submissions";
import SubmissionService from "../../services/SubmissionsService";
import UserService from "../../services/UsersService";
import { IUser } from "../../interfaces/user";
import Unauthorized from "../../components/error/Unauthorized";
import { useRouter } from "next/router";
import {
  BrowserRouter,
  Navigate,
  Route,
  Router,
  Routes,
  useNavigate,
} from "react-router-dom";
import login from "../auth/login";

const dashboard = () => {
  const [openModal, setOpenModal] = useState(false);
  const [value, setValue] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState<
    "success" | "error" | "warning" | "info"
  >("success");
  const [added, setAdded] = useState(false);
  const [checked, setChecked] = useState(false);

  const router = useRouter();

  const { addNewSubmission } = new SubmissionService();
  const { getUser } = new UserService();

  const OpenAddSubmission = () => {
    setOpenModal(true);
  };

  const CancelAddSubmission = () => {
    setValue("");
    setOpenModal(false);
  };

  const handleAddSubmission = async (symptoms: string) => {
    const { hasError, message } = await addNewSubmission(symptoms);

    if (hasError) {
      setAlertMessage(message);
      setAlertType("error");
      setOpenAlert(true);
    } else {
      setAlertMessage("Submission added successfully");
      setAlertType("success");
      setOpenAlert(true);
      setValue("");
      setOpenModal(false);
      setAdded(true);
    }
  };

  const checkAuthorized = async () => {
    const { user } = await getUser();

    if (!user) {
      router.push("/auth/login");
    } else if (user.role[0].name === "patient") {
      setChecked(true);
    }
  };

  useEffect(() => {
    checkAuthorized();
  }, []);

  if (!checked) {
    return <Unauthorized />;
  } else {
    return (
      <Layout>
        <Grid sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            variant="h3"
            sx={{ padding: "20px", fontWeight: "bold", letterSpacing: "2px" }}
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
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ height: "calc(100vh - 100px )", borderRadius: "15px" }}>
              <CardHeader
                align="right"
                title="PENDING"
                sx={{ padding: "30px", color: "#c62828" }}
              />
              <SubmissionList
                status="pending"
                added={added}
                setAdded={setAdded}
              />
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ height: "calc(100vh - 100px )", borderRadius: "15px" }}>
              <CardHeader
                align="right"
                color="yellow"
                title="IN PROGRESS"
                sx={{ padding: "30px", color: "#fdd835" }}
              />
              <SubmissionList
                status="in_progress"
                added={added}
                setAdded={setAdded}
              />
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ height: "calc(100vh - 100px )", borderRadius: "15px" }}>
              <CardHeader
                align="right"
                color="green"
                title="READY"
                sx={{ padding: "30px", color: "#7cb342" }}
              />
              <SubmissionList
                status="ready"
                added={added}
                setAdded={setAdded}
              />
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
        <NewAlert
          message={alertMessage}
          type={alertType}
          open={openAlert}
          setOpen={setOpenAlert}
        />
      </Layout>
    );
  }
};

export default dashboard;
