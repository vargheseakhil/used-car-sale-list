import React from 'react'
import { Typography, Card, CardMedia, CardContent } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
    },
    media : {
        height: 100,
        width:120,
        background: '#EDEDED',
        marginRight:24,
    },
    title:{
        fontSize: 32,
        fontWeight: 'bold',
        margin:'24px 0'
    },
    carCard: {
        display: 'flex',
        alignItems:'center',
        padding: 12,
    },
    carContent: {
        padding:0,
        '&:last-child' :{
            paddingBottom: 0,
        }
    },
    content: {
        width:200,
        height: 30,
        background: '#EDEDED',
        marginBottom: 12,
    },
    pos: {
        width:200,
        height: 25,
        background: '#EDEDED',
        marginBottom: 12,
    },
    last :{
        width:100,
        height: 25,
        background: '#EDEDED',
        padding:0
    }
    })


const Loader = () => {
    const classes = useStyles()
    return (
        <>
            <Typography className={classes.title}>
                Loading
            </Typography>
            <Card className={classes.carCard}>
            <CardMedia
                className={classes.media}
                component="div"
            />
            <CardContent className={classes.carContent}>
                <div className={classes.content}></div>
                <div className={classes.pos}></div>
                <div className={classes.last}></div>
            </CardContent>
            </Card>
        </>
    )
}
export default Loader