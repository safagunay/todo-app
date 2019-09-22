import React, { memo } from 'react';
import { TextField, Paper, Button, Grid } from '@material-ui/core';
import { createTask, loadTasks } from "../actions/taskActions";
import { connect } from 'react-redux';
import AlertDialog from './AlertDialag';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Fab from '@material-ui/core/Fab';
import ResetIcon from '@material-ui/icons/Refresh';
import SelectStatus from './SelectStatus';

const AddToDo = memo(class AddTodo extends React.Component {
    constructor() {
        super();
        this.state = {
            title: "",
            search: "",
            errorMessage: null,
            filters: {
                completed: "all",
                reverseOrder: false
            }
        }
    }
    onInputChange = (event) => {
        this.setState({
            title: event.target.value
        })
    }
    onSearchInputChange = (event) => {
        this.setState({
            search: event.target.value
        })
    }
    saveTask = () => {
        var title = this.state.title;
        if (title) title = title.trim();
        if (!title) {
            this.setState({ errorMessage: "Title is required !" });
            return;
        }

        if (title.length <= 50) {
            const task = { _id: Date.now(), title: this.state.title };
            this.props.dispatch(createTask(task));
        }
        else {
            this.setState({
                errorMessage: "Title is too long !"
            })
        }
    }
    searchTask = () => {
        if (this.props.filtersApplied) {
            return this.applyFilters();
        }
        var keys = this.state.search.trim().replace(/\s+/g, ';');
        var query = "?search=" + keys;
        this.props.dispatch(loadTasks(query));
    }
    onClose = () => {
        this.setState({
            errorMessage: null
        });
    }
    completed = (val) => {
        this.setState(prevState => ({
            filters: {
                completed: val,
                reverseOrder: this.state.filters.reverseOrder
            }
        }));
    }
    reverseOrder = () => {
        this.setState(prevState => ({
            filters: {
                completed: prevState.filters.completed,
                reverseOrder: !prevState.filters.reverseOrder
            }
        }));
    }
    resetFilters = () => {
        this.setState({
            search: "",
            filters: {
                completed: "all",
                reverseOrder: false
            }
        })
        this.props.dispatch(loadTasks(""));
    }
    applyFilters = () => {
        var query = "?";
        if (this.state.search) {
            query += "search=" + this.state.search.trim().replace(/\s+/g, ';');
        }
        if (this.state.filters.completed !== "all")
            query += this.state.filters.completed === "complete" ? "&completed" : "&incompleted";
        query += this.state.filters.reverseOrder ? "&oldest" : "";
        this.props.dispatch(loadTasks(query));
    }
    render() {
        return (
            <Paper style={{ margin: 16, padding: 16 }}>
                {this.state.errorMessage ? <AlertDialog message={this.state.errorMessage} onClose={this.onClose} /> : null}
                <Grid container>
                    <Grid xs={9} md={11} item style={{ paddingRight: 16 }}>
                        <TextField
                            placeholder="Add Todo here"
                            onKeyPress={(event) => event.key === 'Enter' ? this.saveTask() : null}
                            value={this.state.title}
                            onChange={this.onInputChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid xs={2} md={1} item>
                        <Button
                            fullWidth
                            color="secondary"
                            variant="outlined"
                            onClick={this.saveTask}
                        >
                            Add
                        </Button>
                    </Grid>
                    <Grid xs={9} md={11} item style={{ paddingRight: 16 }}>
                        <TextField
                            placeholder="Search"
                            onKeyPress={(event) => event.key === 'Enter' ? this.searchTask() : null}
                            value={this.state.search}
                            onChange={this.onSearchInputChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid xs={2} md={1} style={{ marginTop: 8 }} item>
                        <Button
                            fullWidth
                            color="secondary"
                            variant="outlined"
                            onClick={this.searchTask}
                        >
                            Search
                        </Button>
                    </Grid>
                    <Grid md={2} style={{ marginTop: 8 }} item>
                        <SelectStatus onChange={this.completed} val={this.state.filters.completed} />
                    </Grid>
                    <Grid md={2} style={{ marginTop: 16 }} item>
                        <FormControlLabel
                            control={<Checkbox checked={this.state.filters.reverseOrder} onChange={this.reverseOrder} />}
                            label="Reverse Order"
                            onKeyPress={this.reverseOrder}
                        />
                    </Grid>
                    <Grid md={7} justify="center" style={{ marginTop: 8 }} item container>
                        <Fab onClick={this.resetFilters} color="primary" variant="extended" aria-label="Reset">
                            <ResetIcon />
                            Reset
                        </Fab>
                    </Grid>
                    <Grid md={1} style={{ marginTop: 8 }} item container>
                        <Button
                            fullWidth
                            color="secondary"
                            variant="outlined"
                            onClick={this.applyFilters}
                        >
                            Apply
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        )

    }
});

function mapStateToProps(state, ownProps) {
    var completed = state.query.includes("completed");
    var reverseOrder = state.query.includes("oldest");
    return {
        completed,
        reverseOrder,
        filtersApplied: Boolean(completed || reverseOrder)
    }
}

export default connect(mapStateToProps)(AddToDo);