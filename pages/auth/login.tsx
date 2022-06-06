import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  TextField,
  Typography,
  IconButton,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { Layout } from "../../components/layouts/Layout";
import NextLink from "next/link";
import { url } from "inspector";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useContext } from "react";
import { AuthContext } from "../../context/auth";
import { useRouter } from "next/router";
import { loadDefaultErrorComponents } from "next/dist/server/load-components";
import Unauthorized from "../../components/error/Unauthorized";
import { IUser } from "../../interfaces";
import UserService from "../../services/UsersService";
import { Navigate } from "react-router-dom";

interface State {
  email: string;
  password: string;
  showPassword: boolean;
}

const login = () => {
  const [values, setValues] = useState<State>({
    email: "",
    password: "",
    showPassword: false,
  });
  const {login } = useContext(AuthContext);
  const router = useRouter();
  const [errorMessage, setErrorMessage] = React.useState("");
  const [openLoading, setOpenLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const { getUser } = new UserService();

  const checkAuthorized = async () => {
    const { user } = await getUser();

    if (user === null) {
      setChecked(true);
    } else if (user.role[0].name === "doctor") {
      router.push("/doctor/allSubmissions");
    }else {
      router.push("/patient/dashboard");
    }
    
  };

  const handleLogin = async () => {
    const { hasError, message, user } = await login(values.email, values.password);

    if(hasError){
      setErrorMessage (message);
    }
    else{
      setOpenLoading(true);
    }
  };

  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
      setErrorMessage("");
    };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  useEffect(() => {
    checkAuthorized();
  }, []);

  return (
    <Layout>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Log In
          </Typography>
          <Box
            component="form"
            // onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              value={values.email}
              onChange={handleChange("email")}
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              error={errorMessage !== ""}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              type={values.showPassword ? "text" : "password"}
              value={values.password}
              onChange={handleChange("password")}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              label="Password"
              name="password"
              autoComplete="password"
              autoFocus
              error={errorMessage !== ""}
            />
            <Typography variant="body2" color="error"> {errorMessage} </Typography>
            <Button
              fullWidth
              onClick={handleLogin}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Log In
            </Button>
            <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={openLoading}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
            <Grid container>
              <Grid item>
                <NextLink href="/auth/signup" passHref>
                  <Link variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </NextLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Layout>
  );
};

export default login;
