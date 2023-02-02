import { CancelRounded, Visibility } from '@mui/icons-material'
import { Box, Button, CircularProgress, Grid, Typography } from '@mui/material'
import React from 'react'

export default function FileDropzone({ file }) {
  return (
    <Box
      sx={{
        p: 2,
        border: '1px solid',
        borderColor: 'grey.200',
        borderRadius: '10px',
      }}
    >
      <Grid container space={2}>
        <Grid item xs={2} alignItems={'center'}>
          {file.name.toUpperCase()}
        </Grid>
        <Grid item xs={10} textAlign={'right'}>
          <Box
            {...file.getRootProps(file.style)}
            sx={{ bgcolor: 'grey.200', cursor: 'pointer' }}
          >
            {file.loading
              ? <CircularProgress />
              : <Box>
                <input {...file.getInputProps()} />
                <Typography color={'black'} textAlign='center'>
                  Drag 'n' drop some files here, or click to select files
                </Typography>
              </Box>
            }
          </Box>
        </Grid>
      </Grid>
      {file.file && file.file.map((val, i) => {
        return (
          <Grid container space={2} key={i} my={2}>
            <Grid item xs={2}>
              <Typography>File {i + 1}</Typography>
            </Grid>
            <Grid item xs={10} textAlign={'right'}>
              <Button
                color='success'
                variant="contained"
                size='small'
                onClick={() => window.open(val?.fileurl, "_blank")}
              >
                <Visibility />
              </Button>
              <Button
                color='error'
                variant="contained"
                size='small'
                sx={{ marginLeft: '1rem' }}
                onClick={() => file.delFileHandler(val?.id)}
              >
                <CancelRounded />
              </Button>
            </Grid>
          </Grid>
        )
      })}
    </Box >
  )
}