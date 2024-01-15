import taskReducer from '../../components/redux/reducers/reducer';


const initialState = {
  saveTask: [],
  completeTask: [],
  deleteTask: [],
  selectedTaskToEdit: null,
};

describe('taskReducer', () => {
  it('should return the initial state', () => {
    const result = taskReducer(undefined, {});
    expect(result).toEqual(initialState);
  });

  it('should handle SAVE_TASK', () => {
    const action = { type: 'SAVE_TASK', payload: { id: 1, text: 'New Task' } };
    const result = taskReducer(initialState, action);

    expect(result.saveTask).toHaveLength(1);
    expect(result.saveTask[0]).toEqual({ id: 1, text: 'New Task' });
  });

  it('should handle SELECT_TASK_TO_EDIT', () => {
    const action = { type: 'SELECT_TASK_TO_EDIT', payload: 1 };
    const result = taskReducer(initialState, action);

    expect(result.selectedTaskToEdit).toEqual(1);
  });

  // it('should handle EDIT_TASK', () => {
  //   const initialStateForEdit = {
  //     ...initialState,
  //     saveTask: [{ id: 1, text: 'Task to edit' }],
  //     selectedTaskToEdit: 1,
  //   };
  //   const action = { type: 'EDIT_TASK', payload: { text: 'Edited Task' } };

  //   const result = taskReducer(initialStateForEdit, action);

  //   expect(result.saveTask).toHaveLength(1);
  //   expect(result.saveTask[0]).toEqual({ id: 1, text: 'Edited Task' });
  //   expect(result.selectedTaskToEdit).toBeNull();
  // });

  // it('should handle EDIT_TASK', () => {
  //   const initialStateForEdit = {
  //     ...initialState,
  //     saveTask: [{ id: 1, text: 'Task to edit' }],
  //     selectedTaskToEdit: 1,
  //   };
  //   const action = { type: 'EDIT_TASK', payload: { text: 'Edited Task' } };

  //   const result = taskReducer(initialStateForEdit, action);

  //   expect(result.saveTask).toHaveLength(1);
  //   expect(result.saveTask[0]).toEqual({ id: 1, text: 'Edited Task' });
  //   //expect(result.selectedTaskToEdit).toEqual({ id: 1, text: 'Task to edit' });
  //   expect(result.selectedTaskToEdit).toBe();
  // });
  

  test('EDIT_TASK should update the task in saveTask array', () => {
    const initialState = {
      saveTask: [
        { id: 1, taskName: 'Task 1' },
        { id: 2, taskName: 'Task 2' },
      ],
      selectedTaskToEdit: 1,
    };
  
    const action = {
      type: 'EDIT_TASK',
      payload: { id: 1, taskName: 'Updated Task 1' },
    };
  
    const newState = taskReducer(initialState, action);
  
    expect(newState).toEqual({
      saveTask: [
        { id: 1, taskName: 'Updated Task 1' },
        { id: 2, taskName: 'Task 2' },
      ],
      selectedTaskToEdit: null,
    });
  });
  
  // Test case for false scenario (no task selected for editing)
  test('EDIT_TASK should not update any task if no task is selected for editing', () => {
    const initialState = {
      saveTask: [
        { id: 1, taskName: 'Task 1' },
        { id: 2, taskName: 'Task 2' },
      ],
      selectedTaskToEdit: null,
    };
  
    const action = {
      type: 'EDIT_TASK',
      payload: { id: 1, taskName: 'Updated Task 1' },
    };
  
    const newState = taskReducer(initialState, action);
  
    // Expect the state to remain unchanged
    expect(newState).toEqual({
      saveTask: [
        { id: 1, taskName: 'Task 1' },
        { id: 2, taskName: 'Task 2' },
      ],
      selectedTaskToEdit: null,
    });
  });



  it('should handle COMPLETE_TASK', () => {
    const initialStateForComplete = {
      ...initialState,
      saveTask: [{ id: 1, text: 'Task to complete' }],
    };
    const action = { type: 'COMPLETE_TASK', payload: 1 };

    const result = taskReducer(initialStateForComplete, action);

    expect(result.saveTask).toHaveLength(0);
    expect(result.completeTask).toHaveLength(1);
    expect(result.completeTask[0]).toEqual({ id: 1, text: 'Task to complete' });
  });

  it('should handle DELETE_TASK', () => {
    const initialStateForDelete = {
      ...initialState,
      saveTask: [{ id: 1, text: 'Task to delete' }],
    };
    const action = { type: 'DELETE_TASK', payload: 1 };

    const result = taskReducer(initialStateForDelete, action);

    expect(result.saveTask).toHaveLength(0);
    expect(result.deleteTask).toHaveLength(1);
    expect(result.deleteTask[0]).toEqual({ id: 1, text: 'Task to delete' });
  });
});
