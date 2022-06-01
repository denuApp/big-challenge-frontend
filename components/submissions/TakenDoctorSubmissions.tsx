import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Grid,
  Menu,
  MenuItem,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { useState, useRef, FC } from "react";
import { ISubmission } from "../../interfaces/submission";
import SubmissionService from "../../services/SubmissionsService";
import { NewAlert } from "../dialogs";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

interface Props {
  submission: ISubmission;
  setUploaded: (uploaded: boolean) => void;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export const TakenDoctorSubmissionCard: FC<Props> = ({ submission, setUploaded }) => {
  const [expanded, setExpanded] = useState(false);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const [file, setFile] = useState(null);

  const [openAcceptUpload, setOpenAcceptUpload] = useState(false);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState<
    "success" | "error" | "warning" | "info"
  >("success");

  const fileInput = useRef<HTMLInputElement>(null);

  const { uploadPrescription } = new SubmissionService();

  const age = submission.patient.info.birth_date
    ? new Date().getFullYear() -
      new Date(submission.patient.info.birth_date).getFullYear()
    : null;


  const onFileSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files[0];

    if (file) {
      setFile(file);
      setOpenAcceptUpload(true);
    } else {
      return;
    }
  };

  const handleCancelUpload = () => {
    setOpenAcceptUpload(false);
  };

  const handleAcceptUpload = async () => {
    const {hasError} = await uploadPrescription(submission, file);

    if (!hasError) {
      setOpenSnackbar(true);
      setAlertMessage("Prescription uploaded successfully");
      setAlertType("success");
      setOpenAcceptUpload(false);
      setUploaded(true);
    } else {
      setOpenSnackbar(true);
      setAlertMessage("Error uploading prescription");
      setAlertType("error");
      setOpenAcceptUpload(false);
    }
  };


  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Grid item>
      <Card
        elevation={15}
        sx={{
          marginBottom: 2,
          marginLeft: 2,
          marginRight: 2,
          borderRadius: 3,
          minHeight: 350,
        }}
      >
        <CardHeader />
        <CardHeader
          action={
            <Grid>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <MoreVertIcon color="secondary" />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >

                <MenuItem
                  aria-label="file upload "
                  onClick={() => fileInput.current?.click()}
                >
                  Upload Prescription
                </MenuItem>
                <input
                  ref={fileInput}
                  type="file"
                  accept=".txt"
                  style={{ display: "none" }}
                  onChange={onFileSelected}
                />
              </Menu>
            </Grid>
          }
          title={submission.patient.name}
        />

        <CardContent sx={{ minHeight: 250 }}>
          <Typography>{submission.symptoms}</Typography>
        </CardContent>

        <CardActions disableSpacing>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon color="secondary" />
          </ExpandMore>
        </CardActions>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography variant="h5" sx={{ marginBottom: "10px" }}>
              Patient Info:
            </Typography>
            <Typography paragraph>
              Gender: {submission.patient.info.gender}
            </Typography>
            <Typography paragraph>Age: {age}</Typography>
            <Typography paragraph>
              Height: {submission.patient.info.height}mts
            </Typography>
            <Typography paragraph>
              Weight: {submission.patient.info.weight}kg
            </Typography>
            <input
              type="file"
              ref={fileInput}
              accept="image/*"
              style={{ display: "none" }}
            />
          </CardContent>
        </Collapse>

        {/* Alert accept upload dialog */}
        <Dialog
          open={openAcceptUpload}
          onClose={handleCancelUpload}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Upload Prescription"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to upload "{file?.name}" prescription?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancelUpload}>Cancel</Button>
            <Button onClick={handleAcceptUpload} autoFocus>
              Accept
            </Button>
          </DialogActions>
        </Dialog>
      </Card>
      <NewAlert
            open={openSnackbar}
            setOpen={setOpenSnackbar}
            message={alertMessage}
            type={alertType}
          />
    </Grid>
  );
};
