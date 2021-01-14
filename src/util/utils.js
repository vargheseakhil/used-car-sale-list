export const baseAPIUrl = 'https://auto1-mock-server.herokuapp.com/api'

export const fetchCars = baseAPIUrl+'/cars'

export const fetchAllColors = baseAPIUrl+'/colors'

export const fetchAllManufacturers = baseAPIUrl+'/manufacturers'

export const getCarsUrlByQuery = ({color, manufacturer, page}) => {
  let getCarsUrl = fetchCars
  if(color && manufacturer) getCarsUrl+=`?color=${color}&manufacturer=${manufacturer}&page=${page}`
  else if(color) getCarsUrl+=`?color=${color}&page=${page}`
  else if(manufacturer) getCarsUrl+=`?manufacturer=${manufacturer}&page=${page}`
  else getCarsUrl+=`?page=${page}`
  return getCarsUrl
}
export const getCarsToNumber = (page,totalPages, totalCars) => page===totalPages ? totalCars : page * 10
export const getCarsFromNumber = (page, totalPages, showingCarsTo) => page===totalPages ? ((page-1) * 10) + 1 : showingCarsTo-9

export const checkIsFavourite = (stockNumber) => {
  const favList  = JSON.parse(localStorage.getItem('favourites'))
  return favList && favList.includes(stockNumber)
}

export const addToFavourites = (stockNumber) => {
  const favList  = JSON.parse(localStorage.getItem('favourites')) || []
  if(favList) {
    favList.push(stockNumber)
    localStorage.setItem('favourites', JSON.stringify(favList))
  }
}

export const removeFromFavourites = (stockNumber) => {
  const favList  = JSON.parse(localStorage.getItem('favourites')) || []
    const indexOfItem = favList?.indexOf(stockNumber)
    if(indexOfItem !== -1 ){
      favList.splice(indexOfItem, 1);
      localStorage.setItem('favourites', JSON.stringify(favList))
    }
}