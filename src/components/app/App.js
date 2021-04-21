import './App.css';
import Header from '../header/Header'
import Todos from '../todos/Todos'
import AddTodo from '../add-todo/AddTodo'

import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="app">
      <Header />

      <Switch>
        <Route path="/" exact component={Todos} />
        <Route path="/add-todo" exact component={() => <AddTodo role="add"  />} />
        <Route path="/update-todo/:todoId" exact component={() => <AddTodo role="update"  />} />
      </Switch>
      {/* <h1>Hello, World</h1> */}
    </div>
  );
}

export default App;
