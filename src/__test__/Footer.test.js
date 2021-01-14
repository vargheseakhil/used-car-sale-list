import { render, screen } from '@testing-library/react';
import Footer from '../components/Footer';

describe('Footer view', () => {
  test('should load without crash', () => {
    render(<Footer />);
    const linkElement = screen.getByText('@ AUTO1 Group 2021');
    expect(linkElement).toBeInTheDocument();
  });
});