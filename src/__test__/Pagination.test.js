import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '../components/Pagination';
import AppContext from '../components/context';

const mockContext = {
    carsData: {
        totalPageCount: '10',
        totalCarsCount: '100',
    },
    filterObject : { page: 2 },
    setFilterObject: jest.fn(),
}

describe('Pagination view', () => {

  test('should load without crash and trigger button clicks properly', () => {
    render(
        <AppContext.Provider value={mockContext}>
                <Pagination />
        </AppContext.Provider>
    )
    expect(screen.getByTestId('pageInfo')).toHaveTextContent(`Page 2 of 10`)
    fireEvent.click(screen.getByText(/First/i))
    fireEvent.click(screen.getByText(/Previous/i))
    fireEvent.click(screen.getByText(/Next/i))
    fireEvent.click(screen.getByText(/Last/i))

    expect(mockContext.setFilterObject).toHaveBeenCalledTimes(4)

    })
})