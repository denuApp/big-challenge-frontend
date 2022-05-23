
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
import { useState } from "react";

interface State {
    date: Date | null,
    name: string,
    lastName: string,
    id: string,
    height: number,
    weight: number,
    gender: string
}

export const personalInfo = () => {
  const [values, setValues] = useState<State>({
    date: new Date(),
    name: '',
    lastName: '',
    id:'',
    height: null,
    weight: null,
    gender: ''

  });

  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };


  // const handleSelect = (
  //   event: React.ChangeEvent<{ name: string; value: string }>
  // ) => {
  //   setGenderValue(event.target.value);
  // };

  const checkRequiredFields = () => {
    if (values.name === '' || values.lastName === '' || values.id === '' || values.height === null || values.weight === null || values.date === null) {
      return true;
    }
    return false;
  };

  const handleSave = () => {
    const boolean = checkRequiredFields();
    if (boolean) {
      alert("Please fill all the required fields");
    } else {
      alert("Saved");
    }
  
    // add patient info to database
  };

  return (
    <Layout >
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
              value={values.name}
              onChange={handleChange("name")}
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
              value={values.lastName}
              onChange={handleChange("lastName")}
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
              value={values.id}
              onChange={handleChange("id")}
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
                startAdornment: <InputAdornment position="start">mt</InputAdornment>,
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
                startAdornment: <InputAdornment position="start">kg</InputAdornment>,
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
                value={values.date}
                onChange={(date) => setValues({ ...values, date })}
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
        {/* </Box> */}
      </Grid>
    </Layout>
  );
};

export default personalInfo;
