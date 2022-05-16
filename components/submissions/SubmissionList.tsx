import { List, Paper } from '@mui/material';
import React from 'react'
import { ISubmission } from '../../interfaces/submission';
import PatientSubmissionCard from './PatientSubmissionCard';

// interface Props {
//     status: string;
// }

// const SubmissionList = ({status}) => {

const SubmissionList = () => {
    // const { entries, updateEntry } = useContext( EntriesContext );

    //usar funcion de backend para obtener las entradas pos estado
    // const entriesByStatus: ISubmission[] = useMemo( () => entries.filter( entry => entry.status === status ), [ entries ]);

    

      
    return (
        //   TODO: aquí haremos drop
        <div>
            {/* <Paper sx={{ height: 'calc(100vh - 180px)', overflow: 'scroll', backgroundColor: 'transparent', padding: '3px 5px'  }}> */}

                <List sx={{overflow: 'auto', height: 'calc(90vh - 90px )'}}> 
                    {/* {
                        entriesByStatus.map( submission => (
                            <SubmissionCard key={ submission.id } submission={ submission } />
                        ))
                    } */}
                    <PatientSubmissionCard />
                    <PatientSubmissionCard />
                    <PatientSubmissionCard />

                </List>

            {/* </Paper> */}
        </div>
    )
}

export default SubmissionList;