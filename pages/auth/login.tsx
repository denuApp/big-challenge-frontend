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
} from "@mui/material";
import React, { useState } from "react";
import { Layout } from "../../components/layouts/Layout";
import NextLink from "next/link";
import { url } from "inspector";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useContext } from "react";
import { AuthContext } from "../../context/auth";
import { useRouter } from "next/router";
import { loadDefaultErrorComponents } from "next/dist/server/load-components";

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
  const { user, isLoggedIn, login } = useContext(AuthContext);
  const router = useRouter();
  const [errorMessage, setErrorMessage] = React.useState("");

  const handleLogin = () => {
    login(values.email, values.password);

    if (isLoggedIn) {
      if (user.role === "patient") {
        router.push("/patient/dashboard");
      }

      if (user.role === "doctor") {
        router.push("/doctor/dashboard");
      }
    } else {
      setErrorMessage ("Wrong email or password");
      
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
