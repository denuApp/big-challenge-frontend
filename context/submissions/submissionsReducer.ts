import { SubmissionsState } from './';
import { ISubmission } from '../../interfaces';


type SubmissionActionType = 
   | { type: '[Submission] Add-Submission', payload: ISubmission  } 
   | { type: '[Submission] Submission-Updated', payload: ISubmission  } 
    | { type: '[Submission] Submission-Deleted', payload: ISubmission  }
    | { type: '[Submission] Submission-Taken', payload: ISubmission  }
    | { type: '[Submission] Submission-Upload-Prescription', payload: ISubmission  }
   | { type: '[Submission] Refresh-Data', payload: ISubmission[]  } 


export const submissionsReducer = ( state: SubmissionsState, action: SubmissionActionType ): SubmissionsState => {

   switch (action.type) {
      case '[Submission] Add-Submission':
         return {
            ...state,
            submissions: [ ...state.submissions, action.payload ]
          }

      case '[Submission] Submission-Updated':
          return {
             ...state,
             submissions: state.submissions.map( submission => {
               if ( submission._id === action.payload._id ) {
                  submission.symptoms = action.payload.symptoms;
               }
               return submission;
             })
          }
        case '[Submission] Submission-Deleted':
            return {
                ...state,
                submissions: state.submissions.filter( submission => 
                    
                    submission._id !== action.payload._id)
            }
        case '[Submission] Submission-Taken':
            return {
                ...state,
                submissions: state.submissions.map( submission => {
                    if ( submission._id === action.payload._id ) {
                        submission.state = 'in_progress';
                        submission.doctor_id = action.payload.doctor_id;
                    }
                    return submission;
                })
            }
        case '[Submission] Submission-Upload-Prescription':
            return {
                ...state,
                submissions: state.submissions.map( submission => {
                    if ( submission._id === action.payload._id ) {
                        submission.prescription = action.payload.prescription;
                    }
                    return submission;
                })
            }

      case '[Submission] Refresh-Data':
         return {
            ...state,
            submissions: [ ...action.payload ]
         }

       default:
          return state;
   }

}