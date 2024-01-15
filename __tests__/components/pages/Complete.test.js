import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Complete from '../../../components/pages/complete';

const mockStore = configureStore([]);

describe('Complete Component', () => {

  it('renders Complete component with search input and no tasks', () => {
    const store = mockStore({
      completeTask: [],
    });

    render(
      <Provider store={store}>
        <Complete />
      </Provider>
    );

    // Check if search input is rendered
    const searchInput = screen.queryByPlaceholderText('Search Tasks...');
    expect(searchInput).toBeInTheDocument();

  });

  it('renders Home component with tasks and search input', () => {
    const store = mockStore({
      completeTask: [
        { id: 1, taskName: 'Completed Task 1' },
        { id: 2, taskName: 'Completed Task 2' },
      ],
    });

    render(
      <Provider store={store}>
        <Complete />
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

  it('filters completed tasks based on search input', () => {
    const store = mockStore({
      completeTask: [
        { id: 1, taskName: 'Completed Task 1' },
        { id: 2, taskName: 'Completed Task 2' },
      ],
    });
    render(
      <Provider store={store}>
        <Complete />
      </Provider>
    );

    // Enter a search query
    const searchInput = screen.getByPlaceholderText('Search Tasks...');
    fireEvent.change(searchInput, { target: { value: 'Completed Task 1' } });

    // Check if only filtered completed tasks are rendered
    const completedTasks = screen.getAllByTestId('mui-card');
    expect(completedTasks.length).toBe(1);
  });

  it('filters completed tasks based on wrong search input', () => {
    const store = mockStore({
      completeTask: [
        { id: 1, taskName: 'Completed Task 1' },
        { id: 2, taskName: 'Completed Task 2' },
      ],
    });
    render(
      <Provider store={store}>
        <Complete />
      </Provider>
    );

    // Enter a search query
    const searchInput = screen.getByPlaceholderText('Search Tasks...');
    fireEvent.change(searchInput, { target: { value: 'Completed Task 3' } });

    // Check if only filtered completed tasks are rendered
    const noTasksMessage = screen.queryByText('No tasks found.');
    expect(noTasksMessage).toBeNull();
  });
});


