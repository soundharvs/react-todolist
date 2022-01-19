import React, { useState, useRef, useEffect } from "react";
import TodoList from "./TodoList";
import  uuid from 'react-uuid';
import { stringify } from "uuid";

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos]= useState([])
  const todoNameRef = useRef()

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if(storedTodos) setTodos(storedTodos)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, stringify(todos))
  }, [todos])

  function toggleTodo(id){
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function handleAddtodo(e){
    const name = todoNameRef.current.value
    if( name === '') return
    setTodos(prevTodos =>{
      return [...prevTodos, {id: uuid(), name: name, complete: false}]
    })
    todoNameRef.current.value = null
  }

  function handleClearTodos(){
    const newTodos = todos.filter(todo => !todo.complete)
      setTodos(newTodos)
  }

  return (
    <>
      <TodoList todos= {todos} toggleTodo={toggleTodo} />
      <input ref={todoNameRef} type= "text" />
      <button onClick={handleAddtodo}>Add Todo</button>
      <button onClick={handleClearTodos}>Clear Complete</button>
      <div>{todos.filter(todo => !todo.complete).length}0 left to do</div>
    </>
  )
}

export default App;
