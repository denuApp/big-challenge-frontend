import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  FormGroup,
  Grid,
  Link,
  Radio,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { display, flexbox, margin } from "@mui/system";
import NextLink from "next/link";
import { useState } from "react";
import { Layout } from "../../components/layouts";

interface State {
  email: string;
  name: string;
  lastName: string;
  password: string;
  showPassword: boolean;
  role: string;
}

const signup = () => {
  const [values, setValues] = useState<State>({
    email: "",
    name: "",
    lastName: "",
    password: "",
    showPassword: false,
    role: "patient",
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
      <Container maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            alignContent: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box
            component="form"
            noValidate
            //onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  value={values.name}
                  onChange={handleChange("name")}
                  id="name"
                  label="Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  autoComplete="given-name"
                  name="lastName"
                  required
                  fullWidth
                  value={values.lastName}
                  onChange={handleChange("lastName")}
                  id="lastName"
                  label="Last Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  value={values.email}
                  onChange={handleChange("email")}
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
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
                          {values.showPassword ? (
                            <VisibilityOff color="secondary" />
                          ) : (
                            <Visibility color="secondary"/>
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Grid container>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                onChange={handleChange("role")}
                value="patient"
                label="Patient"
                checked={values.role === "patient"}
              />
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                onChange={handleChange("role")}
                value="doctor"
                label="Doctor"
                checked={values.role === "doctor"}
              />
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <NextLink href="/auth/login" passHref>
                  <Link variant="body2">Already have an account? Log In</Link>
                </NextLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Layout>
  );
};

export default signup;
