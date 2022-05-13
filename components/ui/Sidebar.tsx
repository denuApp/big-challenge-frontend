
import { Box, Divider, Drawer, Link, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material"
import { FC, useContext } from "react";
import { UIContext } from '../../context/ui/UIContext';
import NextLink from 'next/link';



interface Props {
    menuItems?: any[],
    menuItemsGeneral?: any[],
}

export const Sidebar: FC<Props> = ({menuItems , menuItemsGeneral}) => {

    const { sidemenuOpen, closeSideMenu } = useContext(UIContext);

  return (
    <Drawer
        anchor="left"
        open={sidemenuOpen}
        onClose={closeSideMenu}
    >
        <Box sx={{ width: 250 }}>
            <Box sx={{ padding:'5px 10px' }}>
                <Typography variant="h4">Menu</Typography>
            </Box>

            {menuItems &&
                <List>
                    {
                        menuItems.map((text, index) => (
                            <ListItem button key={text.text}>
                                <NextLink href={text.href}>
                                    <ListItemText primary={text.text} />
                                </NextLink>
                            </ListItem>
                        ))
                    }
                </List>
            }

            <Divider />

            {menuItemsGeneral && 
                <List>
                    
                    {
                        menuItemsGeneral.map((text, index) => (
                            <ListItem button key={text.text}>
                                <NextLink href={text.href}>
                                    <ListItemText primary={text.text} />
                                </NextLink>
                            </ListItem>
                        ))
                    }
                </List>
            }

        </Box>
    </Drawer>
  )
}
