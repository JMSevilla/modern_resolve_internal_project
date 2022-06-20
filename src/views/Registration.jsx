import React,{useContext} from 'react'
import Navbar from '../components/Navbar/Navbar'
import { Container, Grid, CardContent, CardActions } from '@mui/material'
import AppAccordion from '../components/Accordion/Accordion'
import { accordionContent } from '../redux/core/utils/helper'
import AppCard from '../components/Card/Card'
import { Context } from '../redux/core/context/context'
import Developer from './layouts/Developer'
import { localstorageHelper } from '../redux/core/data/storage'

const AppRegistration = () => {
  const contextValues = useContext(Context)

  const AppRegistrationIdentify = () => {
    let value = localstorageHelper.load('reg')
      switch(true) {
          case value == 'dev' : {
            return <Developer />
          }
          default :{
            return <React.Fragment></React.Fragment>
          }
      }
  }

  return (
    <React.Fragment>
      <Navbar />
      <Container style={{marginTop: '170px'}} maxWidth={'xl'}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
            <AppAccordion array={accordionContent} />
        </Grid>
        <Grid item xs={6}>
            {AppRegistrationIdentify()}
        </Grid>
      </Grid>
      </Container>
    </React.Fragment>
  )
}

export default AppRegistration


