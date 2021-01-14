import React, { useState, useEffect } from 'react'
import { fetchAllColors, fetchAllManufacturers, getCarsUrlByQuery } from '../util/utils'

const AppContext = React.createContext({})

export const AppProvider = AppContext.Provider

export default AppContext


export const Provider = (props) => {

    const [filterObject, setFilterObject] = useState({
        color: '',
        manufacturer: '',
        page: 1,
    })

    const [carsData, setCarsData] = useState({
        cars: [],
        totalPageCount: 0,
        totalCarsCount: 0,
    })
    
    const [filterOptions, setFilterOptions] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)


    useEffect(() => {

        const fetchColorsAndManufacturers = async () => {
            setIsLoading(true)
            try {
                    const fetchDataUrls = [ fetchAllColors, fetchAllManufacturers]
                    const [ {colors}, {manufacturers} ] = await Promise.all(
                        fetchDataUrls.map( async (fetchData) => {
                            const result = await fetch(fetchData)
                            return result.json()
                        })
                    )
                    setFilterOptions({colors, manufacturers})
            } catch(e) {
                setIsLoading(false)
                setIsError(true)
            }

        }
        //Fetch call for filters
        fetchColorsAndManufacturers()

    },[])

    useEffect(() => {
        const fetchCarsWithFilter = async () => {
             setIsLoading(true)
             try{
                const fetchAllCarsUrl = getCarsUrlByQuery(filterObject)
                const result = await fetch(fetchAllCarsUrl)
                const response = await result.json()
                setCarsData({...response})
                setIsLoading(false)
             }catch(e) {
                 setIsLoading(false)
                 setIsError(true)
             }
        }
        fetchCarsWithFilter(filterObject)
    },[filterObject])

    const actions = {
        setFilterObject,
    }

    const state = {
        filterOptions,
        carsData,
        filterObject,
        isLoading,
        isError,
    }

    return(
        <AppContext.Provider value={
            {
                ...state,
                ...actions,
            }
        }>
            {props.children}
        </AppContext.Provider>
    )
}