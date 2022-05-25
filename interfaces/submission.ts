import { IUser } from './user';
export interface ISubmission {
    id      : any;
    patient: IUser;
    doctor?: IUser;
    symptoms    : string;
    prescription?: string;
    status     : string;

    created_at?: string;
    updated_at?: string;
}