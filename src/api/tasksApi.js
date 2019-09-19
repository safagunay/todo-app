import axios from "axios";

const USERID = window.location.pathname.substring(1);

axios.defaults.headers.common['userId'] = USERID;
console.log("Header userId set to:", USERID);
axios.interceptors.response.use(res => {
    console.log("Server response", res);
    return res;
})

export function checkAuth() {
    const req = axios({
        method: "get",
        url: "https://todoapp-api.safagunay.now.sh/tasks"
    });
    return req.then(res => {
        if (res.status === 200)
            return res.data;
    }).catch(err => {
        if (err.status === 401)
            return false;
        else
            return Promise.reject(err);
    });
}

export function loadTasks(query) {
    const req = axios({
        method: "get",
        url: "https://todoapp-api.safagunay.now.sh/tasks" + (query ? query : "")
    });
    return req.then(res => {
        if (res.status === 200)
            return res.data;
    });
}

export function createTask(task) {
    const req = axios({
        method: "post",
        url: "https://todoapp-api.safagunay.now.sh/tasks",
        data: task
    });
    return req.then(res => {
        if (res.status === 200)
            return res.data;
    });
}

export function updateTask(task) {
    const req = axios({
        method: "put",
        url: "https://todoapp-api.safagunay.now.sh/tasks",
        data: task
    });
    return req.then(res => {
        if (res.status === 200)
            return res.data;
    });
}

export function deleteTask(task) {
    const req = axios({
        method: "delete",
        url: "https://todoapp-api.safagunay.now.sh/tasks/" + task._id
    });
    return req.then(res => {
        if (res.status === 200)
            return res.data;
    });
}