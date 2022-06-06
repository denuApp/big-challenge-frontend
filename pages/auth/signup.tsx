import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Link,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  CircularProgress,
  Backdrop,
} from "@mui/material";
import NextLink from "next/link";
import { useState, useContext, useEffect } from "react";
import { Layout } from "../../components/layouts";
import { AuthContext } from "../../context/auth";
import { useRouter } from "next/router";
import { NewAlert } from "../../components/dialogs";
import UserService from "../../services/UsersService";

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
  const { signup } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [openLoading, setOpenLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const router = useRouter();
  const { getUser } = new UserService();

  const checkAuthorized = async () => {
    const { user } = await getUser();

    if (!user) {
      setChecked(true);
    } else if (user.role[0].name === "doctor") {
      router.push("/doctor/allSubmissions");
    } else {
      router.push("/patient/dashboard");
    }
  };

  const handleCloseAlert = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };

  const handleSubmit = async () => {
    if (
      values.email != "" &&
      values.name != "" &&
      values.lastName != "" &&
      values.password != ""
    ) {
      const { hasError, message } = await signup(
        values.name + " " + values.lastName,
        values.email,
        values.password,
        values.role
      );
      if (hasError) {
        setErrorMessage(message);
      } else {
        setOpenAlert(true);
        setOpenLoading(true);
      }
    } else {
      setErrorMessage("Wrong email or password");
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
                              <Visibility color="secondary" />
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
              <Typography variant="body2" color="error">
                {errorMessage}
              </Typography>
              <Button
                onClick={handleSubmit}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <NewAlert
                open={openAlert}
                setOpen={setOpenAlert}
                type="success"
                message="usuario registrado con exito"
              />

              <Backdrop
                sx={{
                  color: "#fff",
                  zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={openLoading}
              >
                <CircularProgress color="inherit" />
              </Backdrop>

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
        <Grid
          container
          justifyContent="center"
          sx={{ display: "flex", alignItems: "flex-end" }}
        ></Grid>
      </Layout>
    );
  
};

export default signup;
