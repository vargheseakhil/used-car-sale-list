import React, { useEffect, useState } from 'react'
import { Grid, CardContent, CardMedia, Typography, Container, Button} from '@material-ui/core';
import { shape, string } from 'prop-types'
import { makeStyles } from '@material-ui/core/styles';
import { fetchCars, checkIsFavourite, removeFromFavourites, addToFavourites } from '../util/utils'
import { cardDetailDescription, favouriteCarDescription, errorMessage, removeFavouriteDescription } from '../util/constants'

const useStyles = makeStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      paddingBottom: 80,
      minHeight: 800,
    },
    content: {
      display: 'flex',
      alignItems: 'center',
    },
    title:{
      fontSize: 32,
      fontWeight: 'bold',
      marginBottom: 12,
    },
    pos: {
      fontSize: 18,
      marginBottom: 12,
    },
    desc: {
      fontSize: 14,
      marginBottom: 12,
    },
    media : {
      height: 500,
    },
    fav: {
      border: '1px solid #ededed',
      padding: 24,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
    },
    save: {
      width:'40%',
      background:'#EA7E28',
      '&:hover': {
          background: "#D37324",
       },
      color:'white',
    },
    error: {
      marginTop: '10%',
      fontSize: 18,
      textAlign: 'center',
    },
    loader: {
      marginTop:'10%',
      textAlign:'center',
    }
  });

const CarDetail = ({ match }) => {
    const classes = useStyles();
    const { params: { stockNumber } } = match;
    const [carDetails, setCarDetails] = useState({})
    const [loading, setLoading] = useState(true)
    const [isError, setIsError] = useState(false)
    const [isFavourite, setIsFavourite] = useState(checkIsFavourite(stockNumber) || false)

    useEffect(() => {
        setLoading(true)
        const fetchCarsByStock = async () => {
          try{
            const result = await fetch(`${fetchCars}/${stockNumber}`)
            const response  = await result.json()
            setLoading(false)
            setIsError(false)
            setCarDetails(response.car)
          }catch(e) {
            setLoading(false)
            setIsError(true)
          }
        }
        fetchCarsByStock()
    }, [stockNumber])

    const  addRemoveToFavourites = (stockNumber) => {
      if(isFavourite){
        removeFromFavourites(stockNumber)
        setIsFavourite(false)
      } else {
        addToFavourites(stockNumber)
        setIsFavourite(true)
      }
    }

    return (
        <>
        {!loading ?
        (
          <Grid className={classes.root} data-testid="carDetails">
              { isError ?
              <Container className={classes.error} maxWidth="md">
                 <Typography className={classes.pos}> {errorMessage} </Typography>
              </Container> :
              <>
              <CardMedia
                  className={classes.media}
                  image={`https://via.placeholder.com/1500?text=${carDetails?.modelName}`}
                  title="Car Image"
                  component="img"
              />
                <Container className={classes.content} maxWidth="md">
                  <CardContent>
                  <Typography className={classes.title} gutterBottom>
                      {carDetails.manufacturerName} {carDetails.modelName}
                  </Typography>
                  <Typography className={classes.pos}>
                      Stock #{carDetails.stockNumber} - {carDetails?.mileage?.number} {carDetails?.mileage?.unit} - {carDetails.fuelType} - {carDetails.color}
                  </Typography>
                  <Typography className={classes.desc} variant="body2" component="p">
                    {cardDetailDescription}
                  </Typography>
                  </CardContent>
                  <CardContent className={classes.fav}>
                  <Typography className={classes.desc} variant="body2" component="p">
                    {isFavourite ? removeFavouriteDescription : favouriteCarDescription}
                  </Typography>
                  <Button
                    className={classes.save}
                    onClick={() => addRemoveToFavourites(stockNumber)}
                    data-testid="favButton"
                    >
                      {isFavourite? `Remove`: `Save`}
                  </Button>
                  </CardContent>
               </Container>
               </>
              }
          </Grid>
        ) : <Container className={classes.loader} data-testid="loader"> Loading </Container>
        }
        </>
    )
}

CarDetail.propTypes = {
  match:shape({
    params: shape({
      stockNumber: string
    })
  }).isRequired
}

export default CarDetail