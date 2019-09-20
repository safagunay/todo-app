import * as types from '../actions/actionTypes';
import initialState from './initialState';


export default function taskReducer(state = initialState, action) {
    console.log("Store will update with action:", action);
    switch (action.type) {
        case types.LOAD_TASKS_SUCCESS:
            return {
                tasks: Object.assign([], action.data.tasks),
                page: action.data.page,
                query: Object.assign("", action.data.query)
            };
        case types.CREATE_TASK_SUCCESS:
            return {
                tasks: [
                    Object.assign({}, action.task),
                    ...state.tasks.slice(1),
                ],
                page: state.page,
                query: Object.assign("", state.query)
            }
        case types.CREATE_TASK_TEMP:
            return {
                tasks: [
                    Object.assign({}, action.task),
                    ...state.tasks
                ],
                page: "" + state.page,
                query: Object.assign("", state.query)
            }
        case types.UPDATE_TASK_SUCCESS:
            const indexOfTaskToUpdate = state.tasks.findIndex(
                task => task._id === action.task._id
            );
            const updatedTask = Object.assign({}, action.task);
            const tasksCopy = Object.assign([], state.tasks);
            tasksCopy.splice(indexOfTaskToUpdate, 1, updatedTask);
            return {
                tasks: tasksCopy,
                page: state.page,
                query: Object.assign("", state.query)
            }
        case types.DELETE_TASK_SUCCESS: {
            const newTasks = Object.assign([], action.tasks);
            return {
                tasks: newTasks,
                page: "" + state.page,
                query: Object.assign("", state.query)
            }

        }
        default:
            return state;
    }
}
