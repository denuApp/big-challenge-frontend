import { createContext } from 'react';
import { ISubmission } from '../../interfaces';

interface ContextProps {
    submissions: ISubmission[];

    addNewSubmission: (symptoms: string) => void;
    updateSubmission: (submission: ISubmission, symptoms:string) => void;
    deleteSubmission: (submission: ISubmission) => void;
    takeSubmission: (submission: ISubmission) => void;
    uploadPrescription: (submission: ISubmission, file: File) => void;

}

export const SubmissionsContext = createContext({} as ContextProps);