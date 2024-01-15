import React from 'react';
import { render, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import TaskReminder from '../../../components/controls/TaskReminders';
import { NotificationContainer, NotificationManager } from 'react-notifications';

// Mocking react-notifications library
jest.mock('react-notifications', () => ({
  NotificationContainer: jest.fn(() => null),
  NotificationManager: {
    warning: jest.fn(),
  },
}));

const mockStore = configureStore([]);

describe('TaskReminder Component', () => {

  jest.useFakeTimers();

  // beforeEach(() => {
  //   jest.clearAllMocks(); // Reset mocks before each test
  // });

  it('renders TaskReminder component and triggers task reminder notification', async () => {
    const mockTasks = [
      { id: 1, taskName: 'Task 1', completionTime: new Date().getTime() + 300000 }, // 5 minutes from now
    ];

    const store = mockStore({
      saveTask: mockTasks,
    });

    render(
      <Provider store={store}>
        <TaskReminder />
      </Provider>
    );

    // Wait for the notification to be triggered
    await act(async () => {
      jest.advanceTimersByTime(10000); // Advance time by 10 seconds to trigger the interval
      jest.advanceTimersByTime(5000);  // Advance time by 5 seconds to trigger the notification
    });

    // Check if NotificationManager.warning was called with any arguments
    expect(NotificationManager.warning).toHaveBeenCalled();

  });

  it('should show a warning notification when a task is 5 minutes away from completion', async () => {
    const mockTask = [
      {
        taskName: 'Sample Task',
        completionTime: new Date().getTime() + 5 * 60 * 1000 - 1000, // 5 minutes - 1 second
      },
    ];

    const store = mockStore({
      saveTask: mockTask,
    });

    jest.useFakeTimers(); // Ensure fake timers are used

    render(
      <Provider store={store}>
        <TaskReminder />
      </Provider>
    );

    // Simulate the passage of time by advancing timers
    act(() => {
      jest.advanceTimersByTime(10000); // Advance time by 10 seconds
    });

    // Check if NotificationManager.warning was called with any arguments
    expect(NotificationManager.warning).toHaveBeenCalled();
  });

  it('should call NotificationManager.warning when saveTask is not empty', () => {
    const mockTask = [
      {
        taskName: 'Sample Task',
        completionTime: new Date().getTime() + 5 * 60 * 1000 - 1000, // 5 minutes - 1 second
      },
    ];

    const store = mockStore({
      saveTask: mockTask,
    });

    jest.useFakeTimers(); // Ensure fake timers are used

    render(
      <Provider store={store}>
        <TaskReminder />
      </Provider>
    );

    // Simulate the passage of time by advancing timers
    act(() => {
      jest.advanceTimersByTime(10000); // Advance time by 10 seconds
    });

    // Check if NotificationManager.warning was called with any arguments
    expect(NotificationManager.warning).toHaveBeenCalled();
  });

  it('should not call NotificationManager.warning when saveTask is empty', () => {
    jest.clearAllMocks();
    const store = mockStore({
      saveTask: [], // Empty array
    });

    jest.useFakeTimers(); // Ensure fake timers are used

    render(
      <Provider store={store}>
        <TaskReminder />
      </Provider>
    );

    // Advance timers by 10 seconds
    act(() => {
      jest.advanceTimersByTime(10000);
    });

    // Make assertions
    act(() => {
      // Check if NotificationManager.warning is not called
      expect(NotificationManager.warning).not.toHaveBeenCalled();
    });
  });

});
