// import * as React from 'react'
// import { Card, CardActionArea, CardActions, CardContent, CardHeader, IconButtonProps, Typography, IconButton } from '@mui/material';
// import { ISubmission } from '../../interfaces/submission';
// import { padding, styled, borderRadius, height } from '@mui/system';
// import CardMedia from '@mui/material/CardMedia';
// import Avatar from '@mui/material/Avatar';
// import { red } from '@mui/material/colors';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import ShareIcon from '@mui/icons-material/Share';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import MoreVertIcon from '@mui/icons-material/MoreVert';

// // interface Props {
// //     submission: ISubmission;
// // }

// interface ExpandMoreProps extends IconButtonProps {
//     expand: boolean;
//   }

//   const ExpandMore = styled((props: ExpandMoreProps) => {
//     const { expand, ...other } = props;
//     return <IconButton {...other} />;
//   })(({ theme, expand }) => ({
//     transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
//     marginLeft: 'auto',
//     transition: theme.transitions.create('transform', {
//       duration: theme.transitions.duration.shortest,
//     }),
//   }));

// // const SubmissionCard:FC<Props> = ({submission}) => {

// const SubmissionCard = () => {
//   return (
//     <Card
//     sx={{ marginBottom: 2, marginLeft: 2, marginRight: 2}}
//     >
// <CardActionArea>
//         <CardContent>
//             <Typography sx={{ whiteSpace: 'pre-line' }}>'Lorem ipsum dolor sit amet, consectetur adipiscing elit,
//             sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
//             quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
//             Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
//             Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
//             </Typography>
//         </CardContent>

//         <CardActions sx={{ display: 'flex', justifyContent: 'end', paddingRight: 2 }}>
//             <Typography variant='body2'>hace 30 minutos</Typography>
//         </CardActions>
//     </CardActionArea>
//     {/* <CardActionArea>
//         <CardContent>
//             <Typography sx={{ whiteSpace: 'pre-line' }}>{ submission.symptoms }</Typography>
//         </CardContent>

//         <CardActions sx={{ display: 'flex', justifyContent: 'end', paddingRight: 2 }}>
//             <Typography variant='body2'>hace 30 minutos</Typography>
//         </CardActions>
//     </CardActionArea> */}
// </Card>
//   )
// }

// export default SubmissionCard;

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
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Menu, MenuItem } from "@mui/material";
import { useState, FC } from 'react';
import { ISubmission } from "../../interfaces";
import SubmissionService from "../../services/SubmissionsService";
import { NewAlert } from "../dialogs";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

interface Props {
  submission: ISubmission;
  afterTake: (ISubmission) => void;
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

export const DoctorSubmissionCard: FC<Props> = ({submission, afterTake}) => {
  const [expanded, setExpanded] = useState(false);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const [openAlert, setOpenAlert] = useState(false);

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const [alertMessage, setAlertMessage] = useState("");

  const [alertType, setAlertType] = useState<"success" | "error" | "warning" | "info">('success');

  const { takeSubmission } = new SubmissionService();

  const age = submission.patient.info.birth_date ? new Date().getFullYear() - new Date(submission.patient.info.birth_date).getFullYear() : null;


  const handleTakeSubmission = () => {
    setOpenAlert(true);
  }

  const handleCancelTake = () => {
    setOpenAlert(false);
  }

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleAcceptTake =  () => {
    const taken =  takeSubmission(submission);
    if(taken) {
      afterTake(submission);
      handleClose();
      handleCancelTake();
      setOpenSnackbar(true);
      setAlertMessage('Submission taken successfully');
      setAlertType('success');
    }else{
      setOpenSnackbar(true);
      setAlertMessage('Error taking submission');
      setAlertType('error');
    }
  };

  return (
    <Grid item xs={12} sm={6} md={6} lg={4}>
      <Card 
        elevation={10}
        sx={{ marginBottom: 2, marginLeft: 2, marginRight: 2, borderRadius: 3 }}
      >
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
                <MoreVertIcon color="secondary"/>
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
                <MenuItem onClick={handleTakeSubmission}>Take Submission</MenuItem>
              </Menu>
            </Grid>
          }
          title={submission.patient.name}
        />

        <CardContent sx={{ minHeight: 250 }}>
          <Typography> {submission.symptoms} </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon color="secondary"/>
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography variant="h5" sx={{ marginBottom: "10px" }}>
              Patient Info:
            </Typography>
            <Typography paragraph>Gender: {submission.patient.info.gender}</Typography>
            <Typography paragraph>Age: {age}</Typography>
            <Typography paragraph>Height: {submission.patient.info.height}mts</Typography>
            <Typography paragraph>Weight: {submission.patient.info.weight}kg</Typography>
          </CardContent>
        </Collapse>

         {/* Alert take dialog */}
      <Dialog
        open={openAlert}
        onClose={handleCancelTake}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete this submission?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to take {submission.patient.name}'s submission?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelTake}>Cancel</Button>
          <Button onClick={handleAcceptTake} autoFocus>
            Accept
          </Button>
        </DialogActions>
      </Dialog>

      <NewAlert open={openSnackbar} setOpen={setOpenSnackbar} message={alertMessage} type={alertType} />

      </Card>
    </Grid>
  );
}
