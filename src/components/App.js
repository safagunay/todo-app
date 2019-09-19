import React from 'react';
import Layout from "./Layout";
import AddTodo from "./AddTodo";
import TodoList from './TodoList';
import { connect } from "react-redux";
import { loadTasks } from "../actions/taskActions";
class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(loadTasks());
  }
  render() {
    return (
      <div className="App" >
        <Layout>
          <AddTodo />
          <TodoList />
        </Layout>
      </div>
    );
  }

}

export default connect()(App);
