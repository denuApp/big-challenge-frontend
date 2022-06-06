import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { UIProvider } from "../context/ui";
import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";
import { lightTheme, darkTheme } from "../themes";
import { AuthProvider } from "../context/auth";
import { SubmissionsProvider } from "../context/submissions";

function MyApp({ Component, pageProps }) {

    return (
      <SessionProvider>
        <AuthProvider>
          <UIProvider>
            <SubmissionsProvider>
              <ThemeProvider theme={lightTheme}>
                <CssBaseline>
                  <Component {...pageProps} />
                </CssBaseline>
              </ThemeProvider>
            </SubmissionsProvider>
          </UIProvider>
        </AuthProvider>
      </SessionProvider>
    );
  
}

export default MyApp;
