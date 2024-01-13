import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, Button, DialogTitle, TextField, Alert } from '@mui/material';
import { useDispatch } from 'react-redux';
import { saveTask } from '../redux/actions/action';
import PropTypes from 'prop-types';

export const generateTaskId = () => {
        return Math.random().toString(36).substring(2, 15);
    };

const MuiModal = (props) => {

    const { open, handleClose } = props;

    const [taskName, setTaskName] = useState('');
    const [completionTime, setCompletionTime] = useState('');
    const [error, setError] = useState('');

    const dispatch = useDispatch();

    const handleSubmitClick = () => {
        if (taskName && completionTime) {
            const currentTime = new Date();
            const selectedTime = new Date(completionTime);

            if (selectedTime <= currentTime) {
                setError('Completion time should be greater than the current time.');
                return;
            }

            const taskDetailsToSave = {
                id: generateTaskId(),
                taskName: taskName,
                completionTime: completionTime
            }

            dispatch(saveTask(taskDetailsToSave));
            setTaskName('');
            setCompletionTime('');
            setError('');
            handleClose();

        } else if (!taskName && completionTime) {
            setError('Please enter a task.');
        } else if (taskName && !completionTime) {
            setError('Please enter a completion time.');
        } else {
            setError('Please enter a task and completion time.');
        }
    }

    const handleCloseDialog = () => {
        handleClose();
        setTaskName('');
        setCompletionTime('');
        setError('');
    }

    return (
        <>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle >Add Task</DialogTitle>

                <DialogContent>

                    <TextField
                        required
                        data-testid="taskname-input"
                        id="txtTask"
                        label="Task Name"
                        variant="standard"
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                    />

                    <br />

                    <TextField
                        id="txtDataTime"
                        data-testid="taskcompletiontime-input"
                        type="datetime-local"
                        variant="standard"
                        style={{ marginTop: '16px' }}
                        value={completionTime}
                        onChange={(e) => setCompletionTime(e.target.value)}
                        required
                    />

                    {error && <Alert severity="error" style={{ marginTop: '10px' }}>{error}</Alert>}

                </DialogContent>

                <DialogActions>
                    <Button onClick={handleSubmitClick} autoFocus>Add</Button>
                    <Button onClick={handleCloseDialog} >Cancel</Button>
                </DialogActions>

            </Dialog>

        </>)

}

MuiModal.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
  };

export default MuiModal;