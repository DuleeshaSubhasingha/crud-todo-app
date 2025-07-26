import React, { useEffect, useState } from "react";

function App() {
  const [todo, setTodo] = useState([]); // ✅ Declare state

  useEffect(() => {
    const getTodos = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/todos`,
          { method: "GET" }
        );
        const data = await response.json(); // ✅ Parse JSON
        setTodo(data); // ✅ Save to state
      } catch (error) {
        console.error("Failed to fetch todos:", error);
      }
    };

    getTodos(); // ✅ Call the function
  }, []);

  return (
    <div className="App">
      <h1>Task Manager</h1>

      <div>
        {todo.length > 0 ? (
          todo.map((todo, index) => (
            <div key={index}>
              <p>{todo.task}</p>
              <p>{todo.status ? "completed" : "pending"}</p>
            </div>
          ))
        ) : (
          <div>
            <p>No todo found</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
