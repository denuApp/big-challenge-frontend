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

const menuItemsGeneral = [
  { text: "Log In", href: "/auth/login" },
  { text: "Sign Up", href: "/auth/signup" },
];
// const menuItemsGeneral = ['Sign In', 'Sign Up'];

interface State {
  email: string;
  password: string;
  showPassword: boolean;
}

const signin = () => {
  const [values, setValues] = useState<State>({
    email: "",
    password: "",
    showPassword: false,
  });

  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
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
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={values.showPassword ? "text" : "password"}
                value={values.password}
                onChange={handleChange("password")}
                endAdornment={
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
                }
                label="Password"
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
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

export default signin;
