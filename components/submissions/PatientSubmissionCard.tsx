// import * as React from 'react'
// import { Card, CardActionArea, CardActions, CardContent, CardHeader, IconButtonProps, Typography, IconButton, MenuItem, Dialog, Button } from '@mui/material';
// import { ISubmission } from '../../interfaces/submission';
// import { padding, styled, borderRadius } from '@mui/system';
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
import Collapse from "@mui/material/Collapse";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Button,
  CardActions,
  CardActionArea,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Menu,
  MenuItem,
  TextField,
} from "@mui/material";
import { NewSubmission } from "../dialogs";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
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

export default function PatientCard() {
  const [expanded, setExpanded] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  //value('')
  const [value, setValue] =
    React.useState(`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
  ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
  aliquip ex ea commodo consequat. Duis aute irure dolor in
  reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
  pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
  culpa qui officia deserunt Lorem ipsum dolor sit amet, consectetur
  adipiscing elit`);


  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAccept = () => {
    setOpenAlert(false);
  };

  const handleCancel = () => {
    setOpenAlert(false);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleDeleteSubmission = () => {
    setOpenAlert(true);
    setAnchorEl(null);
  };

  const handleEditSubmission = () => {
    //setValue(submission.symptoms);
    setAnchorEl(null);
    setOpenEdit(true);
  };

  const handleCancelEdit = () => {
    setOpenEdit(false);
  };

  const handleAcceptEdit = () => {

    //update in database
    console.log(value);
    setOpenEdit(false);
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
                  <MoreVertIcon />
                </IconButton>
              </Grid>
            }
            title="Symptoms"
          />

          <CardContent sx={{ minHeight: 250 }}>
            <Typography>{value}</Typography>

            {/* <CardActionArea>
                <CardContent>
                    <Typography sx={{ whiteSpace: 'pre-line' }}>{ submission.symptoms }</Typography>
                </CardContent>

                <CardActions sx={{ display: 'flex', justifyContent: 'end', paddingRight: 2 }}>
                    <Typography variant='body2'>hace 30 minutos</Typography>
                </CardActions>
            </CardActionArea> */}
          </CardContent>

          {/* expand card */}
          <CardActions disableSpacing>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography variant="h5" sx={{ marginBottom: "10px" }}>
                Doctor:
              </Typography>
              {/* {submission.symptoms && <Typography paragraph>{ submission.doctor }</Typography>} */}
              <Typography paragraph>none</Typography>
            </CardContent>
          </Collapse>
      </Card>

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
        onClose={handleCloseMenu}
      >
        {/* si el estado es ready que no se pueda hacer ninguna edicion */}
        <MenuItem onClick={handleDeleteSubmission}>Delete </MenuItem>
        <MenuItem onClick={handleEditSubmission}>Edit </MenuItem>
      </Menu>

      {/* Alert delete dialog */}
      <Dialog
        open={openAlert}
        onClose={handleCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete this submission?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            By deleting it you wont be able to see it in your dashboard and
            neither will your doctor.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleAccept} autoFocus>
            Accept
          </Button>
        </DialogActions>
      </Dialog>

      {/* edit submission dialog */}

      <NewSubmission title="Edit Submission" open={openEdit} value={value} setValue={setValue} onSubmit={handleAcceptEdit} onClose={handleCancelEdit}/>

    </Grid>
  );
}
