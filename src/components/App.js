import React from 'react';
import Layout from "./Layout";
import AddTodo from "./AddTodo";
import TodoList from './TodoList';
import withInfiniteScroll from './hoc/InfiniteScrollList';
class App extends React.Component {
  render() {
    const InfiniteScrollList = withInfiniteScroll(TodoList);
    return (
      <div className="App" >
        <Layout>
          <AddTodo />
          <InfiniteScrollList />
        </Layout>
      </div>
    );
  }

}

export default App;
