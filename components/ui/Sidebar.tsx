import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { useContext, useState } from 'react';
import { UIContext } from "../../context/ui/UIContext";
import { useRouter } from "next/router";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import PendingActionsOutlinedIcon from "@mui/icons-material/PendingActionsOutlined";
import { AuthContext } from "../../context/auth";

const style = "text.secondary";



export const Sidebar = () => {
  const { sidemenuOpen, closeSideMenu } = useContext(UIContext);
  const { asPath } = useRouter();
  const {logout}  = useContext(AuthContext);
  const [openAlert, setOpenAlert] = useState(false);
  const router = useRouter();

  const loggedOut = [
    { text: "Log In", 
      href: "/auth/login", 
      icon: <LoginOutlinedIcon />,
      activeIcon: <LoginOutlinedIcon color="secondary"/> 
  },
    {
      text: "Sign Up",
      href: "/auth/signup",
      icon: <PersonOutlineOutlinedIcon />,
      activeIcon: <PersonOutlineOutlinedIcon color="secondary"/>,
    },
  ];
  
  const loggedIn = [
    { text: "Log Out", 
    href: "/auth/login", 
    icon: <LogoutOutlinedIcon />,
    activeIcon: <LogoutOutlinedIcon color="secondary"/> 

},
  ];
  
  const patient = [
    {
      text: "Dashboard",
      href: "/patient/dashboard",
      icon: <GridViewOutlinedIcon />,
      activeIcon: <GridViewOutlinedIcon color="secondary"/>,
    },
    {
      text: "Personal Info",
      href: "/patient/personalInfo",
      icon: <PersonOutlineOutlinedIcon />,
      activeIcon: <PersonOutlineOutlinedIcon color="secondary"/>,
    },
  ];
  
  const doctor = [
    {
      text: "All submissions",
      href: "/doctor/allSubmissions",
      icon: <GridViewOutlinedIcon />,
      activeIcon: <GridViewOutlinedIcon color="secondary" />,
    },
    {
      text: "Taken submission",
      href: "/doctor/taskHistory",
      icon: <PendingActionsOutlinedIcon />,
      activeIcon: <PendingActionsOutlinedIcon color="secondary"/>,
    },
  ];

  const navigateTo = (url: string) => {
    closeSideMenu();
    router.push(url);
  };

  const handleLogout = () => {
    setOpenAlert(true);
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  const  handleAcceptLogout = () => {
    logout();
    handleCloseAlert();
    closeSideMenu();
  }


  return (
    <Drawer anchor="left" open={sidemenuOpen}  onClose={closeSideMenu} sx={{opacity: 1}}>
      <Box sx={{ width: 250 }}>
        <Box sx={{ padding: "5px 10px" }}>
          <Typography variant="h4" color='secondary'>Menu</Typography>
        </Box>


        <List >
          {(asPath === "/auth/login" || asPath === "/auth/signup") && (
            <>
              {loggedOut.map((item, index) => (
                <ListItem
                  button
                  key={item.text}
                  sx={{borderLeft:  asPath === item.href ? 4 : 0, borderColor: 'secondary.main'}}
                  onClick={() => navigateTo(item.href)}
                >
                  <ListItemIcon >{asPath === item.href ? item.activeIcon : item.icon}</ListItemIcon>
                  <ListItemText sx={{color: asPath === item.href ? style : undefined}}  primary={item.text} />
                </ListItem>
              ))}
            </>
          )}

          {(asPath === "/patient/dashboard" ||
            asPath === "/patient/personalInfo") && (
            <>
              {patient.map((item, index) => (
                <ListItem
                  button
                  key={item.text}
                  sx={{borderLeft:  asPath === item.href ? 4 : 0, borderColor: 'secondary.main'}}
                  onClick={() => navigateTo(item.href)}
                >
                  <ListItemIcon>{asPath === item.href ? item.activeIcon : item.icon}</ListItemIcon>
                  <ListItemText sx={{color: asPath === item.href ? style : undefined}} primary={item.text} />
                </ListItem>
              ))}
              <Divider />
              {loggedIn.map((item, index) => (
                <ListItem
                  button
                  key={item.text}
                  sx={{borderLeft:  asPath === item.href ? 4 : 0, borderColor: 'secondary.main'}}
                  onClick={logout}
                >
                  <ListItemIcon >{asPath === item.href ? item.activeIcon : item.icon}</ListItemIcon>
                  <ListItemText sx={{color: asPath === item.href ? style : undefined}} primary={item.text} />
                </ListItem>
              ))}
            </>
          )}

          {(asPath === "/doctor/allSubmissions" ||
            asPath === "/doctor/taskHistory") && (
            <>
              {doctor.map((item, index) => (
                <ListItem
                  button
                  key={item.text}
                  sx={{borderLeft:  asPath === item.href ? 4 : 0, borderColor: 'secondary.main'}}
                  onClick={() => navigateTo(item.href)}
                >
                  <ListItemIcon>{asPath === item.href ? item.activeIcon : item.icon}</ListItemIcon>
                  <ListItemText sx={{color: asPath === item.href ? style : undefined}} primary={item.text} />
                </ListItem>
              ))}
              <Divider />
              {loggedIn.map((item, index) => (
                <ListItem
                  button
                  key={item.text}
                  sx={{borderLeft:  asPath === item.href ? 4 : 0, borderColor: 'secondary.main'}}
                  onClick={handleLogout}
                >
                  <ListItemIcon>{asPath === item.href ? item.activeIcon : item.icon}</ListItemIcon>
                  <ListItemText sx={{color: asPath === item.href ? style : undefined}}  primary={item.text} />
                </ListItem>
              ))}
            </>
          )}
        </List>
      </Box>
      <Dialog
        open={openAlert}
        onClose={handleCloseAlert}
        aria-labelledby="LogOut"
        aria-describedby="Logout-account"
      >
        <DialogTitle id="logout-title">
          {"Are you sure you want to logout?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleCloseAlert}>Disagree</Button>
          <Button onClick={handleAcceptLogout} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </Drawer>
  );
};
