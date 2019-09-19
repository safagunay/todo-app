import * as types from './actionTypes';
import * as tasksApi from "../api/tasksApi"

export function loadTasksSuccess(data, query) {
    data.query = query;
    return { type: types.LOAD_TASKS_SUCCESS, data };
}

export function updateTaskSuccess(task) {
    return { type: types.UPDATE_TASK_SUCCESS, task }
}

export function createTaskSuccess(task) {
    return { type: types.CREATE_TASK_SUCCESS, task }
}

export function deleteTaskSuccess(task) {
    return { type: types.DELETE_TASK_SUCCESS, task }
}

export function createTask(task) {
    return function (dispatch) {
        tasksApi.createTask(task).then(task => {
            return dispatch(createTaskSuccess(task))
        }).catch(err => console.log(err));
    };
}

export function loadTasks(query) {
    console.log("query", query);
    return function (dispatch) {
        tasksApi.loadTasks(query).then(data => {
            return dispatch(loadTasksSuccess(data, query))
        }).catch(err => console.log(err));
    };
}

export function updateTask(task) {
    return function (dispatch) {
        return tasksApi.updateTask(task).then(task => {
            dispatch(updateTaskSuccess(task));
        }).catch(error => {
            console.log(error);
        });
    };
}

export function deleteTask(task) {
    return function (dispatch) {
        return tasksApi.deleteTask(task).then(() => {
            console.log(`Deleted ${task.id}`)
            dispatch(loadTasks());
            return;
        }).catch(error => {
            console.log(error);
        })
    }
}







