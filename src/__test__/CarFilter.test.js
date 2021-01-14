import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import CarFilter from '../components/CarFilter'
import AppContext from '../components/context'


const mockContext = {
    setFilterObject: jest.fn(),
    filterOptions : {
      colors : ['green', 'black', 'white'],
      manufacturers: [{name: 'Audi'}, {name:'Benz'}]
    },
    filterObject: { color: 'black', manufacturer: 'Audi', page: 1 }
}


describe('CarFilter view', () => {
    beforeEach(() => {
        render(<AppContext.Provider value={mockContext}>
          <CarFilter />
        </AppContext.Provider>)

    });
  
  test('should trigger filter button properly', () => {
    const {setFilterObject , filterObject: {color, manufacturer, page}} = mockContext
    const filterButton =  screen.getByTestId('filter')
    expect(filterButton).toHaveTextContent('Filter')
    fireEvent.change(screen.getByTestId("color"), {
      target: { value: "green" },
    });
    fireEvent.click(filterButton)
    expect(setFilterObject).toBeCalledWith({color: 'green', manufacturer, page})
  });

  test('should change color value on change', async () => {
    fireEvent.change(screen.getByTestId("color"), {
        target: { value: "green" },
    });
    const select = await waitFor(() => screen.getByTestId('color'))
    expect(select).toHaveValue('green');
  })

  test('should change manufactorer value on change', async () => {
    fireEvent.change(screen.getByTestId("manufacturer"), {
        target: { value: "Audi" },
    });
    const select = await waitFor(() => screen.getByTestId('manufacturer'))
    expect(select).toHaveValue('Audi');
  })
  
});