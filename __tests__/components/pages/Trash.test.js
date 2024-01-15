import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Trash from '../../../components/pages/Trash'; // Adjust the path based on your project structure

const mockStore = configureStore([]);

describe('Trash Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      deleteTask: [
        { id: 1, taskName: 'Deleted Task 1' },
        { id: 2, taskName: 'Deleted Task 2' },
        // Add any other necessary state properties
      ],
    });
  });

  test('renders deleted tasks and search input', () => {
    render(
      <Provider store={store}>
        <Trash />
      </Provider>
    );

    // Check if deleted tasks are rendered
    const deletedTasks = screen.getAllByTestId('mui-card');
    expect(deletedTasks.length).toBe(2); // Update the count based on your initial state

    // Check if search input is rendered
    const searchInput = screen.getByPlaceholderText('Search Tasks...');
    expect(searchInput).toBeInTheDocument();
  });

  test('filters deleted tasks based on search input', () => {
    render(
      <Provider store={store}>
        <Trash />
      </Provider>
    );

    // Enter a search query
    const searchInput = screen.getByPlaceholderText('Search Tasks...');
    fireEvent.change(searchInput, { target: { value: 'Deleted Task 1' } });

    // Check if only filtered deleted tasks are rendered
    const deletedTasks = screen.getAllByTestId('mui-card');
    expect(deletedTasks.length).toBe(1);
  });

  test('filters completed tasks based on wrong search input', () => {
    render(
      <Provider store={store}>
        <Trash />
      </Provider>
    );
  
    // Enter a search query
    const searchInput = screen.getByPlaceholderText('Search Tasks...');
    fireEvent.change(searchInput, { target: { value: 'Deleted Task 3' } });
  
    // Check if only filtered completed tasks are rendered
    const noTasksMessage = screen.queryByText('No tasks found.');
    expect(noTasksMessage).toBeNull();
  });
});
