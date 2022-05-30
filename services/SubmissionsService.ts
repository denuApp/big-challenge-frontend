import bigApi from "../config/headers";
import { ISubmission } from "../interfaces";
import axios from "axios";
import personalInfo from '../pages/patient/personalInfo';


export default class SubmissionService {

    async getSubmissionsByStatus(status:string):Promise<{submissions: ISubmission[]}>{
        const { data } = await bigApi().get('get-submissions/?status=' + status);
        return {submissions: data.data};
    }

    async getTakenSubmissionsByStatus(status:string):Promise<{submissions: ISubmission[]}>{
      const { data } = await bigApi().get('get-taken-submissions/?status=' + status);
      return {submissions: data.data};
  }

    async getPendingSubmissions():Promise<{submissions: ISubmission[]}>{
      const { data } = await bigApi().get('get-pending-submissions');
      return {submissions: data.data};
    }

    async addNewSubmission(
        symptoms: string
      ): Promise<{ hasError: boolean; message?: string }>{
        try {
          //ver como hacer con axios?
           const currentUser = JSON.parse(localStorage.getItem('user'));
    
           if(currentUser.personalInfo != null){
              await bigApi().post("store-submissions", {
                patient_id: currentUser.id,
                symptoms: symptoms,
              });
              return {
                hasError: false,
              };
            }else{
              return {
                hasError: true,
                message: 'You must complete your personal information before submitting a new submission.',
              }
            }

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
      };

      async updateSubmission (submission: ISubmission, symptoms: string): Promise<boolean> {
        try {
          //ver como hacer con axios?
            bigApi().patch('edit-submission/' + submission.id , { symptoms });
          return true;
        } catch (error) {
          return false;
        }
    }

    async deleteSubmission (submission: ISubmission): Promise<boolean> {

        try{
          //ver como hacer con axios?
           bigApi().delete('delete-submission/' + submission.id);
          return true;
        } catch (error) {
          return false;
        }
      
      }

      async takeSubmission (submission: ISubmission): Promise<boolean> {

        try{
          await bigApi().patch('take-submission/' + submission.id);
      
          return true;
        } catch (error) {
          return false;
      
        }
      }

      async uploadPrescription (submission: ISubmission, file: File): Promise<boolean>  {

        try{
      
          await bigApi().post('upload-prescription/' + submission.id , {file});
      
          return true;
        } catch (error) {
          return false;
        }
      }
}