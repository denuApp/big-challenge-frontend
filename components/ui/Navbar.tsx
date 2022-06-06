import { AppBar, Grid, IconButton, Toolbar, Typography } from "@mui/material"
import  MenuOutlinedIcon from "@mui/icons-material/MenuOutlined"
import { useContext, useState, useEffect, FC } from 'react';
import { UIContext } from '../../context/ui';
import { AuthContext } from "../../context/auth";
import { IUser } from '../../interfaces/user';
import UserService from '../../services/UsersService';

interface Props {
    user: IUser;
}

export const Navbar: FC<Props> =  ({user}) => {

    const { openSideMenu } = useContext( UIContext );

  return (
    <AppBar position="sticky"> 
        <Toolbar >
            <IconButton
                size='large'
                edge="start"
                onClick={openSideMenu}
            >
                <MenuOutlinedIcon />
            </IconButton>

            <Grid sx={{ display: 'flex', width: '100%', justifyContent:"space-between"}}>
                <Typography variant="h6">VirtualDoc</Typography>
                {user && <Typography variant="subtitle1" color='white'> Welcome, {user.name} ! </Typography> }
            </Grid>
           
        </Toolbar>
    </AppBar>
  )
}
