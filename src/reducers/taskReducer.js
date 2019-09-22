import * as types from '../actions/actionTypes';
import initialState from './initialState';


export default function taskReducer(state = initialState, action) {
    console.log("Store will update with action:", action);
    switch (action.type) {
        case types.LOAD_TASKS_SUCCESS:
            return {
                tasks: Object.assign([], action.data.tasks),
                page: "1",
                query: "" + action.query,
                hasMore: action.data.tasks.length === action.data.resPerPage
            };
        case types.LOAD_MORE_TASKS_SUCCESS:
            const tasks = [...state.tasks];
            const moreTasks = [...action.data.tasks];
            const combinedTasks = tasks.concat(moreTasks);
            const nextState = {
                tasks: combinedTasks,
                page: "" + (+state.page + 1),
                query: "" + state.query,
                hasMore: action.data.tasks.length === action.data.resPerPage
            }
            return nextState;
        case types.CREATE_TASK_SUCCESS:
            return {
                tasks: [
                    Object.assign({}, action.task),
                    ...state.tasks.slice(1),
                ],
                page: "" + state.page,
                query: state.query,
                hasMore: state.hasMore
            }
        case types.CREATE_TASK_TEMP:
            return {
                tasks: [
                    Object.assign({}, action.task),
                    ...state.tasks
                ],
                page: state.page,
                query: state.query,
                hasMore: state.hasMore
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
                query: state.query,
                hasMore: state.hasMore
            }
        case types.DELETE_TASK_SUCCESS: {
            const newTasks = Object.assign([], action.tasks);
            return {
                tasks: newTasks,
                page: state.page,
                query: state.query,
                hasMore: state.hasMore
            }

        }
        default:
            return state;
    }
}
