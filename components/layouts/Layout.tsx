import { Box } from '@mui/material'
import Head from 'next/head'
import React, { FC } from 'react'
import { Navbar, Sidebar } from '../ui';
import { Toolbar } from '@mui/material';
import { fontWeight, display } from '@mui/system';

interface Props {
    title?: string,
    children?: React.ReactNode,
};

export const Layout:FC<Props> = ({ title = 'Virtual Doc', children }) => {

  return (
    <Box sx={{ flexFlow: 1 }}>
      {/* {console.log("j")} */}
        <Head>
            <title >{ title }</title>
        </Head>

        <Navbar />

        <Sidebar />
      
        <Box sx={{ padding: '10px 20px'}}>
            { children }
        </Box>
    </Box>
  )
}