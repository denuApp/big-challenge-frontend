import React, { FC } from 'react'
import { Box, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom'; 
import { useRouter } from 'next/router';


const Unauthorized: FC = () => {
  const router = useRouter();

  const goBack = () => {
    router.back();
  }

  return (
    // <> <Typography>ERROR 401: Unauthorized page</Typography>
    // <button onClick={goBack}>Back</button>
    // </>
    <Box display="flex" 
    width="100%"
    height="100%"
    justifyContent="center" 
    alignItems="center" 
    alignContent="center"
    flexDirection="column" color="black">
      <Typography variant="h5" sx={{ padding: "20px", letterSpacing: "1px" }}>
        ERROR 401| Unauthorized page
      </Typography>
      <button onClick={goBack}>Back</button>
    </Box>
    
   
  )
}

export default Unauthorized;

