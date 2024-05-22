import { useState } from "react";

const GetTodos = () => {
  const [id, setId] = useState("");
  const [error, setError] = useState(false);
  const [todo, setTodo] = useState(undefined);

  const getTodos = async (e) => {
    e.preventDefault();

    if (id < 0 || id > 200 || id.trim().length === 0 || id == 0) {
      setError(true);
      setId("");
      return;
    }

    const response = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${id}`
    );
    const data = await response.json();
    setTodo(data);
    setError(false);
    setId("");
  };

  return (
    <div className='todo-container'>
      <h1>Todo List</h1>
      <form onSubmit={getTodos}>
        <input
          type='number'
          placeholder='Enter search id between 1 to 200'
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <button type='submit'>Search</button>
      </form>
      <div className='container'>
        <h1>Result</h1>
        {error && <h2>Please enter an valid id. (eg: 1,2,3,4,...,200)</h2>}
        {todo && (
          <div className='card'>
            <h3>id : {todo.id}</h3>
            <h3>userId : {todo.userId}</h3>
            <p>{todo.title}</p>
            <span>{todo.completed ? "Completed" : "Not Completed"}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default GetTodos;
