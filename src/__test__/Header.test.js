import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom'
import Header from '../components/Header';
import { logoUrl } from '../util/constants'

describe('Header view', () => {
    beforeEach(() => {
        render(<Router><Header /></Router>);
    });

  test('should load all menus', () => {
    const purchaseLink = screen.getByText('Purchase');
    expect(purchaseLink).toBeInTheDocument();

    const sellLink = screen.getByText('Sell');
    expect(sellLink).toBeInTheDocument();

    const linkElement = screen.getByText('MyOrders');
    expect(linkElement).toBeInTheDocument();
  });

  test('should load logo properly', () => {
    expect(screen.getByTestId('logo')).toHaveAttribute('src', logoUrl)
  });
});