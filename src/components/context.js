import React, { useState, useEffect } from 'react'
import { fetchAllColors, fetchAllManufacturers, fetchCars, getCarsUrlByQuery } from '../util/utils'

const AppContext = React.createContext({})

export const AppProvider = AppContext.Provider

export default AppContext


export const Provider = (props) => {

    const [filterObject, setFilterObject] = useState({
        color: '',
        manufacturer: '',
        page: 1
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
        const fetchAllData = async (filters) => {
            setIsLoading(true)
            try {
                //Fetch cars with filter
                if(filters) {
                    const fetchAllCarsUrl = getCarsUrlByQuery(filters)
                    const result = await fetch(fetchAllCarsUrl)
                    const response = await result.json()
                    setCarsData({...response})
                }
                else {//Initial calls for filters and cars
                    const fetchDataUrls = [fetchAllColors, fetchAllManufacturers, fetchCars]
                    const [ {colors}, {manufacturers}, cars ] = await Promise.all(
                        fetchDataUrls.map(async (fetchData) => {
                            const result = await fetch(fetchData)
                            return result.json()
                        })
                    )
                    setFilterOptions({colors, manufacturers})
                    setCarsData(cars)
                }
                setIsLoading(false)
            } catch(e) {
                setIsLoading(false)
                setIsError(true)
            }

        }
        //Fetch call for cars and filters
        fetchAllData(filterOptions.colors && filterObject)

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