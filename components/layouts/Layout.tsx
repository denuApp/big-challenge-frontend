import { Box } from '@mui/material'
import Head from 'next/head'
import React, { FC } from 'react'
import { Navbar, Sidebar } from '../ui';

interface Props {
    title?: string,
    children?: React.ReactNode,
    menuItems?: any[],
    menuItemsGeneral?: any[],
};

export const Layout:FC<Props> = ({ title = 'Virtual Doc', children, menuItems, menuItemsGeneral }) => {
  return (
    <Box sx={{ flexFlow: 1 }}>
        <Head>
            <title>{ title }</title>
        </Head>

        <Navbar />

        {(menuItems || menuItemsGeneral) && <Sidebar menuItems={menuItems} menuItemsGeneral={menuItemsGeneral}  />}
        {/* { menuItems > 0 ? <Sidebar menuItems={menuItems} menuItemsGeneral={menuItemsGeneral} /> : null } */}
        {/* <Sidebar menuItems={menuItems} menuItemsGeneral={menuItemsGeneral}/> */}
        

        <Box sx={{ padding: '10px 20px' }}>
            { children }
        </Box>
    </Box>
  )
}