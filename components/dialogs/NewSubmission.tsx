import React, { FC } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';

interface Props {
    title?: string,
    value?: string,
    setValue?: (value: string) => void,
    open?: boolean,
    onClose?: () => void,
    onSubmit?: () => void,
}

export const NewSubmission:FC<Props> = ({title='Add new Submission', value, setValue, open,onClose, onSubmit }) => {
    const [symptom, setSymptom] = React.useState(value);

    const handleChangeSymptoms = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSymptom(event.target.value);
    };

    const handelSubmit = () => {
        setValue(symptom);
        onSubmit();
    }

  return (
    <Dialog open={open} onClose={onClose}>
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>
      <DialogContentText>
       Be suere that your personal data is filled before making a submission.
      </DialogContentText>
      <TextField
        multiline
        margin="dense"
        id="symptoms"
        label="Symptoms"
        type="text"
        rows={4}
        value={symptom}
        onChange={handleChangeSymptoms}
        fullWidth
        variant="standard"
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Cancel</Button>
      <Button onClick={handelSubmit}>Submit</Button>
    </DialogActions>
  </Dialog>
  )
}
