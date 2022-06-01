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

              await bigApi().post("store-submissions", {
                patient_id: currentUser.id,
                symptoms: symptoms,
              });
              return {
                hasError: false,
              };
            

        } catch (error) {
          if (axios.isAxiosError(error)) {
            return {
              hasError: true,
              message: error.response.data.message + '. Check if your personal information is complete.',
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

      async downloadPrescription (submission: ISubmission): Promise<{prescription?: any; hasError: boolean }> {
        try{
          const { data } = await bigApi().get('download-file/' + submission.id);
          return {  prescription: data,
                    hasError: false
          };
        }
        catch (error) {
          return {
            hasError: true,
          };
        }
      }

      async uploadPrescription (submission: ISubmission, file: File): Promise<{hasError: boolean}>  {

        // const fd = new FormData();
        // fd.append('prescription', file);
        try{
          console.log(file);
          await bigApi().post('upload-file/' + submission.id , {prescription: file} ,{headers: {'Content-Type': 'multipart/form-data'}});
         
          return {hasError: false};
        } catch (error) {
          return {hasError: true};
        }
      }
}