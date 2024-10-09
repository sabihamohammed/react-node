import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import '../styles/Todo.css'; // Make sure this is correctly imported

const socket = io('http://localhost:3000'); // Make sure this matches your backend URL

const App = () => {
    const [todos, setTodos] = useState([]);
    const [task, setTask] = useState('');

    useEffect(() => {
        // Load existing todos when the component mounts
        socket.on('load todos', (loadedTodos) => {
            setTodos(loadedTodos);
        });

        // Add a new todo to the list when received from the server
        socket.on('add todo', (todo) => {
            setTodos((prevTodos) => [...prevTodos, todo]);
        });

        // Remove a todo from the list when removed from the server
        socket.on('remove todo', (index) => {
            setTodos((prevTodos) => prevTodos.filter((_, i) => i !== index));
        });

        // Toggle the completion status of a todo
        socket.on('complete todo', (index) => {
            setTodos((prevTodos) =>
                prevTodos.map((todo, i) =>
                    i === index ? { ...todo, completed: !todo.completed } : todo
                )
            );
        });

        return () => {
            socket.off('load todos');
            socket.off('add todo');
            socket.off('remove todo');
            socket.off('complete todo');
        };
    }, []);

    const handleAddTodo = () => {
        if (task.trim()) {
            const newTodo = { task, completed: false };
            socket.emit('add todo', newTodo);
            setTask(''); // Clear input after adding
        }
    };

    const handleRemoveTodo = (index) => {
        socket.emit('remove todo', index);
    };

    const handleCompleteTodo = (index) => {
        socket.emit('complete todo', index);
    };

    return (
        <div className="todo-app">
            <h1>Real-time To-Do List</h1>

            {/* Input for adding a new task */}
            <div className="todo-input">
                <input
                    type="text"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    placeholder="Add a new task"
                />
                <button onClick={handleAddTodo}>Add</button>
            </div>

            {/* Table to display the to-do list */}
            {todos.length > 0 && (
                <table className="todo-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Task</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {todos.map((todo, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td className={todo.completed ? 'completed' : ''}>
                                    {todo.task}
                                </td>
                                <td>
                                    {todo.completed ? 'Completed' : 'Pending'}
                                </td>
                                <td>
                                    <button
                                        className="complete-btn"
                                        onClick={() => handleCompleteTodo(index)}
                                    >
                                        {todo.completed ? 'Undo' : 'Complete'}
                                    </button>
                                    <button
                                        className="remove-btn"
                                        onClick={() => handleRemoveTodo(index)}
                                        style={{ marginLeft: '10px' }}
                                    >
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default App;
