import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import MuiButton from '../../../components/controls/FloatingAddButton';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);

describe('MuiButton Component', () => {
    const store = mockStore({});
    it('renders without crashing', () => {
        render(<Provider store={store}>
            <MuiButton />
        </Provider>);
    });

    it('opens the modal when the button is clicked', () => {
        // const store = mockStore({});
        render(<Provider store={store}>
            <MuiButton />
        </Provider>);
        const addButton = screen.getByTestId('add-button');

        fireEvent.click(addButton);

        const modal = screen.getByTestId('modal');
        expect(modal).toBeInTheDocument();
    });


    it('renders MuiButton component and opens/closes modal on click', async () => {
        // const store = mockStore({});
        render(
            <Provider store={store}>
                <MuiButton />
            </Provider>
        );

        // Check if MuiButton component is rendered
        const fabButton = screen.getByRole('button');
        expect(fabButton).toBeInTheDocument();

        // Check if modal is initially closed
        const modal = screen.queryByRole('dialog');
        expect(modal).not.toBeInTheDocument();

        // Click the MuiButton to open the modal
        fireEvent.click(fabButton);

        // Wait for the modal to be open
        await waitFor(() => {
            const openedModal = screen.getByRole('dialog');
            expect(openedModal).toBeInTheDocument();
        });

        // Click the close button to close the modal
        const closeButton = await screen.findByRole('button', { name: /Cancel/i });
        fireEvent.click(closeButton);

        // Wait for the modal to be closed
        await waitFor(() => {
            const closedModal = screen.queryByRole('dialog');
            expect(closedModal).not.toBeInTheDocument();
        });
    });
});

