import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders welcome message', () => {
  render(<App />);

  // Assert that the welcome message is rendered
  const welcomeMessage = screen.getByText(/Welcome to/i);
  expect(welcomeMessage).toBeInTheDocument();

  // Assert that the "trAIder" text is rendered
  const trAIderText = screen.getByText(/trAIder/i);
  expect(trAIderText).toBeInTheDocument();

  // Assert that the DataDownloadForm component is rendered
  const dataDownloadForm = screen.getByTestId('data-download-form');
  expect(dataDownloadForm).toBeInTheDocument();
});
