import * as React from "react";
import {
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
  Container,
  Box,
  Button,
  FormLabel,
  RadioGroup,
  Radio,
  Stack,
} from "@mui/material";
import { Layout } from "../../components/layouts";
import Card from "@mui/material/Card";
import { padding, margin, height } from "@mui/system";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

const personalInfo = () => {
  const menuItemsGeneral = [{ text: "Log Out", href: "/auth/login" }];
  const [dateValue, setDateValue] = React.useState<Date | null>(new Date());
  const [nameValue, setNameValue] = React.useState("");
  const [lastNameValue, setLastNameValue] = React.useState("");
  const [idValue, setIdValue] = React.useState("");
  const [heightValue, setHeightValue] = React.useState("");
  const [weightValue, setWeightValue] = React.useState("");
  const [genderValue, setGenderValue] = React.useState("");

  const handleChange = (newValue: Date | null) => {
    setDateValue(newValue);
  };

  const menuItemsPatient = [
    { text: "Dashboard", href: "/patient/dashboard" },
    { text: "Personal Info", href: "/patient/personalInfo" },
  ];

  const handleSelect = (
    event: React.ChangeEvent<{ name: string; value: string }>
  ) => {
    setGenderValue(event.target.value);
  };

  const handleSave = () => {
    // add patient info to database
  };

  return (
    <Layout menuItems={menuItemsPatient} menuItemsGeneral={menuItemsGeneral}>
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
        <Typography component="h1" variant="h5">
          Personal Information
        </Typography>
        {/* <Box 
            component="form" 
            noValidate 
            //onSubmit={handleSubmit} 
            sx={{ mt: 3 }}
        > */}
        <Grid container spacing={3} xs={12} sm={6}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="firstName"
              name="firstName"
              label="First name"
              value={nameValue}
              onChange={(event) => setNameValue(event.target.value)}
              fullWidth
              autoComplete="given-name"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="lastName"
              name="lastName"
              label="Last name"
              value={lastNameValue}
              onChange={(e) => setLastNameValue(e.target.value)}
              fullWidth
              autoComplete="family-name"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="idNumber"
              name="idNumber"
              label="Id Number"
              value={idValue}
              onChange={(e) => setIdValue(e.target.value)}
              fullWidth
              autoComplete="shipping address-line1"
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
              value={heightValue}
              onChange={(e) => setHeightValue(e.target.value)}
              fullWidth
              autoComplete="shipping address-level2"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="weight"
              name="weight"
              label="Weight"
              value={weightValue}
              onChange={(e) => setWeightValue(e.target.value)}
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
              value={genderValue}
              onChange={handleSelect}
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
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
                value={dateValue}
                onChange={handleChange}
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
            >
              Save changes
            </Button>
          </Grid>
        </Grid>
        {/* </Box> */}
      </Grid>
    </Layout>
  );
};

export default personalInfo;
