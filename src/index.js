import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import store from './store/configureStore';
import { checkAuth } from "./api/tasksApi";
import { loadTasks } from "./actions/taskActions";


async function startApp() {
    var authenticated = false;
    try {
        authenticated = await checkAuth();
    } catch (err) {
        console.log(err);
    }
    if (authenticated) {
        await store.dispatch(loadTasks(""));
        ReactDOM.render(
            <Provider store={store}>
                <App />
            </Provider>,
            document.getElementById('root'));
    }
    else {
        ReactDOM.render(<h4>{"Invalid Url !"}</h4>, document.getElementById('root'));
    }
}

startApp();



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
