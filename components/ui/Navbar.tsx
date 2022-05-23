import { AppBar, Grid, IconButton, Toolbar, Typography } from "@mui/material"
import  MenuOutlinedIcon from "@mui/icons-material/MenuOutlined"
import { useContext } from "react"
import { UIContext } from '../../context/ui';

export const Navbar = () => {

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
                <Typography variant="subtitle1" color='white'> Welcome, John! </Typography>
            </Grid>
           
        </Toolbar>
    </AppBar>
  )
}
