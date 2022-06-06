import bigApi from "../config/headers";
import { ISubmission } from "../interfaces";
import axios from "axios";
import personalInfo from '../pages/patient/personalInfo';
import { IUser } from '../interfaces/user';
import { IPersonalInfo } from '../interfaces/personalInfo';


export default class UserService {

    async getUser (): Promise<{user: IUser}> {
        const user = await bigApi().get("get-user");
        localStorage.setItem('user', JSON.stringify(user.data.data));
        return {user: user.data.data};
    };

    async getPatientInformation (): Promise<{info: IPersonalInfo}> {
        const info = await bigApi().get("get-information");
        return {info: info.data.data[0]};
    }

    async setPatientInfo (patientInfo: Object): Promise<{ hasError: boolean; message?: string }> {
        try {
            await bigApi().post("store-information", {
                ...patientInfo,
            });
            return {
                hasError: false,
            };
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return {
                    hasError: true,
                    message: error.response.data.message,
                };
            }

            return {
                hasError: true,
                message: "The submission could not be added",
            };
        }
    }

    async editPatientInfo (patientInfo: Object, infoId: number): Promise<{ hasError: boolean; message?: string }> {
        try {
            await bigApi().patch("edit-information/" + infoId , {
                ...patientInfo,
            });
            return {
                hasError: false,
            };
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return {
                    hasError: true,
                    message: error.response.data.message,
                };
            }

            return {
                hasError: true,
                message: "The submission could not be added",
            };
        }
    }
}