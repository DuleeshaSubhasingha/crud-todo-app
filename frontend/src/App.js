import React, { useEffect, useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);       // Todo list
  const [content, setContent] = useState("");   // Input field

  // Fetch todos on load
  useEffect(() => {
    const getTodos = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/todos`,
          { method: "GET" }
        );
        const data = await response.json();
        setTodos(data);
      } catch (error) {
        console.error("Failed to fetch todos:", error);
      }
    };

    getTodos();
  }, []);

  // Create new todo
  const createNewTodo = async (e) => {
    e.preventDefault();

  

    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/todos`, {
      method: "POST",
      body: JSON.stringify({ title: content }),
      headers: { "Content-type": "application/json" },
    });

    const newTodo = await res.json();

    setContent("");
    setTodos([...todos, newTodo]); // Add new todo to the list
  };



  const deleteTodo = async (todoId) => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/todos/${todoId}`,
      {
        metho9d: "DELETE" ,
      },
    );

    if (!response.ok) return;

    setTodos((prev) => prev.filter((todo) => todo._id !== todoId));
  };


  return (
    <main className="App">
      <div className="container">
        <h1 className="title">Task Manager</h1>

        <form className="todo-form" onSubmit={createNewTodo}>
          <input
            type="text"
            className="todo-input"
            placeholder="Add a new todo..."
            value={content}
            required
            onChange={(e) => setContent(e.target.value)}
          />
          <button type="submit" className="todo-button">
            Add Todo
          </button>
        </form>

        {todos.length > 0 ? (
          todos.map((todo, index) => (
            <div key={index}>
              <p>{todo.task || todo.title}</p>
              <p>{todo.status ? "completed" : "pending"}</p>
              <button onClick={() => deleteTodo(todo.id)}>delete</button>
            </div>
          ))
        ) : (
          <div>
            <p>No todo found</p>
          </div>
        )}
      </div>
    </main>
  );
}

export default App;
