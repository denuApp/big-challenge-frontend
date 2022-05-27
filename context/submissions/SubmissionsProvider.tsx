import { FC, useEffect, useReducer } from "react";
import { SubmissionsContext, submissionsReducer } from "./";
import { ISubmission } from "../../interfaces/submission";
import bigApi from "../../config/headers";
import { IUser } from "../../interfaces";
import axios from 'axios';

export interface SubmissionsState {
  submissions: ISubmission[];
}

interface SubmissionsProviderProps {
  children: React.ReactNode;
}

const Submission_INITIAL_STATE: SubmissionsState = {
  submissions: [],
};

export const SubmissionsProvider: FC<SubmissionsProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(
    submissionsReducer,
    Submission_INITIAL_STATE
  );
  

  // const addNewSubmission = async (
  //   symptoms: string
  // ): Promise<{ hasError: boolean; message?: string }> => {
  //   try {
  //     //ver como hacer con axios?
  //      const currentUser = JSON.parse(localStorage.getItem('user'));

  //     const { data } = await bigApi().post("store-submissions", {
  //       patient_id: currentUser.id,
  //       symptoms: symptoms,
  //     });
  //     dispatch({ type: "[Submission] Add-Submission", payload: data });
  //     return {
  //       hasError: false,
  //     };
  //   } catch (error) {
  //     if (axios.isAxiosError(error)) {
  //       return {
  //         hasError: true,
  //         message: error.response.data.message,
  //       };
  //     }

  //     return {
  //       hasError: true,
  //       message: "The submission could not be added",
  //     };
  //   }
  // };

// const updateSubmission = async(submission: ISubmission, symptoms: string): Promise<boolean> => {
//     try {
//       //ver como hacer con axios?
//       const { data } = await bigApi().post('/patient/update-submission/submission_id', { symptoms });
//       dispatch({ type: '[Submission] Submission-Updated', payload: data });
//       return true;
//     } catch (error) {
//       return false;
//     }
// }

// const deleteSubmission = async(submission: ISubmission): Promise<boolean>  => {

//   try{
//     //ver como hacer con axios?
//     const { data } = await bigApi().post('/patient/delete-submission', { submission });
//     dispatch({ type: '[Submission] Submission-Deleted', payload: data });
//     return true;
//   } catch (error) {
//     return false;
//   }

// }

const takeSubmission = async(submission: ISubmission): Promise<boolean>  => {

  try{
    //ver como hacer con axios?
    const { data } = await bigApi().post('/patient/take-submission', { submission });
    dispatch({ type: '[Submission] Submission-Taken', payload: data });

  //hacer get submissions por docotr y esas cosas

    return true;
  } catch (error) {
    return false;

  }
}

const uploadPrescription = async(submission: ISubmission, file: File): Promise<boolean>  => {

  try{

    const { data } = await bigApi().post('/patient/upload-prescription/{submissions._id}', file);
    dispatch({ type: '[Submission] Submission-Upload-Prescription', payload: data });

    return true;
  } catch (error) {
    return false;
  }
}



const refreshSubmissions = async( ) => {
  const { data } = await bigApi().get('get-submissions');
  dispatch({ type: '[Submission] Refresh-Data', payload: data });
}

// useEffect(() => {
//   refreshSubmissions();
// }, []);

  return (
    <SubmissionsContext.Provider
      value={{
        ...state,
        // addNewSubmission,
        // updateSubmission,
        // deleteSubmission,
        takeSubmission,
        uploadPrescription,
        // getSubmissionsByStatus,
      }}
    >
      {children}
    </SubmissionsContext.Provider>
  );
};
