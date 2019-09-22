import React from 'react';
import { List, Paper } from '@material-ui/core';
import { connect } from 'react-redux';
import { updateTask, deleteTask } from "../actions/taskActions";

import TodoListItem from './TodoListItem';

class TodoList extends React.Component {
    itemUpdate = (updateInfo) => {
        if (updateInfo.deleted) {
            this.props.dispatch(deleteTask(updateInfo._id, this.props.query));
        }
        else {
            let task = this.props.tasks.find(
                task => task._id === updateInfo._id
            );
            if (!task) throw Error("TodoList and TodoListItems are not synchronized!");
            if (updateInfo.checked !== undefined) task.completedAt = updateInfo.checked;
            if (updateInfo.title) task.title = updateInfo.title;
            this.props.dispatch(updateTask(task));
        }
    }

    componentDidUpdate() {
        console.log("list did update:", this.props.tasks);
    }
    render = () => (
        <>
            {this.props.tasks.length > 0 && (
                <Paper style={{ margin: 16 }}>
                    <List style={{ overflow: 'scroll' }} >
                        {this.props.tasks.map((task, idx) => (
                            <TodoListItem
                                {...task}
                                key={task._id}
                                divider={idx !== this.props.tasks.length - 1}
                                onItemUpdate={(updateInfo) => this.itemUpdate(updateInfo)}
                            />
                        ))}
                    </List>
                </Paper>
            )}
        </>
    );
};

function mapStateToProps(state, ownProps) {
    return {
        tasks: Object.assign([], state.tasks),
        page: ownProps.page ? ownProps.page : "" + state.page,
        query: ownProps.query ? ownProps.query : "" + state.query
    }
}

export default connect(mapStateToProps)(TodoList);