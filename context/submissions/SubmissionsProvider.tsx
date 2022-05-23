import { FC, useEffect, useReducer } from "react";
import { SubmissionsContext, submissionsReducer } from "./";
import { ISubmission } from "../../interfaces/submission";

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

const addNewSubmission = async(symptoms: string): Promise<{hasError: boolean; message?: string}>  => {
    try {
        //ver como hacer con axios?
        const { data } = await api.post('/patient/add-submission', { symptoms });
        dispatch({ type: '[Submission] Add-Submission', payload: data });
        return {
            hasError: false
        }

    } catch (error) {
        if ( axios.isAxiosError(error) ) {
            return {
                hasError: true,
                message: error.response?.data.message
            }
        }

        return {
            hasError: true,
            message: 'No se pudo crear el usuario - intente de nuevo'
        }
    }
}

const updateSubmission = async(submission: ISubmission, symptoms: string): Promise<boolean> => {
    try {
      //ver como hacer con axios?
      const { data } = await api.post('/patient/update-submission/submission_id', { symptoms });
      dispatch({ type: '[Submission] Submission-Updated', payload: data });
      return true;
    } catch (error) {
      return false;
    }
}

const deleteSubmission = async(submission: ISubmission): Promise<boolean>  => {

  try{
    //ver como hacer con axios?
    const { data } = await api.post('/patient/delete-submission', { submission });
    dispatch({ type: '[Submission] Submission-Deleted', payload: data });
    return true;
  } catch (error) {
    return false;
  }

}

const takeSubmission = async(submission: ISubmission): Promise<boolean>  => {

  try{
    //ver como hacer con axios?
    const { data } = await api.post('/patient/take-submission', { submission });
    dispatch({ type: '[Submission] Submission-Taken', payload: data });

    return true;
  } catch (error) {
    return false;

  }
}

const uploadPrescription = async(submission: ISubmission, file: File): Promise<boolean>  => {

  try{

    const { data } = await api.post('/patient/upload-prescription/{submissions._id}', file);
    dispatch({ type: '[Submission] Submission-Upload-Prescription', payload: data });

    return true;
  } catch (error) {
    return false;
  }
}

const refreshSubmissions = async() => {
  const { data } = await api.get<ISubmission[]>('/submissions');
  dispatch({ type: '[Submission] Refresh-Data', payload: data });
}

useEffect(() => {
refreshSubmissions();
}, []);

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
