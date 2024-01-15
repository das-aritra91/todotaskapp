import {
    saveTask,
    selectTaskToEdit,
    updateTask,
    completeTask,
    deleteTask,
  } from '../../components/redux/actions/action';
  
  describe('Task Actions', () => {
    it('should create an action to save a task', () => {
      const taskData = { id: 1, text: 'New Task' };
      const expectedAction = {
        type: 'SAVE_TASK',
        payload: taskData,
      };
  
      expect(saveTask(taskData)).toEqual(expectedAction);
    });
  
    it('should create an action to select a task for editing', () => {
      const taskId = 1;
      const expectedAction = {
        type: 'SELECT_TASK_TO_EDIT',
        payload: taskId,
      };
  
      expect(selectTaskToEdit(taskId)).toEqual(expectedAction);
    });
  
    it('should create an action to update a task', () => {
      const taskData = { id: 1, text: 'Updated Task' };
      const expectedAction = {
        type: 'EDIT_TASK',
        payload: taskData,
      };
  
      expect(updateTask(taskData)).toEqual(expectedAction);
    });
  
    it('should create an action to complete a task', () => {
      const taskId = 1;
      const expectedAction = {
        type: 'COMPLETE_TASK',
        payload: taskId,
      };
  
      expect(completeTask(taskId)).toEqual(expectedAction);
    });
  
    it('should create an action to delete a task', () => {
      const taskId = 1;
      const expectedAction = {
        type: 'DELETE_TASK',
        payload: taskId,
      };
  
      expect(deleteTask(taskId)).toEqual(expectedAction);
    });
  });
  