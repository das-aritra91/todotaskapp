const initialState = {
    saveTask: [],
    completeTask: [],
    deleteTask: [],
    selectedTaskToEdit: null,
  };
  
  const Reducer = (state = initialState, action) => {
    debugger;
    let completeTask;
    let deleteTask;
  
    switch (action.type) {
      case 'SAVE_TASK':
        return {
          ...state,
          saveTask: [...state.saveTask, action.payload],
        };
  
      case 'SELECT_TASK_TO_EDIT':
        return {
          ...state,
          selectedTaskToEdit: action.payload,
        };
  
      case 'EDIT_TASK':
        return {
          ...state,
          saveTask: state.saveTask.map((data) =>
            data.id === state.selectedTaskToEdit ? { ...data, ...action.payload } : data
          ),
          selectedTaskToEdit: null,
        };
  
      case 'COMPLETE_TASK':
        completeTask = state.saveTask.find((data) => data.id === action.payload);
        return {
          ...state,
          saveTask: state.saveTask.filter((data) => data.id !== action.payload),
          completeTask: [...state.completeTask, completeTask],
        };
  
      case 'DELETE_TASK':
        deleteTask = state.saveTask.find((data) => data.id === action.payload);
        return {
          ...state,
          saveTask: state.saveTask.filter((data) => data.id !== action.payload),
          deleteTask: [...state.deleteTask, deleteTask],
        };
  
      default:
        return state;
    }
  };
  
  export default Reducer;
  
  // const initialState = {
//     saveTask: [],
//     completeTask: [],
//     deleteTask: [],
//     selectedTaskToEdit: null,
// };

// const Reducer = (state = initialState, action) => {
//     switch (action.type) {
//         case 'SAVE_TASK':
//             return {
//                 ...state,
//                 saveTask: [...state.saveTask, action.payload]
//             };
//             break;

//         case 'SELECT_TASK_TO_EDIT':
//             return {
//                 ...state,
//                 selectedTaskToEdit: action.payload,
//             };
//             break;

//         case 'EDIT_TASK':
//             return {
//                 ...state,
//                 saveTask: state.saveTask.map((data) => data.id === state.selectedTaskToEdit
//                     ? { ...data, ...action.payload } : data
//                 ),
//                 selectedTaskToEdit: null,
//             };
//             break;

//         case 'COMPLETE_TASK':
//             const completeTask = state.saveTask.find((data) => data.id === action.payload);
//             return {
//                 ...state,
//                 saveTask: state.saveTask.filter((data) => data.id !== action.payload),
//                 completeTask: [...state.completeTask, completeTask]
//             };
//             break;

//         case 'DELETE_TASK':
//             const deleteTask = state.saveTask.find((data) => data.id === action.payload);
//             return {
//                 ...state,
//                 saveTask: state.saveTask.filter((data) => data.id !== action.payload),
//                 deleteTask: [...state.deleteTask, deleteTask]
//             };
//             break;

//         default:
//             return state;
//     }
// }

// export default Reducer;

// const initialState = {
//     saveTask: [],
//     completeTask: [],
//     deleteTask: [],
//     selectedTaskToEdit: null,
//   };
  
//   const Reducer = (state = initialState, action) => {
//     switch (action.type) {
//       case 'SAVE_TASK':
//         return {
//           ...state,
//           saveTask: [...state.saveTask, action.payload],
//         };
  
//       case 'SELECT_TASK_TO_EDIT':
//         return {
//           ...state,
//           selectedTaskToEdit: action.payload,
//         };
  
//       case 'EDIT_TASK':
//         return {
//           ...state,
//           saveTask: state.saveTask.map((data) =>
//             data.id === state.selectedTaskToEdit ? { ...data, ...action.payload } : data
//           ),
//           selectedTaskToEdit: null,
//         };
  
//       case 'COMPLETE_TASK':
//         const completeTask = state.saveTask.find((data) => data.id === action.payload);
//         return {
//           ...state,
//           saveTask: state.saveTask.filter((data) => data.id !== action.payload),
//           completeTask: [...state.completeTask, completeTask],
//         };
  
//       case 'DELETE_TASK':
//         const deleteTask = state.saveTask.find((data) => data.id === action.payload);
//         return {
//           ...state,
//           saveTask: state.saveTask.filter((data) => data.id !== action.payload),
//           deleteTask: [...state.deleteTask, deleteTask],
//         };
  
//       default:
//         return state;
//     }
//   };
  
//   export default Reducer;