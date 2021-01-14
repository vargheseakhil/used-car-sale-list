import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, waitFor, fireEvent } from '@testing-library/react';
import { shape } from 'prop-types'
import CarDetail from '../components/CarDetail';
import { checkIsFavourite } from '../util/utils'

const props = {
    match: {
        params: { stockNo: '10035' }
    }
}

describe('Car Detail view', () => {
  let originFetch;
  beforeEach(() => {
    originFetch = global.fetch;
  });
  afterEach(() => {
    global.fetch = originFetch;
  });
  it('should load car details properly', async () => {
    const fakeResponse = { car: { color: "white", fuelType: "Diesel", manufacturerName: "Audi" } };
    const mockResponse = { json: jest.fn().mockResolvedValueOnce(fakeResponse) };
    const mockedFetch = jest.fn().mockResolvedValueOnce(mockResponse);
    global.fetch = mockedFetch;
    const { getByTestId } = render(<CarDetail {...props} />);
    const div = await waitFor(() => getByTestId('carDetails'));
    expect(div).toHaveTextContent(fakeResponse.car.color);
    expect(mockedFetch).toBeCalledTimes(1);
    expect(mockResponse.json).toBeCalledTimes(1);
  });

  it('should load error if fetch call fails', async () => {
    const fakeResponse = { error: ' Not Found' };
    const mockResponse = { json: jest.fn().mockRejectedValueOnce(fakeResponse) };
    const mockedFetch = jest.fn().mockRejectedValueOnce(mockResponse);
    global.fetch = mockedFetch;
    const { getByTestId } = render(<CarDetail {...props} />);
    const div = await waitFor(() => getByTestId('carDetails'));
    expect(div).toHaveTextContent('Oops, something went wrong..');
    expect(mockedFetch).toBeCalledTimes(1);
  });

  it('should check favourite list', () => {
      const ifFav = checkIsFavourite(props.stockNo)
      expect(ifFav).toBe(null)
  })

  it('should trigger add or remove to favourite', async () => {
    const fakeResponse = { car: { color: "white", fuelType: "Diesel", manufacturerName: "Audi" } };
    const mockResponse = { json: jest.fn().mockResolvedValueOnce(fakeResponse) };
    const mockedFetch = jest.fn().mockResolvedValueOnce(mockResponse);
    global.fetch = mockedFetch;
    const { getByText } = render(<CarDetail {...props} />);
    const saveButton = await waitFor(() => getByText('Save'))
    await fireEvent.click(saveButton)
    expect(saveButton).toHaveTextContent('Remove')
    const removeButton = await waitFor(() => getByText('Remove'))
    await fireEvent.click(removeButton)
    expect(removeButton).toHaveTextContent('Save')
  })

});
