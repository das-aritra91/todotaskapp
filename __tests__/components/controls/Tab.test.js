import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import MuiTab from '../../../components/controls/Tab';

describe('MuiTab component', () => {
  test('renders MuiTab correctly', () => {
    render(
      <Router>
        <MuiTab />
      </Router>
    );

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Completed')).toBeInTheDocument();
    expect(screen.getByText('Trash')).toBeInTheDocument();
  });

  test('changes active tab on click', () => {
    render(
      <Router>
        <MuiTab />
      </Router>
    );

    fireEvent.click(screen.getByText('Completed'));

    expect(screen.getByRole('tab', { name: 'Completed' }).getAttribute('aria-selected')).toBe('true');
    expect(screen.getByRole('tab', { name: 'Home' }).getAttribute('aria-selected')).toBe('false');
    expect(screen.getByRole('tab', { name: 'Trash' }).getAttribute('aria-selected')).toBe('false');
  });

  // Add more tests as needed
});
