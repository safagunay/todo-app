import React from 'react';

import {
    ListItem,
    Checkbox,
    IconButton,
    ListItemText,
    ListItemSecondaryAction,
} from '@material-ui/core';
import DeleteOutlined from '@material-ui/icons/DeleteOutlined';

class TodoListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: Boolean(props.completedAt),
            deleted: false,
            title: props.title
        }
    }
    onCheckBoxClick = () => {
        this.setState(prevState => {
            this.props.onItemUpdate({
                _id: this.props._id,
                checked: !prevState.checked
            })
            return {
                checked: !prevState.checked
            }
        });
    }
    //setState function is not sync !
    onDeleteClick = () => {
        this.setState({
            deleted: true
        })
        this.props.onItemUpdate({
            _id: this.props._id,
            deleted: true
        });
    }
    render = () => {
        if (this.state.deleted) return null
        return (
            <ListItem divider={this.props.divider}>
                <Checkbox
                    onClick={() => this.onCheckBoxClick()}
                    checked={this.state.checked}
                    disableRipple
                />
                <ListItemText primary={this.state.title} />
                <ListItemSecondaryAction>
                    <IconButton aria-label="Delete Todo" onClick={() => this.onDeleteClick()}>
                        <DeleteOutlined />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        )
    }
}

export default TodoListItem;