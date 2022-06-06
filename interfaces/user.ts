import personalInfo from '../pages/patient/personalInfo';
import { IPersonalInfo } from './personalInfo';


export interface IUser {
    id      : any;
    info     : IPersonalInfo;
    name     : string;
    email    : string;
    role     : string;

    created_at?: string;
    updated_at?: string;
}