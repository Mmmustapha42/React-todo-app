import React, {useState, useRef, useEffect} from 'react';
import TodoList from './components/TodoList';

function App() {
  const [todos, setTodos] = useState([])
  //const [id, setId] = useState()
  const todoNameRef = useRef()

  const LOCAL_STORAGE_KEY = 'todoApp.todos'

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function toggleTodo(){
    const newTodo = [...todos]
    const todo = newTodo.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodo)
  }
  

  function handleAddTodo(e) {
    const name = todoNameRef.current.value
    if(name === '')return
    console.log(name)
    setTodos(prevTodos => {
      return [...prevTodos, {id: 1, name: name, complete: false}]
    })
    todoNameRef.current.value = null
  }

  return (
    <>
    <TodoList todos={todos}/>
    <input ref={todoNameRef} type='text'></input>
    <button onClick={handleAddTodo}> Add Todo</button>
    <button> Clear Completed Todo</button>
    <div> {todos.filter(todo => !todo.complete).length} left to do</div>
    </>
  );
}

export default App;
