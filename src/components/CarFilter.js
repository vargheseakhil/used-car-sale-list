import React, { useState , useContext, useRef, memo } from 'react'
import { Select, FormControl, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import AppContext from './context'

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid #EDEDED',
        padding: 24,
        alignItems:'flex-end',
        marginBottom: 24,
    },
    formControl: {
      width:'100%',
      marginBottom:24,
    },
    filerLabel: {
       marginBottom: 12, 
    },
    filterButton: {
        width:'40%',
        background:'#EA7E28',
        '&:hover': {
            background: "#D37324",
         },
        color:'white',
    },
  }) 

const CarFilter = () => {
    
    const classes = useStyles()
    const colorRef = useRef()
    const manufactorRef = useRef()

    const { 
        filterOptions: {colors = [], manufacturers= [] }, 
        filterObject: { color, manufacturer }, 
        setFilterObject,
    } = useContext(AppContext)

    const [colorSelected, setColorSelected] = useState(color || '')
    const [manufacturerSelected, setManufacturerSelected] = useState(manufacturer || '')

    const handleSubmit = () => setFilterObject({color: colorSelected, manufacturer: manufacturerSelected, page: 1 })
    
    return (
        <div className={classes.root}>
        <FormControl className={classes.formControl} variant="outlined">
            <label className={classes.filerLabel}>Color</label>
            <Select
                className={classes.selectEmpty}
                value={colorSelected}
                displayEmpty
                onChange={(e) => setColorSelected(e.target.value)}
                ref={colorRef}
                inputProps={{ "data-testid": "color" }}
                native
            >
                <option value="" key='all color'>All car colors</option>
                {
                    colors &&
                      colors.map((color) => <option key={color} value={color}>{color}</option>)
                }
            </Select>
        </FormControl>
        <FormControl className={classes.formControl} variant="outlined">
            <label className={classes.filerLabel}>Manufacturer</label>
            <Select 
                className={classes.selectEmpty}
                value={manufacturerSelected}
                displayEmpty
                onChange={e => setManufacturerSelected(e.target.value)}
                ref={manufactorRef}
                inputProps={{ "data-testid": "manufacturer" }}
                native
            >
                <option value="" key='all manufacturer'>All manufacturers</option>
                {
                 manufacturers &&
                   manufacturers.map(({name}) => <option key={name} value={name}>{name}</option>) 
                }
            </Select>
        </FormControl>
        <Button className={classes.filterButton} onClick={handleSubmit} data-testid="filter">Filter</Button>
        </div>
    )
}
const memoCarFilter = memo(CarFilter)
export default memoCarFilter