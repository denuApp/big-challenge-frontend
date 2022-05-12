import { Box, Button, Checkbox, Container, FormControlLabel, FormGroup, Grid, Link, Radio, TextField, Typography } from '@mui/material';
import { display, flexbox, margin } from '@mui/system';
import NextLink from 'next/link';
import { useState } from 'react';
import { Layout } from '../../components/layouts';

const menuItemsGeneral = [
    {text: 'Log In', href: '/auth/login'}, 
    {text: 'Sign Up', href:'/auth/signup'}];

// const menuItemsGeneral = ['Sign In', 'Sign Up'];

const signup = () => {

    const [role, setRole] = useState('patient');
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRole(event.target.value);
      };
  return (
      <Layout menuItemsGeneral={menuItemsGeneral}>
    <Container  maxWidth="xs">
    <Box
        sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            alignContent: 'center',
            
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
                <Grid item xs={12}>
                <TextField
                    autoComplete="given-name"
                    name="name"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    autoFocus
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                />
                </Grid>
            </Grid>
            <Grid container >
                    <FormControlLabel 
                    control={<Checkbox defaultChecked />} 
                    onChange={handleChange}
                    value="patient"
                    label="Patient"
                    checked={role === 'patient'}
                    />
                    <FormControlLabel 
                    control={<Checkbox defaultChecked />} 
                    onChange={handleChange}
                    value="doctor"
                    label="Doctor"
                    checked={role === 'doctor'}
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
                <NextLink href='/auth/login' passHref>
                    <Link variant="body2">
                    Already have an account? Sign In
                    </Link>
                </NextLink>
                </Grid>
            </Grid>
        </Box>
    </Box>
    </Container>
    </Layout>
  )
}

export default signup;