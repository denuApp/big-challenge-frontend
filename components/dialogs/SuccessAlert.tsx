import { Snackbar, Alert } from "@mui/material"
import { FC } from "react";

interface Props {
    message: string;
    open: boolean;
    setOpen: (open: boolean) => void;
}

export const SuccessAlert: FC<Props>= ({message, open, setOpen}) => {

    const onClose = () => {
        setOpen(false);
    }

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
        <Alert
        onClose={onClose}
        severity="success"
        sx={{ width: "100%" }}
        >
        {message}
        </Alert>
    </Snackbar>
)
}
