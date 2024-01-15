
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Home from '../../../components/pages/Home';


const mockStore = configureStore([]);

describe('Home Component', () => {

  it('renders Home component with search input and no tasks', () => {
    const store = mockStore({
      saveTask: [],
    });

    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    // Check if search input is rendered
    const searchInput = screen.queryByPlaceholderText('Search Tasks...');
    expect(searchInput).toBeInTheDocument();

  });

  it('renders Home component with tasks and search input', () => {
    const store = mockStore({
      saveTask: [
        { id: 1, taskName: 'Task 1' },
        { id: 2, taskName: 'Task 2' },
      ],
    });

    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    // Check if search input is rendered
    const searchInput = screen.getByPlaceholderText('Search Tasks...');
    expect(searchInput).toBeInTheDocument();

    // Check if tasks are rendered
    const taskCards = screen.getAllByTestId('mui-card');
    expect(taskCards.length).toBe(2);

    const noTasksMessage = screen.queryByText('No tasks found.');
    expect(noTasksMessage).toBeNull();
  });

  it('filters tasks based on search input', () => {
    const store = mockStore({
      saveTask: [
        { id: 1, taskName: 'Task 1' },
        { id: 2, taskName: 'Task 2' },
      ],
    });

    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    // Enter a search query
    const searchInput = screen.getByPlaceholderText('Search Tasks...');
    fireEvent.change(searchInput, { target: { value: 'Task 1' } });

    // Check if only filtered tasks are rendered
    const taskCards = screen.getAllByTestId('mui-card');
    expect(taskCards.length).toBe(1);
  });

  it('handles no tasks found with search input', () => {
    const store = mockStore({
      saveTask: [
        { id: 1, taskName: 'Task 1' },
        { id: 2, taskName: 'Task 2' },
      ],
    });

    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    // Enter a search query that doesn't match any task
    const searchInput = screen.getByPlaceholderText('Search Tasks...');
    fireEvent.change(searchInput, { target: { value: 'Task 3' } });

    // Check if no tasks message is rendered
    const noTasksMessage = screen.queryByText('No tasks found.');
    expect(noTasksMessage).toBeNull();
  });
});

