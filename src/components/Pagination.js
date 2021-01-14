import React, {useContext} from 'react'
import { Button, Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import AppContext from './context'

const useStyles = makeStyles({
    root: {
        display: 'flex',
        justifyContent:'space-between',
        alignItems: 'center',
        maxWidth: '70%',
        "@media (max-width: 375px)": {
            maxWidth: '100%',
        },
        marginBottom: 12,
    },
    pageTitle:{
        fontSize:14,
        padding: '0 8px',
    },
    pageButton: {
        '&:hover': {
            background: 'none',
         },
         '&:first-child' : {
             paddingLeft: 0
         },
        color:'#EA7E28',
        textTransform: 'none'
    },
  }) 

const Pagination = () => {
    const classes = useStyles()
    const {
        carsData:{ totalCarsCount, totalPageCount },
        filterObject,
        setFilterObject,
    } = useContext(AppContext)
    const { page } = filterObject
    return(
    <Container className={classes.root}>
        <Button className={classes.pageButton} onClick={() => setFilterObject({...filterObject, page: 1})} disabled={totalCarsCount <= 10}>First</Button>
        <Button className={classes.pageButton} onClick={() => setFilterObject({...filterObject, page: page - 1})} disabled={page === 1}> Previous </Button>
        <div className={classes.pageTitle} data-testid="pageInfo"> Page {page} of {totalPageCount} </div>
        <Button className={classes.pageButton}  onClick={() => setFilterObject({...filterObject, page: page + 1 })} disabled={page === totalPageCount}> Next </Button>
        <Button className={classes.pageButton}  onClick={() => setFilterObject({...filterObject, page: totalPageCount})} disabled={totalCarsCount <= 10}>Last</Button>
    </Container>)
}
export default Pagination