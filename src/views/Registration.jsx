import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import { Container, Grid, CardContent, CardActions } from '@mui/material'
import AppAccordion from '../components/Accordion/Accordion'
import { accordionContent } from '../redux/core/utils/helper'
import AppCard from '../components/Card/Card'


const AppRegistration = () => {
  return (
    <React.Fragment>
      <Navbar />
      <Container style={{marginTop: '170px'}} fixed>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
            <AppAccordion array={accordionContent} />
        </Grid>
        <Grid item xs={6}>
            <AppCard />
        </Grid>
      </Grid>
      </Container>
    </React.Fragment>
  )
}

export default AppRegistration


