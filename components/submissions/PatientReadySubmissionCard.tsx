// import * as React from 'react'
// import { Card, CardActionArea, CardActions, CardContent, CardHeader, IconButtonProps, Typography, IconButton, MenuItem, Dialog, Button } from '@mui/material';
// import { ISubmission } from '../../interfaces/submission';
// import { padding, styled, borderRadius, fontWeight } from '@mui/system';
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
  CardActions,
  Grid,
  Menu,
  MenuItem,
} from "@mui/material";
import { ISubmission } from "../../interfaces";
import { FC, useState } from "react";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

interface Props {
    submission: ISubmission;
    afterDelete: (ISubmission) => void;
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

export const PatientReadySubmissionCard: FC<Props> = ({submission, afterDelete}) =>{
  const [expanded, setExpanded] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  //value('')
  const [value, setValue] =
    useState(submission.symptoms);


  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  
  return (
    <Grid item>
      <Card
        elevation={10}
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
                  <MoreVertIcon  color="secondary"/>
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
              <ExpandMoreIcon color="secondary"/>
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
        
        <MenuItem >Download Prescription </MenuItem>
      </Menu>

    </Grid>
  );
}
