import React, { useState } from 'react';
import { Card, CardContent, Typography, CardActions, IconButton, Checkbox, Alert } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import { selectTaskToEdit, updateTask, completeTask, deleteTask } from '../../components/redux/actions/action';
import '../style/Card.css';
import PropTypes from 'prop-types';

export const convertDateTimeFormat = (inputStr) => {
    const inputDate = new Date(inputStr);
    const formattedDate =
        ("0" + inputDate.getHours()).slice(-2) +
        ":" +
        ("0" + inputDate.getMinutes()).slice(-2) +
        (inputDate.getHours() < 12 ? "AM" : "PM") +
        ", " +
        ("0" + inputDate.getDate()).slice(-2) +
        "/" +
        ("0" + (inputDate.getMonth() + 1)).slice(-2) +
        "/" +
        inputDate.getFullYear();
    return formattedDate;
};

const MuiCard = (props) => {
    const { page, taskDetails } = props;
    const [taskName, setTaskName] = useState(taskDetails.taskName);
    const [isEditable, setIsEditable] = useState(false);
    const [error, setError] = useState('');
    const dispatch = useDispatch();

    const handleChange = (taskId) => {
        dispatch(completeTask(taskId));
    };

    const onDelete = (taskId) => {
        dispatch(deleteTask(taskId));
    }

    const onEdit = (taskId) => {
        setIsEditable(true);
        dispatch(selectTaskToEdit(taskId));
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSubmitEditClick(event.target.value);
        }
    };
    const handleChangeTaskName = (event) => {
        setTaskName(event.target.value);
    };

    const handleSubmitEditClick = (newTaskName) => {
        if (!newTaskName) {
            setError('Please enter a task.');
        } else {
            const taskDetailsToEdit = {
                taskName: newTaskName,
                completionTime: taskDetails.completionTime
            }

            dispatch(updateTask(taskDetailsToEdit));
            setIsEditable(false);
            setError('');
        }
    }

    return (
        <>
            <Card
                key={taskDetails.id}
                style={{
                    margin: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                }}>

                <CardContent
                    style={{ display: 'flex', alignItems: 'center' }}>
                    {page.includes("home") ? (
                        <Checkbox
                            // checked={checked}
                            onChange={() => handleChange(taskDetails.id)}
                            style={{ paddingLeft: "0px" }}
                        />
                    ) : null}
                    <Typography
                        style={{ marginLeft: '8px', textTransform: 'uppercase' }}>
                        <input
                            type="text"
                            // variant="standard"
                            value={taskName.toUpperCase()}
                            onChange={handleChangeTaskName}
                            readOnly={!isEditable}
                            onKeyPress={handleKeyPress}
                            className={isEditable ? 'input-editable' : 'input-non-editable'}
                        />
                        <br />
                        {convertDateTimeFormat(taskDetails.completionTime)}
                        {error && <Alert severity="error" style={{ marginTop: '10px' }}>{error}</Alert>}
                    </Typography>
                </CardContent>
                {page.includes("home") ? (
                    <CardActions>
                        <IconButton
                            aria-label="edit"
                            onClick={() => onEdit(taskDetails.id)}>
                            <EditIcon />
                        </IconButton>
                        <IconButton
                            aria-label="delete"
                            onClick={() => onDelete(taskDetails.id)}>
                            <DeleteIcon />
                        </IconButton>
                    </CardActions>
                ) : (
                    null
                )}
            </Card>
        </>
    )
}

MuiCard.propTypes = {
    page: PropTypes.string.isRequired, // Example type, adjust as needed
    taskDetails: PropTypes.shape({
      taskName: PropTypes.string.isRequired,
      completionTime: PropTypes.string.isRequired, // Example type, adjust as needed
    //   id: PropTypes.number.isRequired, // Example type, adjust as needed
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    }).isRequired,
  };

export default MuiCard;