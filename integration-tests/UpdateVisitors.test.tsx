import React from 'react';
import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import App from '../src/containers/App';

const clickButtonRepeatedly = async (element: HTMLElement, count: number) => {
  for(let i = 0; i < count; i += 1) {
    user.click(element);
  }
}

describe('User can update visitors', () => {
  test('User cannot set visitor count below 0', () => {
    render(<App />);

    const capacityInput = screen.getByRole("textbox", { name: /Capacity/i });
    user.type(capacityInput, "25");

    const startBtn = screen.getByRole("button", { name: /Start/i });
    user.click(startBtn);

    const visitorCount = screen.getByText(/Your venue currently has 0 visitors/i);
    expect(visitorCount).toBeVisible();

    const removeVisitorBtn = screen.getByRole("button", { name: /Remove Visitor/i });
    user.click(removeVisitorBtn);

    expect(visitorCount).toHaveTextContent(/Your venue currently has 0 visitors/i);
  });

  test('User can update capacity', () => {
    render(<App />);

    const capacityInput = screen.getByRole("textbox", { name: /Capacity/i });
    user.type(capacityInput, "25");

    const startBtn = screen.getByRole("button", { name: /Start/i });
    user.click(startBtn);

    const visitorCount = screen.getByText(/Your venue currently has 0 visitors/i);

    const addVisitorBtn = screen.getByRole("button", { name: /Add Visitor/i });
    clickButtonRepeatedly(addVisitorBtn, 10);
    expect(visitorCount).toHaveTextContent(/Your venue currently has 10 visitors/i);
    
    const removeVisitorBtn = screen.getByRole("button", { name: /Remove Visitor/i });
    clickButtonRepeatedly(removeVisitorBtn, 3);

    expect(visitorCount).toHaveTextContent(/Your venue currently has 7 visitors/i);
  });

  test('User cannot set visitor count above capacity', () => {
    render(<App />);

    const capacityInput = screen.getByRole("textbox", { name: /Capacity/i });
    user.type(capacityInput, "25");

    const startBtn = screen.getByRole("button", { name: /Start/i });
    user.click(startBtn);

    const visitorCount = screen.getByText(/Your venue currently has 0 visitors/i);

    const addVisitorBtn = screen.getByRole("button", { name: /Add Visitor/i });
    clickButtonRepeatedly(addVisitorBtn, 25);
    expect(visitorCount).toHaveTextContent(/Your venue currently has 25 visitors/i);

    user.click(addVisitorBtn);
    expect(visitorCount).toHaveTextContent(/Your venue currently has 25 visitors/i);
  });
});
