// controllers/todoController.js

let todoList = []; // Global to-do list shared by all clients

// Function to load all todos to a new client
const loadTodos = (socket) => {
    socket.emit('load todos', todoList);
};

// Function to add a new todo
const addTodo = (io, todo) => {
    todoList.push(todo);
    io.emit('add todo', todo); // Notify all clients
};

// Function to remove a todo
const removeTodo = (io, index) => {
    todoList.splice(index, 1);
    io.emit('remove todo', index); // Notify all clients
};

// Function to mark a todo as complete
const completeTodo = (io, index) => {
    todoList[index].completed = !todoList[index].completed;
    io.emit('complete todo', index); // Notify all clients
};

module.exports = {
    loadTodos,
    addTodo,
    removeTodo,
    completeTodo
};
