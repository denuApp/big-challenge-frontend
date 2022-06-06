import { Backdrop, CircularProgress } from '@mui/material'
import React, { FC } from 'react'

interface Props {
    loading: boolean;
    time?: number;
}

export const Loading: FC<Props> = ({loading, time=0}) => {
  return (
    <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={loading}
            transitionDuration={time}
            >
              <CircularProgress color="inherit" />
      </Backdrop>
  )
}
