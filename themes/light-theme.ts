import { createTheme } from "@mui/material";
import { grey, red } from "@mui/material/colors";


export const lightTheme = createTheme({
    palette: {
        mode: "light",
        background: {
            default: grey[100],
        },
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
            primary:  '#000000',
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
            },
           
        }
    }
})