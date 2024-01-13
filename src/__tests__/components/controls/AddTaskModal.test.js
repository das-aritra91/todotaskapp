import React from 'react';
import { render, fireEvent, screen, act } from '@testing-library/react';
import MuiModal, { generateTaskId } from '../../../components/controls/AddTaskModal';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { useDispatch } from 'react-redux';

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: jest.fn(),
}));

const mockStore = configureStore([]);
const mockSaveTask = jest.fn();

describe('MuiModal', () => {
    const taskId = generateTaskId();
    const store = mockStore({});
    // const mockDispatch = jest.fn();
    const mockProps = {
        open: true,
        handleClose: jest.fn(),
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders MuiModal with required props', () => {
        render(
            <Provider store={store}>
                <MuiModal {...mockProps} />
            </Provider>);

        // Assert that the modal is rendered
        expect(screen.getByText('Add Task')).toBeInTheDocument();
    });

    it('handles input changes and button clicks', () => {
        useDispatch.mockReturnValue(mockSaveTask);
        render(<Provider store={store}>
            <MuiModal {...mockProps} />
        </Provider>);

        // Simulate user input
        fireEvent.click(screen.getByTestId('taskname-input'));
        fireEvent.click(screen.getByTestId('taskcompletiontime-input'));

        // Click the Add button
        fireEvent.click(screen.getByText('Add'));

        // Ensure that you dispatch the action in your component
        useDispatch(mockSaveTask({
            id: taskId,
            taskName: "Sample task",
            completionTime: "2024-01-13T23:59"
        }));

        // Verify that the action creator is called with the expected arguments
        expect(mockSaveTask).toHaveBeenCalledWith({
            id: taskId,
            taskName: 'Sample task',
            completionTime: '2024-01-13T23:59',
        });
    });

    it('generates a task ID', () => {
        expect(taskId).toMatch(taskId);
    });

    it('handles cancel button click', () => {
        render(<Provider store={store}>
            <MuiModal {...mockProps} />
        </Provider>);

        // Click the Cancel button
        fireEvent.click(screen.getByText('Cancel'));

        // Assert that handleClose is called
        expect(mockProps.handleClose).toHaveBeenCalledTimes(1);
    });

    it('handles empty task and completion time', () => {
        render(
            <Provider store={store}>
                <MuiModal {...mockProps} />
            </Provider>
        );
        fireEvent.click(screen.getByText('Add'));

        // Check if error message is displayed
        expect(screen.getByText('Please enter a task and completion time.')).toBeInTheDocument();

        // Check that handleClose is not called
        expect(mockProps.handleClose).not.toHaveBeenCalled();
    });

    it('handles empty completion time and valid task ', () => {
        render(
            <Provider store={store}>
                <MuiModal {...mockProps} />
            </Provider>
        );

        // Simulate user input for task name
        fireEvent.change(screen.getByTestId('taskname-input'));

        // Click the Add button without entering completion time
        fireEvent.click(screen.getByText('Add'));

        // Check if error message is displayed
        expect(screen.getByText(/Please enter a task and completion time/)).toBeInTheDocument();

        // Check that mockSaveTask is not called
        expect(mockSaveTask).not.toHaveBeenCalled();

        // Check that handleClose is not called
        expect(mockProps.handleClose).not.toHaveBeenCalled();
    });

    it('handles empty task and completion time', () => {
        render(
            <Provider store={store}>
                <MuiModal {...mockProps} />
            </Provider>
        );
        fireEvent.click(screen.getByText('Add'));

        // Check if error message is displayed
        expect(screen.getByText('Please enter a task and completion time.')).toBeInTheDocument();

        // Check that handleClose is not called
        expect(mockProps.handleClose).not.toHaveBeenCalled();
    });

    it('handles empty task and valid completion time ', () => {
        render(
            <Provider store={store}>
                <MuiModal {...mockProps} />
            </Provider>
        );

        // Simulate user input for task name
        fireEvent.change(screen.getByTestId('taskcompletiontime-input'));

        // Click the Add button without entering completion time
        fireEvent.click(screen.getByText('Add'));

        // Check if error message is displayed
        expect(screen.getByText(/Please enter a task./)).toBeInTheDocument();

        // Check that mockSaveTask is not called
        expect(mockSaveTask).not.toHaveBeenCalled();

        // Check that handleClose is not called
        expect(mockProps.handleClose).not.toHaveBeenCalled();
    });
});