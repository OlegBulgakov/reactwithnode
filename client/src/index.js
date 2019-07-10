import React from "react";
import ReactDOM from "react-dom"
import TodoList from "./Components/TodoList/TodoList";
import "./index.css";

const destination = document.querySelector('#container');

ReactDOM.render(
    <div>
        <h1>todos</h1>
        <TodoList />
    </div>,
    destination
);