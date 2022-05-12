import { Elevator } from "@mui/icons-material";
import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";


export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        error: {
            main: red.A400,
        },
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