import React from "react";
import { Layout } from "../../components/layouts";
import {
  Card,
  CardHeader,
  Grid,
  Typography,
  MenuItem,
  List,
} from "@mui/material";
import {
  PrescriptedSubmissions,
  TakenDoctorSubmissionCard,
} from "../../components/submissions";
import SubmissionService from "../../services/SubmissionsService";
import { useState, useEffect } from "react";
import { ISubmission } from "../../interfaces/submission";
import Unauthorized from "../../components/error/Unauthorized";
import { IUser } from "../../interfaces";
import UserService from "../../services/UsersService";
import { useRouter } from "next/router";
import { Navigate } from "react-router-dom";

const taskHistory = () => {
  const { getTakenSubmissionsByStatus } = new SubmissionService();
  const [inProgress, setInProgress] = useState<ISubmission[]>([]);
  const [ready, setReady] = useState<ISubmission[]>([]);
  const [uploaded, setUploaded] = useState(false);
  const [checked, setChecked] = useState(false);
  const router = useRouter();
  const { getUser } = new UserService();

  const checkAuthorized = async () => {
    const { user } = await getUser();

    if (!user) {
      router.push("/auth/login");
    } else if (user.role[0].name === "doctor") {
      setChecked(true);
    }
  };

  const getCurrentSubmissions = async (status: string) => {
    const { submissions } = await getTakenSubmissionsByStatus(status);
    if (status === "in_progress") {
      setInProgress(submissions);
    }
    if (status === "ready") {
      setReady(submissions);
    }
    setUploaded(false);
  };

  useEffect(() => {
    checkAuthorized();

    getCurrentSubmissions("in_progress");
    getCurrentSubmissions("ready");
  }, [uploaded]);

  if (!checked) {
    return <Unauthorized />;
  } else {
    return (
      <Layout>
        <Typography
          variant="h3"
          sx={{ padding: "20px", fontWeight: "bold", letterSpacing: "2px" }}
        >
          TASK HISTORY
        </Typography>

        <Grid
          container
          spacing={2}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "start",
          }}
        >
          <Grid item xs={12} sm={6}>
            <Card sx={{ height: "calc(100vh - 100px )", borderRadius: "15px" }}>
              <CardHeader
                align="right"
                title="NOT PRESCRIPTED"
                sx={{ padding: "30px" }}
              />
              <List sx={{ overflow: "auto", height: "calc(90vh - 90px )" }}>
                {inProgress.map((submission) => (
                  <TakenDoctorSubmissionCard
                    key={submission.id}
                    submission={submission}
                    setUploaded={setUploaded}
                  />
                ))}
              </List>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Card sx={{ height: "calc(100vh - 100px )", borderRadius: "15px" }}>
              <CardHeader
                align="right"
                title="PRESCRIPTED"
                sx={{ color: "gray", padding: "30px" }}
              />
              <List sx={{ overflow: "auto", height: "calc(90vh - 90px )" }}>
                {ready.map((submission) => (
                  <PrescriptedSubmissions
                    key={submission.id}
                    submission={submission}
                  />
                ))}
              </List>
            </Card>
          </Grid>
        </Grid>
      </Layout>
    );
  }
};

export default taskHistory;
