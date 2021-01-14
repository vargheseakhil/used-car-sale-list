import { render, screen } from '@testing-library/react';
import App from './App';

describe('App loading', () => {
  test('Loading without crash', () => {
    render(<App />);
    const linkElement = screen.getByText('Purchase');
    expect(linkElement).toBeInTheDocument();
  });

});
