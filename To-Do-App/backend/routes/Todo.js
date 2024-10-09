// routes/todoRoutes.js

const todoController = require('../controllers/To-doController');

module.exports = (io, socket) => {
    console.log('A user connected');
    
    // Load existing todos when a client connects
    todoController.loadTodos(socket);

    // Event for adding a new todo
    socket.on('add todo', (todo) => {
        todoController.addTodo(io, todo);
    });

    // Event for removing a todo
    socket.on('remove todo', (index) => {
        todoController.removeTodo(io, index);
    });

    // Event for completing a todo
    socket.on('complete todo', (index) => {
        todoController.completeTodo(io, index);
    });
};
