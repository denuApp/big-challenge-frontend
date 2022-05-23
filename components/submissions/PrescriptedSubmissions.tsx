import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Grid, Menu, MenuItem, Button } from "@mui/material";
import { display } from "@mui/system";
import { useState } from "react";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import Head from "next/head";
import { Download } from "@mui/icons-material";

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

export const PrescriptedSubmissions = () => {
  const [expanded, setExpanded] = React.useState(false);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const [image, setImage] = useState(null);
  const [createObjectURL, setCreateObjectURL] = useState(null);

  const fileInput = React.useRef(null);

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

  const handleUpload = () => {
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

                <MenuItem onClick={handleUpload} aria-label="file upload ">
                  Edit Prescription
                </MenuItem>
                <MenuItem aria-label="file upload ">
                  Download Prescription
                </MenuItem>
              </Menu>
            </Grid>
          }
          title="John Doe"
        />

        <CardContent sx={{ minHeight: 250 }}>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt Lorem ipsum dolor sit amet, consectetur
            adipiscing elit,
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
            <Typography paragraph>Gender: Male</Typography>
            <Typography paragraph>Age: 30</Typography>
            <Typography paragraph>Height: 5'10"</Typography>
            <Typography paragraph>Weight: 150lbs</Typography>
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
