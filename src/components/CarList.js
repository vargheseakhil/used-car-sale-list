import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Container, Card, CardContent, CardMedia, Typography, List, ListItem} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AppContext from './context'
import Pagination from './Pagination'
import Loader from './Loader'
import { getCarsToNumber, getCarsFromNumber } from '../util/utils'
import { errorMessage } from '../util/constants'

const useStyles = makeStyles({
  root: {
    paddingBottom: 80
  },
  title: {
    fontSize: 18,
    fontWeight:'bold',
    marginBottom: 12,
  },
  listTitle: {
    fontSize: 18,
  },
  pos: {
    marginBottom: 12,
    fontSize: 14,
  },
  media : {
    height: 100,
    width:120,
    marginRight:24,
  },
  carCard: {
    width: '100%',
    display: 'flex',
    alignItems:'center',
    padding: 12,
    overflowX: 'scroll',
  },
  viewDetails : {
    textDecoration: 'none',
    color: '#EA7E28',
    fontSize: 14,
    fontWeight: 'bold',
    '&:hover': {
      textDecoration: 'underline'
    }
  },
  error :{
    marginTop: '10%',
    fontSize: 18,
    textAlign: 'center',
  }
});

const CarList = () => {

  const classes = useStyles();
  const { 
    carsData : { cars, totalPageCount, totalCarsCount },
    filterObject : { page },
    isLoading,
    isError,
  } = useContext(AppContext)
    
    const showingCarsTo = getCarsToNumber(page, totalPageCount, totalCarsCount)
    const showingCarsFrom = getCarsFromNumber(page, totalPageCount, showingCarsTo)

    return (<Container className={classes.root}>
      <Typography className={classes.title}>
        Available Cars
      </Typography>
      {
          isLoading ? <Loader /> :
          <>
          {isError ? 
          <Container className={classes.error} maxWidth="md">
              <Typography variant="h6"> {errorMessage} </Typography>
          </Container> :
          <>
          <Typography className={classes.listTitle} data-testid="resultInfo"> Showing {showingCarsFrom} to {showingCarsTo} of {totalCarsCount} results</Typography>
          <List className={classes.carList}> 
            {
            cars?.map(({manufacturerName, modelName, pictureUrl, stockNumber, fuelType , mileage, color }) => {
            return <ListItem className={classes.carItem} key={stockNumber}>
                    <Card className={classes.carCard}>
                      <CardMedia
                        className={classes.media}
                        image={pictureUrl}
                        title="Car Image"
                        component="img"
                      />
                      <CardContent>
                        <Typography className={classes.title}>
                          {manufacturerName} {modelName}
                        </Typography>
                        <Typography className={classes.pos}>
                          Stock #{stockNumber} - {mileage.number} {mileage.unit} - {fuelType} - {color}
                        </Typography>
                        <Link className={classes.viewDetails} to={`/car/${stockNumber}`}> View Details </Link>
                      </CardContent>
                    </Card>
                   </ListItem>
            })
            }
            </List>
            <Pagination />
            </> }
            </>
      }
    </Container>)
}

export default CarList