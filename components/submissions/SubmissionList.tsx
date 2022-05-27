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
  // submissions: ISubmission[];
}

// const SubmissionList = ({status}) => {

export const SubmissionList: FC<Props> = ({ status, added, setAdded }) => {
  const { getSubmissionsByStatus } = new SubmissionService();
  const [submissions, setSubmissions] = useState<ISubmission[]>([]);

  // const submissionsByStatus = useMemo( () => submissions.filter( submission => submission.status === status ), [ submissions ]);

  const getCurrentSubmissions = async () => {
    const { submissions } = await getSubmissionsByStatus(status);
    setSubmissions(submissions);
    console.log(submissions);
    setAdded(false);

  };

  const afterDelete = (deleted: ISubmission) => {
    console.log(submissions);
    const subs = submissions.filter( submission => 
    submission.id !== deleted.id);
    console.log(subs);
    console.log(deleted);
    setSubmissions(subs);
  }

  useEffect(() => {
    getCurrentSubmissions();
  }, [added]);

  return (
    //   TODO: aquí haremos drop
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

      {/* </Paper> */}
    </div>
  );
};
