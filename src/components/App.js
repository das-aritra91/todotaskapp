import React, { Component } from "react";
import '../components/style/index.css'
import { Paper } from '@mui/material';
import Routing from '../components/layout/Routing'
import MuiButton from '../components/controls/FloatingAddButton';
import TaskReminders from '../components/controls/TaskReminders';

class App extends Component {
    render() {
        return (
            <>
                <div data-testid="task-reminders">
                    <TaskReminders />
                </div>

                <div className='App'>
                    <Paper sx={{ padding: '32px' }}>
                        <>
                        <div data-testid="routing"><Routing /></div>
                        <div data-testid="mui-button"><MuiButton /></div>
                        </>
                    </Paper>
                </div>
            </>
        )
    }
}

export default App;