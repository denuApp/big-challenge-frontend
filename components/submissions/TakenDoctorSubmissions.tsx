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
import { Grid, Menu, MenuItem } from "@mui/material";
import { useState, useRef, FC } from "react";
import { ISubmission } from '../../interfaces/submission';
import SubmissionService from '../../services/SubmissionsService';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

interface Props {
  submission: ISubmission;
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

export const TakenDoctorSubmissionCard: FC<Props> = ({submission}) => {
  const [expanded, setExpanded] = useState(false);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const [image, setImage] = useState(null);
  const [createObjectURL, setCreateObjectURL] = useState(null);

  const fileInput = useRef(null);

  const { uploadPrescription } = new SubmissionService();

  const age = submission.patient.info.birth_date ? new Date().getFullYear() - new Date(submission.patient.info.birth_date).getFullYear() : null;


  const uploadToServer = async (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];

      setImage(i);
      setCreateObjectURL(URL.createObjectURL(i));

      //   const body = new FormData();
      //   body.append("file", image);
      //   const response = await fetch("/api/upload-file", {
      //     method: "POST",
      //     body
      //   });
    }
  };

  const handleClick = () => {
    // fileInput.current.click();
    const client = filestack.init("Aej2qZqQQQWyQQQQQQQQQ");
    client.picker().open();
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
                <input
                  type="file"
                  ref={fileInput}
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={uploadToServer}
                />

                <MenuItem onClick={handleClick} aria-label="file upload ">
                  Upload Prescription
                </MenuItem>
              </Menu>
            </Grid>
          }
          title={submission.patient.name}
        />

        <CardContent sx={{ minHeight: 250 }}>
          <Typography>
           {submission.symptoms}
          </Typography>

        
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
            <input
              type="file"
              ref={fileInput}
              accept="image/*"
              style={{ display: "none" }}
            />
          </CardContent>
        </Collapse>
      </Card>
    </Grid>
  );
}
