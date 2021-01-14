import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
      display:'flex',
      justifyContent: 'center',
      alignItems: 'center',
      border: '1px solid #EDEDED',
      fontSize: 12,
      position: 'absolute',
      width:'100%',
      height: 80,
      bottom: '0',
    }
})

const Footer = () => {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            @ AUTO1 Group 2021
        </div>
    )
}

export default Footer
