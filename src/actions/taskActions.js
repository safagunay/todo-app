import * as types from './actionTypes';
import * as tasksApi from "../api/tasksApi";

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

export function deleteTaskSuccess(_id, tasks) {
    return { type: types.DELETE_TASK_SUCCESS, _id, tasks }
}

function createTaskTemp(task) {
    return function (dispatch) {
        return Promise.resolve(
            dispatch({
                type: types.CREATE_TASK_TEMP,
                task
            })
        );
    }
}

export function createTask(task) {
    return function (dispatch) {
        return dispatch(createTaskTemp(task)).then(() =>
            tasksApi.createTask(task).then(task => {
                dispatch(createTaskSuccess(task))
            }).catch(err => console.log(err)));
    };
}

export function loadTasks(query) {
    console.log("query", query);
    return function (dispatch) {
        return tasksApi.loadTasks(query).then(data => {
            dispatch(loadTasksSuccess(data, query))
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

export function deleteTask(_id, query) {
    return function (dispatch) {
        return tasksApi.deleteTask(_id, query).then((tasks) => {
            dispatch(deleteTaskSuccess(_id, tasks));
        }).catch(error => {
            console.log(error);
        })
    }
}







