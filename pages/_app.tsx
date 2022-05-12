import { ThemeProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material';
import { UIProvider } from '../context/ui';
import '../styles/globals.css'
import { lightTheme, darkTheme } from '../themes';

function MyApp({ Component, pageProps }) {
  return (
    <UIProvider >
      <ThemeProvider theme={darkTheme}>
        <CssBaseline>
          <Component {...pageProps} />
        </CssBaseline>
      </ThemeProvider>
    </UIProvider>
    
  )
}

export default MyApp
