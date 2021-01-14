import React from 'react'
import { Link } from 'react-router-dom'
import { AppBar, Toolbar, IconButton, List } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { logoUrl } from '../util/constants'

const useStyles = makeStyles({
    root: {
      height: 80,
      display: 'flex',
      alignItems: 'unset',
      justifyContent: 'center'
    },
    logo: {
      display: 'inline-block',
      width: 170,
      "@media (max-width: 375px)": {
        width: 100,
      },
    },
    navDisplayFlex: {
      display: `flex`,
      justifyContent: `space-between`
    },
    linkText: {
      textDecoration: `none`,
      color: '#4A4A4A',
      paddingRight: 24,
      "@media (max-width: 375px)": {
        paddingRight: 12,
      },
    }
    
  }) 

  const navLinks = [
    { title: `Purchase`, path: `/about-us` },
    { title: `MyOrders`, path: `/my-orders` },
    { title: `Sell`, path: `/sell` },
  ]

const Header = () => {
    const classes = useStyles();
    return (
        <AppBar position="static" color="inherit" className={classes.root}>
        <Toolbar className={classes.navDisplayFlex}>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Link to="/"><img data-testid='logo' src={logoUrl} className={classes.logo} /></Link>
          </IconButton>
          <List component="nav" className={classes.navDisplayFlex}>
            {navLinks.map(({ title, path }) => (
              <Link to={path} key={title} className={classes.linkText}>
                {title}
              </Link>
            ))}
          </List>
        </Toolbar>
      </AppBar>
    )
}
export default Header