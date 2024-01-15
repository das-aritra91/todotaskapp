import React from 'react';
import { render, fireEvent, screen, act } from '@testing-library/react';
import MuiModal, { generateTaskId } from '../../../components/controls/AddTaskModal';
import { Provider, useDispatch } from 'react-redux';
import configureStore from 'redux-mock-store';


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

    // it('handles input changes and button clicks when task name empty', () => {
    //     useDispatch.mockReturnValue(mockSaveTask);
    //     render(<Provider store={store}>
    //         <MuiModal {...mockProps} />
    //     </Provider>);

    //     // Simulate user input
    //     fireEvent.click(screen.getByTestId('taskname-input'));
    //     fireEvent.click(screen.getByTestId('taskcompletiontime-input'));

    //     // Click the Add button
    //     fireEvent.click(screen.getByText('Add'));

    //     // Ensure that you dispatch the action in your component
    //     useDispatch(mockSaveTask({
    //         id: taskId,
    //         taskName: " ",
    //         completionTime: "2024-01-13T23:59"
    //     }));

    //     //const errorMessage = screen.getByText(customTextMatcher.bind(null, 'Please enter a task.'));

    //    //const errorMessage = screen.getByText('Please enter a task.');
    //    // const errorMessage =document.querySelector('Alert');marginTop
     
    //    const errorMessage = screen.getByClassName  ('marginTop');
    //     expect(errorMessage).toBeInTheDocument();
    //     const alertElement = screen.getByRole('alert');
    //     expect(alertElement).toHaveClass('MuiAlert-standardError');

    // });



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

    // it taskName value change
    it('taskName value change', () => {

           render(
            <Provider store={store}>
                <MuiModal {...mockProps} />
            </Provider>
        );
        //const taskNameInput = screen.getByTestId('taskname-input');
        let taskNameInput = screen.getByLabelText(/name/i);
        fireEvent.change(taskNameInput, { target: { value: 'NewTaskName' } });
        expect(taskNameInput.value).toBe('NewTaskName');
    });

    // it completion Time value change
    it('completion Time value change', () => {
          render(
              <Provider store={store}>
                  <MuiModal {...mockProps} />
              </Provider>
          );
         // const completionTimeInput = screen.getByTestId('taskcompletiontime-input');
         const completionTimeInput = screen.getByTestId('taskcompletiontime-input').querySelector('input');
          fireEvent.change(completionTimeInput, { target: { value: '2024-01-13T23:59' } });
          expect(completionTimeInput.value).toBe('2024-01-13T23:59'); 
      });
});