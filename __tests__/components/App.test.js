import { render, screen } from '@testing-library/react';
import App from '../../components/App';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);

describe('App Component', () => {
    it('renders App component with TaskReminders', () => {
        const store = mockStore({});

        render(
            <Provider store={store}>
                <App />
            </Provider>
        );

        // Check if TaskReminders component is rendered
        const taskRemindersElement = screen.getByTestId('task-reminders');
        expect(taskRemindersElement).toBeInTheDocument();

        // Check if Routing component is rendered
        const routingElement = screen.getByTestId('routing');
        expect(routingElement).toBeInTheDocument();

        // Check if MuiButton component is rendered
        const muiButtonElement = screen.getByTestId('mui-button');
        expect(muiButtonElement).toBeInTheDocument();
    });
});