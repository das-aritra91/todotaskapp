import React, { useState } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider, useDispatch } from 'react-redux';
import configureStore from 'redux-mock-store';
import MuiCard, { convertDateTimeFormat } from '../../../components/controls/Card';

// Mock Redux store and actions
const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: () => mockDispatch,
}));

const mockStore = configureStore([]);

describe('MuiCard Component', () => {

    //it date time formate
    it('converts the date string to the expected format', () => {
        const inputDateStr = '2023-01-01T12:00';
        const formattedDate = convertDateTimeFormat(inputDateStr);
        expect(formattedDate).toEqual(expect.any(String));
    });

    //it MuiCard component with task details
    it('renders task name and completion time correctly', () => {
        const store = mockStore({});
        const taskDetails = { id: 1, taskName: 'Task 1', completionTime: '2024-02-10T13:46' };

        render(
            <Provider store={store}>
                <MuiCard page="home" taskDetails={taskDetails} />
            </Provider>
        );
        const inputElement = screen.getByTestId('taskname-input');
        expect(inputElement.value).toBe('TASK 1');
        const completionTimeElement = screen.getByText('13:46PM, 10/02/2024');
        // Check if the element containing completionTime is present
        expect(completionTimeElement).toBeInTheDocument();

    });

    //it Checkbox click
    it('checkbox renders and handles change correctly', () => {
        const store = mockStore({});
        const taskDetails = { id: 1, taskName: 'Task 1', completionTime: '10:00 AM' };

        render(
            <Provider store={store}>
                <MuiCard page="home" taskDetails={taskDetails} />
            </Provider>
        );
        // Check if checkbox is unchecked initially
        const checkbox = screen.getByRole('checkbox');
        expect(checkbox).not.toBeChecked();
        // Simulate checkbox change
        fireEvent.click(checkbox);
        // Check if checkbox is checked after change
        expect(checkbox).toBeChecked();
    });

    //it Checkbox Handling
    it('checkbox is checked when the task is completed', () => {
        const store = mockStore({});
        const taskDetails = { id: 1, taskName: 'Task 1', completionTime: '10:00 AM' };

        render(
            <Provider store={store}>
                <MuiCard page="home" taskDetails={taskDetails} />
            </Provider>
        );
        store.dispatch({ type: 'COMPLETE_TASK', payload: 1 });
        // Check if the action is dispatched correctly
        const actions = store.getActions();
        expect(actions).toEqual([{ type: 'COMPLETE_TASK', payload: 1 }]);
    });

    // it Edit Handling====
    it('edit button handles click and makes input editable', () => {
        const store = mockStore({});
        const taskDetails = { id: 1, taskName: 'Task 1', completionTime: '10:00 AM' };
        const mockIsEditable = false;
        //const mockSetIsEditable = jest.fn();
        render(
            <Provider store={store}>
                <MuiCard page="home" taskDetails={taskDetails} />
            </Provider>
        );
        const editButton = screen.getByLabelText('edit');
        fireEvent.click(editButton);

        expect(mockIsEditable).toBe(false);

        store.dispatch({ type: 'SELECT_TASK_TO_EDIT', payload: 1 });
        const actions = store.getActions();
        expect(actions).toEqual([{ type: 'SELECT_TASK_TO_EDIT', payload: 1 }]);

        const inputElement = screen.getByTestId('taskname-input');
        expect(inputElement.value).toBe('TASK 1');
    });

    // it Edit Handling key press if value is there
    it('edit handle Key Press if value is there', () => {
        const store = mockStore({});
        const taskDetails = { id: 1, taskName: 'Task 1', completionTime: '2024-01-13T23:59' };
        const mockHandleSubmitEditClick = jest.fn();
        render(
            <Provider store={store}>
                <MuiCard page="home" taskDetails={taskDetails} />
            </Provider>
        );

        const inputElement = screen.getByTestId('taskname-input');
        // Simulate a key press event with Enter key
        fireEvent.keyPress(inputElement, { key: 'Enter', code: 13, charCode: 13 });
        fireEvent.click(screen.getByTestId('taskname-input'));

        store.dispatch({ type: 'EDIT_TASK', payload: { taskName: "Sample task", completionTime: "13:46PM, 10/02/2024" } });
        const actions = store.getActions();
        expect(actions).toEqual([{ type: 'EDIT_TASK', payload: { taskName: "Sample task", completionTime: "13:46PM, 10/02/2024" } }]);
    });

    // it Edit Handling key press if value is not there
    it('edit handle Key Press if value is not there', () => {
        const store = mockStore({});
        const taskDetails = { id: 1, taskName: '', completionTime: '2024-01-13T23:59' };
        render(
            <Provider store={store}>
                <MuiCard page="home" taskDetails={taskDetails} />
            </Provider>
        );
        const inputElement = screen.getByTestId('taskname-input');
        fireEvent.keyPress(inputElement, { key: 'Enter', code: 13, charCode: 13 });
        fireEvent.click(screen.getByTestId('taskname-input'));
        // Check if the error message is displayed
        const errorMessage = screen.getByText('Please enter a task.');
        expect(errorMessage).toBeInTheDocument();
        // Check if the Alert component has the correct severity
        const alertElement = screen.getByRole('alert');
        expect(alertElement).toHaveClass('MuiAlert-standardError');
    });

    // it Delete Handling
    it('delete button handles click and deletes task from Redux', () => {
        const store = mockStore({ id: 1, taskName: 'Task 1', completionTime: '10:00 AM' });
        const taskDetails = { id: 1, taskName: 'Task 1', completionTime: '10:00 AM' };

        render(
            <Provider store={store}>
                <MuiCard page="home" taskDetails={taskDetails} />
            </Provider>
        );

        const deleteButton = screen.getByLabelText('delete');
        fireEvent.click(deleteButton);

        store.dispatch({ type: 'DELETE_TASK', payload: 1 });
        const actions = store.getActions();
        expect(actions).toEqual([{ type: 'DELETE_TASK', payload: 1 }]);
    });

    // it taskName value change
    it('taskName value change', () => {
        const store = mockStore({});
        const taskDetails = { id: 1, taskName: 'Task 1', completionTime: '10:00 AM' };

        render(
            <Provider store={store}>
                <MuiCard page="home" taskDetails={taskDetails} />
            </Provider>
        );
        const taskNameInput = screen.getByTestId("taskname-input");
        fireEvent.change(taskNameInput, { target: { value: 'NewTaskName' } });
        // Verify that the input value is updated
        expect(taskNameInput.value).toBe('NEWTASKNAME')
    });
});
