import React from 'react'
import { Link } from 'react-router-dom'
import { Typography, Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { logoUrl } from '../util/constants'

const useStyles = makeStyles({
    root: {
        textAlign: 'center',
        marginTop: '10%',
        fontSize: 18,
    },
    backHome:{
        color: '#EA7F28',
        textDecoration: 'none',
    },
    logo: {
        display: 'inline-block',
        width: 170,
        marginBottom: 12,
      },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    pos: {
        fontSize: 18,
        marginBottom: 12,
    }
    })


const NotFound = () => {
    const classes = useStyles()
    return (
        <Container maxWidth="sm" className={classes.root}>
            <img data-testid="logo" src={logoUrl} className={classes.logo} alt="logo"/>
            <Typography className={classes.title}>
                404 - Not Found
            </Typography>
            <Typography variant="body2" className={classes.pos}>
                Sorry, the page you're looking for doesn't exist
            </Typography>
            <Typography variant="body2" className={classes.pos}>
                You can always go back to the <Link to="/" className={classes.backHome}>homePage</Link>
            </Typography>
        </Container>
    )
}
export default NotFound