import React from 'react';
import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import App from '../src/containers/App';

describe('User can set capacity', () => {
  test.each`
    input    | testDesc
    ${"abc"} | ${"a non-numeric"}
    ${"0"}   | ${"0 for the"}
    ${"-20"} | ${"a negative number"}
  `('User cannot enter $testDesc capacity', ({ input }) => {
    render(<App />);

    const capacityInput = screen.getByRole("textbox", { name: /Capacity/i });
    user.type(capacityInput, input);

    const startBtn = screen.getByRole("button", { name: /Start/i });
    user.click(startBtn);

    expect(startBtn).toBeVisible();
    
    const errorMsg = screen.getByText(/The capacity you have supplied isn't valid. Please enter a positive number./i)
    expect(errorMsg).toBeVisible();
  });

  test('User can enter a valid numeric capacity', () => {
    render(<App />);
    
    const setCapacityInstructions = screen.getByText(/Please provide your venue's capacity./i);
    expect(setCapacityInstructions).toBeInTheDocument();

    const capacityInput = screen.getByRole("textbox", { name: /Capacity/i });
    user.type(capacityInput, "25");

    const startBtn = screen.getByRole("button", { name: /Start/i });
    user.click(startBtn);

    expect(setCapacityInstructions).not.toBeInTheDocument();
    expect(capacityInput).not.toBeInTheDocument();
    expect(startBtn).not.toBeInTheDocument();

    const updateVisitorsInstructions = screen
      .getByText(/Update the venue's current visitor count with the buttons below./i)
    expect(updateVisitorsInstructions).toBeVisible();
  });
});
