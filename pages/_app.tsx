import { ThemeProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material';
import { UIProvider } from '../context/ui';
import { SessionProvider } from "next-auth/react"
import '../styles/globals.css'
import { lightTheme, darkTheme } from '../themes';
import { AuthProvider } from '../context/auth';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { LocalizationProvider } from '@mui/x-date-pickers';

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider>
      <AuthProvider>
        <UIProvider >
          <ThemeProvider theme={lightTheme}>
          {/* <LocalizationProvider dateAdapter={AdapterDateFns}> */}
            <CssBaseline>
              <Component {...pageProps} />
            </CssBaseline>
            {/* </LocalizationProvider> */}
          </ThemeProvider>
          
        </UIProvider>
      </AuthProvider>
    </SessionProvider>
    
    
  )
}

export default MyApp
