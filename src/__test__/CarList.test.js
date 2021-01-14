import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom'
import CarList from '../components/CarList';
import AppContext from '../components/context'

const mockContext = {
    carsData: {
        cars: [{
            manufacturerName: 'Audi',
            modelName: 'A7',
            stockNumber: '10037',
            fuelType: 'Petrol' ,
            mileage: {number: '100', unit: 'km'},
            color: 'yellow'
        }],
        totalPageCount: '10',
        totalCarsCount: '100',
    },
    filterObject : { page: 1 }
}


describe('Car List view', () => {

  test('should load list and page details', () => {
    render(
        <AppContext.Provider value={mockContext}>
            <Router>
                <CarList />
            </Router>
        </AppContext.Provider>
    )
    expect(screen.getByTestId('resultInfo')).toHaveTextContent(`Showing 1 to 10 of 100 results`)
    })

    test('should load error if API fails', () => {
        render(
            <AppContext.Provider value={{...mockContext, isError: true}}>
                <Router>
                    <CarList />
                </Router>
            </AppContext.Provider>
        )
        expect(screen.getByText(`Oops, something went wrong..`)).toBeInTheDocument()
    })
})