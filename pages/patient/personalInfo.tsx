import {
  FormControlLabel,
  Grid,
  TextField,
  Typography,
  Button,
  FormLabel,
  RadioGroup,
  Radio,
  InputAdornment,
} from "@mui/material";
import { Layout } from "../../components/layouts";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { useEffect, useState } from "react";
import { IUser } from "../../interfaces";
import UserService from "../../services/UsersService";
import { NewAlert } from "../../components/dialogs";
import { IPersonalInfo } from "../../interfaces/personalInfo";
import Unauthorized from "../../components/error/Unauthorized";
import { useRouter } from "next/router";
import { Navigate } from "react-router-dom";

export const personalInfo = () => {
  const [values, setValues] = useState<IPersonalInfo>({
    id: null,
    birth_date: new Date(),
    id_number: null,
    height: null,
    weight: null,
    gender: "",
  });

  const { getUser, getPatientInformation, setPatientInfo, editPatientInfo } =
    new UserService();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState<
    "success" | "error" | "warning" | "info"
  >("success");

  const router = useRouter();

  const [checked, setChecked] = useState(false);

  const getPersonalInfo = async () => {
    const { info } = await getPatientInformation();
    if (info) {
      console.log(info);
      setValues(info);
    }
  };

  const handleChange =
    (prop: keyof IPersonalInfo) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const checkAuthorized = async () => {
    const { user } = await getUser();

    if (!user) {
      router.push("/auth/login");
    } else if (user.role[0].name === "patient") {
      setChecked(true);
    }
  };

  const handleSave = async () => {
    if (values.id) {
      const { hasError, message } = await editPatientInfo(values, values.id);
      if (hasError) {
        setAlertMessage(message);
        setAlertType("error");
        setOpenSnackbar(true);
      } else {
        setAlertMessage("Saved");
        setAlertType("success");
        setOpenSnackbar(true);
      }
    } else {
      const { hasError, message } = await setPatientInfo(values);
      if (hasError) {
        setAlertMessage(message);
        setAlertType("error");
        setOpenSnackbar(true);
      } else {
        setAlertMessage("Saved");
        setAlertType("success");
        setOpenSnackbar(true);
      }
    }
  };

  useEffect(() => {
    checkAuthorized();
    getPersonalInfo();
  }, []);

  if (!checked) {
    return <Unauthorized />;
  } else {
    return (
      <Layout>
        <Grid
          container
          component="main"
          maxWidth="xs"
          padding={2}
          sx={{
            width: "100%",
            marginTop: 8,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            padding: "25px",
            alignContent: "center",
          }}
        >
          <Typography component="h1" variant="h4" marginBottom={4}>
            PERSONAL INFORMATION
          </Typography>

          <Grid container spacing={3} xs={12} sm={6}>
            <Grid item xs={12}>
              <TextField
                required
                // type="number"
                id="idNumber"
                name="idNumber"
                label="Id Number"
                value={values.id_number ? values.id_number : ""}
                onChange={handleChange("id_number")}
                fullWidth
                variant="standard"
                helperText="without special characters"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="height"
                name="height"
                label="Height"
                value={values.height}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">mt</InputAdornment>
                  ),
                }}
                onChange={handleChange("height")}
                type="number"
                fullWidth
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="weight"
                name="weight"
                label="Weight"
                value={values.weight}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">kg</InputAdornment>
                  ),
                }}
                onChange={handleChange("weight")}
                type="number"
                fullWidth
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormLabel required id="demo-row-radio-buttons-group-label">
                Gender
              </FormLabel>
              <RadioGroup
                row
                value={values.gender}
                onChange={handleChange("gender")}
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                />
              </RadioGroup>
            </Grid>

            <Grid item xs={12} sm={6} sx={{ marginTop: "20px" }}>
              <LocalizationProvider required dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  label="Birth date *"
                  inputFormat="MM/dd/yyyy"
                  value={values.birth_date}
                  onChange={handleChange("birth_date")}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Grid>

            <Grid
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "30px",
              }}
            >
              <Button
                variant="contained"
                sx={{ height: 40, marginTop: 2, marginRight: 2, padding: 2 }}
                onClick={handleSave}
                color="secondary"
              >
                Save changes
              </Button>
            </Grid>
          </Grid>

          <NewAlert
            open={openSnackbar}
            setOpen={setOpenSnackbar}
            message={alertMessage}
            type={alertType}
          />
        </Grid>
      </Layout>
    );
  }
};

export default personalInfo;
