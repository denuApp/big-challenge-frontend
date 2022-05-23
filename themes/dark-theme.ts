import { Elevator } from "@mui/icons-material";
import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";
import { fontWeight, margin } from '@mui/system';


export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: "#4caf50",
            light: "#80e27e",
            dark: "#087f23",
        },
        secondary: {
            main: "#2979ff",
            light: "#75a7ff",
            dark: "#004ecb",
        },
        error: {
            main: red.A400,
        },
        text: {
            secondary:  "#2979ff",
        }
    },

    
    typography: {
        fontFamily: '"Open Sans", sans-serif',
        fontSize: 14,
        
        
    },

    components: {
        //como se va a ver sierto componente
        MuiAppBar: {
            defaultProps: {
                elevation: 0,
            }
        }
    }
})