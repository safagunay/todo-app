import React, { memo } from 'react';
import { List, Paper } from '@material-ui/core';
import { connect } from 'react-redux';
import { updateTask, deleteTask } from "../actions/taskActions";

import TodoListItem from './TodoListItem';

const TodoList = memo(class TodoList extends React.Component {
    onItemCheck(idx) {
        let task = this.props.tasks[idx];
        task.completedAt = !task.completedAt
        this.props.dispatch(updateTask(task));
    }
    onItemRemove(idx) {
        let task = this.props.tasks[idx];
        this.props.dispatch(deleteTask(task));
    }
    render = () => (
        <>
            {this.props.tasks.length > 0 && (
                <Paper style={{ margin: 16 }}>
                    <List style={{ overflow: 'scroll' }}>
                        {this.props.tasks.map((task, idx) => (
                            <TodoListItem
                                {...task}
                                key={task._id}
                                divider={idx !== this.props.tasks.length - 1}
                                onButtonClick={() => this.onItemRemove(idx)}
                                onCheckBoxToggle={() => this.onItemCheck(idx)}
                            />
                        ))}
                    </List>
                </Paper>
            )}
        </>
    );
});

function mapStateToProps(state, ownProps) {
    return {
        tasks: Object.assign([], state.tasks),
        page: state.page,
        query: state.query
    }
}

export default connect(mapStateToProps)(TodoList);