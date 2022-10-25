import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../src/containers/App';

describe('App', () => {
  test('App loads correctly', () => {
    render(<App />);

    const header = screen.getByRole("heading", { name: /Capacity Counter/i });
    expect(header).toBeVisible();

    const instructions = screen.getByText(/Please provide your venue's capacity./i);
    expect(instructions).toBeVisible();
    
    const capacityInput = screen.getByRole("textbox", { name: /Capacity/i });
    expect(capacityInput).toBeVisible();

    const startBtn = screen.getByRole("button", { name: /Start/i });
    expect(startBtn).toBeVisible();
  });
});