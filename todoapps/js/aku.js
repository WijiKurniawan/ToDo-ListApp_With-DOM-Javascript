document.addEventListener('DOMContentLoaded', function () {
    const submitForm = document.getElementById('form');
    submitForm.addEventListener('submit', function(event) {
     event.preventDefault();
     addTodo();
    });
    function addTodo() {
     const todos = [];
     const RENDER_EVENT = 'render-todo';
 
     const textTodo = document.getElementById('title');
     const timestamp = document.getElementById('date').value;
     const generateID = generateId();
     const todoObject = generateTodoObject(generateID, textTodo, timestamp, false);
     todos.push(todoObject);
     document.dispatchEvent(new Event(RENDER_EVENT));
     document.addEventListener(RENDER_EVENT, function() {
         console.log(todos);
     });
    }
    function generateId() {
     return +new Date();
    }
    function generateTodoObject(id, task, timestamp, isCompleted) {
    return {
     id,
     task,
     timestamp,
     isCompleted
    } 
    }
 });
 