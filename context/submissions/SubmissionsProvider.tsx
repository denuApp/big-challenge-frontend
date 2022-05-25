import { FC, useEffect, useReducer } from "react";
import { SubmissionsContext, submissionsReducer } from "./";
import { ISubmission } from "../../interfaces/submission";
import bigApi from "../../config/headers";
import axios from "axios";
import { IUser } from "../../interfaces/user";

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

  const getUser = async (): Promise<IUser> => {
    const { data } = await bigApi().get("get-user");
    return data;
  };

  const addNewSubmission = async (
    symptoms: string
  ): Promise<{ hasError: boolean; message?: string }> => {
    try {
      //ver como hacer con axios?
      const user = await getUser();
      const { data } = await bigApi().post("store-submissions", {
        patient_id: user.id,
        symptoms: symptoms,
      });
      dispatch({ type: "[Submission] Add-Submission", payload: data });
      return {
        hasError: false,
      };
    } catch (error) {
      // if (axios.isAxiosError(error)) {
      //   return {
      //     hasError: true,
      //     message: error.message,
      //   };
      // }

      return {
        hasError: true,
        message: "No se pudo crear el usuario - intente de nuevo",
      };
    }
  };

  const updateSubmission = async (
    submission: ISubmission,
    symptoms: string
  ): Promise<boolean> => {
    try {
      //ver como hacer con axios?
      const { data } = await bigApi().post("edit-submission/" + submission.id, {
        symptoms: symptoms,
      });
      dispatch({ type: "[Submission] Submission-Updated", payload: data });
      return true;
    } catch (error) {
      return false;
    }
  };

  const deleteSubmission = async (
    submission: ISubmission
  ): Promise<boolean> => {
    try {
      //ver como hacer con axios?
      const { data } = await bigApi().post(
        "delete-submission/" + submission.id
      );
      dispatch({ type: "[Submission] Submission-Deleted", payload: data });
      return true;
    } catch (error) {
      return false;
    }
  };

  const takeSubmission = async (submission: ISubmission): Promise<boolean> => {
    try {
      //ver como hacer con axios?
      const doctor = await getUser();
      const { data } = await bigApi().post("take-submission/" + submission.id, {
        doctor_id: doctor.id,
      });
      dispatch({ type: "[Submission] Submission-Taken", payload: data });

      return true;
    } catch (error) {
      return false;
    }
  };

  const uploadPrescription = async (
    submission: ISubmission,
    file: File
  ): Promise<boolean> => {
    try {
      const { data } = await bigApi().post("upload-file/" + submission.id, {
        prescription: file,
      });
      dispatch({
        type: "[Submission] Submission-Upload-Prescription",
        payload: data,
      });

      return true;
    } catch (error) {
      return false;
    }
  };

//hacer get submissions por docotr y esas cosas

  // const refreshSubmissions = async () => {
  //   const { data } = await bigApi().get<ISubmission[]>("/submissions");
  //   dispatch({ type: "[Submission] Refresh-Data", payload: data });
  // };

  // useEffect(() => {
  //   refreshSubmissions();
  // }, []);

  return (
    <SubmissionsContext.Provider
      value={{
        ...state,
        addNewSubmission,
        updateSubmission,
        deleteSubmission,
        takeSubmission,
        uploadPrescription,
      }}
    >
      {children}
    </SubmissionsContext.Provider>
  );
};
