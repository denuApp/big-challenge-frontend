import { createContext } from 'react';
import { ISubmission } from '../../interfaces';

interface ContextProps {
    submissions: ISubmission[];

    addNewSubmission: (symptoms: string) => void;
    updateSubmission: (submission: ISubmission) => void;
    takeSubmission: (submission: ISubmission) => void;
}

export const SubmissionsContext = createContext({} as ContextProps);