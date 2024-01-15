export const saveTask = (taskData) => ({
    type: 'SAVE_TASK',
    payload: taskData,
});

export const selectTaskToEdit = (taskId) => ({
    type: 'SELECT_TASK_TO_EDIT',
    payload: taskId,
});

export const updateTask = (taskData) => ({
    type: 'EDIT_TASK',
    payload: taskData,
});

export const completeTask = (taskId) => ({
    type: 'COMPLETE_TASK',
    payload: taskId,
});

export const deleteTask = (taskId) => ({
    type: 'DELETE_TASK',
    payload: taskId,
});