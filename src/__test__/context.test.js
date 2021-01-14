import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, waitFor } from '@testing-library/react';
import { Provider } from '../components/context';


describe('Provider view', () => {
  let originFetch;
  beforeEach(() => {
    originFetch = global.fetch;
  });
  afterEach(() => {
    global.fetch = originFetch;
  });
  test('should fetch all data properly', async () => {
    const fakeResponse = {
        colors : ['green', 'black', 'white']
    };
    const mockResponse = { json: jest.fn().mockResolvedValueOnce(fakeResponse) };
    const mockedFetch = jest.fn().mockResolvedValueOnce(mockResponse);
    global.fetch = mockedFetch;
    await waitFor(() => render(
    <Provider />
    ));
    expect(mockedFetch).toBeCalledTimes(3);
  });

});