import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom'
import NotFound from '../components/404';
import { logoUrl } from '../util/constants'

describe('404 view', () => {
    beforeEach(() => {
        render(<Router><NotFound /></Router>);
    });

  test('should load without crash', () => {
    render(<Router><NotFound /></Router>);
  });
  
  test('should load logo properly', () => {
    expect(screen.getByTestId('logo')).toHaveAttribute('src', logoUrl)
  });

  test('should load texts properly', () => {
    const notFoundText = screen.getByText('404 - Not Found');
    expect(notFoundText).toBeInTheDocument();

    const sorryText = screen.getByText(`Sorry, the page you're looking for doesn't exist`)
    expect(sorryText).toBeInTheDocument();
  });

});