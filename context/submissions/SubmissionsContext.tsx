import { createContext } from 'react';
import { ISubmission } from '../../interfaces';

interface ContextProps {
    submissions: ISubmission[];

    // addNewSubmission: (symptoms: string) => Promise<{ hasError: boolean; message?: string }> ;
    // updateSubmission: (submission: ISubmission, symptoms:string) => void;
    // deleteSubmission: (submission: ISubmission) => void;
    takeSubmission: (submission: ISubmission) => void;
    uploadPrescription: (submission: ISubmission, file: File) => void;
    // getSubmissionsByStatus: (status: string) => Promise<{submissions: ISubmission[]}>;

}

export const SubmissionsContext = createContext({} as ContextProps);