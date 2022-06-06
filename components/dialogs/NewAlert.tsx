import { Snackbar, Alert } from "@mui/material"
import { FC } from "react";

interface Props {
    message: string;
    type: "success" | "error" | "warning" | "info";
    open: boolean;
    setOpen: (open: boolean) => void;
}

export const NewAlert: FC<Props>= ({message, type, open, setOpen}) => {

    const onClose = () => {
        setOpen(false);
    }

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
        <Alert
        onClose={onClose}
        severity={type}
        sx={{ width: "100%" }}
        >
        {message}
        </Alert>
    </Snackbar>
)
}
