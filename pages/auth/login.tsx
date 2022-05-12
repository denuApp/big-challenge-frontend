import { Box, Button, Checkbox, Container, FormControlLabel, Grid, Link, TextField, Typography } from '@mui/material'
import React from 'react'
import { Layout } from '../../components/layouts/Layout';
import NextLink from 'next/link';
import { url } from 'inspector';

const menuItemsGeneral = [
  {text: 'Log In', href: '/auth/login'}, 
  {text: 'Sign Up', href:'/auth/signup'}];
// const menuItemsGeneral = ['Sign In', 'Sign Up'];


 const signin = () => {
  return (
    <Layout menuItemsGeneral={menuItemsGeneral}>
     <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Log Inn
          </Typography>
          <Box 
            component="form" 
            // onSubmit={handleSubmit} 
            noValidate sx={{ mt: 1 }}
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
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
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
  )
}

export default signin;

