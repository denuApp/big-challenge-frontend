import { CardActionArea, List, Paper } from "@mui/material";
import React, { FC, useMemo } from "react";
import { SubmissionsContext } from "../../context/submissions";
import { ISubmission } from "../../interfaces/submission";
import { PatientReadySubmissionCard } from "./PatientReadySubmissionCard";
import { PatientCard } from "./PatientSubmissionCard";
import { useContext, useEffect, useState } from "react";
import SubmissionService from "../../services/SubmissionsService";

interface Props {
  status: string;
  added?: boolean;
  setAdded?: (added: boolean) => void;
}


export const SubmissionList: FC<Props> = ({ status, added, setAdded }) => {
  const { getSubmissionsByStatus } = new SubmissionService();
  const [submissions, setSubmissions] = useState<ISubmission[]>([]);


  const getCurrentSubmissions = async () => {
    const { submissions } = await getSubmissionsByStatus(status);
    setSubmissions(submissions);
    setAdded(false);

  };

  const afterDelete = (deleted: ISubmission) => {
    const subs = submissions.filter( submission => 
    submission.id !== deleted.id);
    setSubmissions(subs);
  }

  useEffect(() => {
    getCurrentSubmissions();
  }, []);

  return (
    <div>
      <List sx={{ overflow: "auto", height: "calc(90vh - 90px )" }}>
        <>
          {submissions.map((submission) =>
            submission.status === "ready" ? (
              <PatientReadySubmissionCard key={submission.id} submission={submission} afterDelete={afterDelete} />
            ) : (
              <PatientCard key={submission.id} submission={submission} afterDelete={afterDelete}/>
            )
          )}
          
        </>
      </List>

    </div>
  );
};
