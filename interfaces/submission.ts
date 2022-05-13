export interface ISubmission {
    _id      : string;
    patient_id: string;
    doctor_id?: string;
    symptoms    : string;
    prescription?: string;
    status     : string;

    createdAt?: string;
    updatedAt?: string;
}