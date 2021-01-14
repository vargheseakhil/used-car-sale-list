import React, { useContext } from 'react'
import { Grid, Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import CarList from './CarList'
import CarFilter from './CarFilter'
import AppContext from './context'


const useStyles = makeStyles({
  root: {
    marginTop: 24,
  },
  
}) 

const HomePage = () => {

    const classes = useStyles();
    return (
    <Container className={classes.root}>
      <Grid container justify="space-between">
        <Grid item xs={12} md={3}>
        <CarFilter/>
        </Grid>
        <Grid item xs={12} md={9}>
        <CarList/>
        </Grid>
      </Grid>
    </Container>
    )
}

export default HomePage