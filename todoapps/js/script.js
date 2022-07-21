//menambah aksi untuk todo start
document.addEventListener('DOMContentLoaded',function () {// aksi
    const submitFrom = document.getElementById('form');
    submitFrom.addEventListener('submit', function (event) {
        event.preventDefault;
        addTodo();// dibbungkus disini
    }); 
});
//end

//buat fungsi todo start 
function addTodo() {
    const textTodo = document.getElementById('title').value;
    const timestamp = document.getElementById('date').value;

    const generatedID = generatedID();
    const todoObject = generateTodoObject(generatedID,textTodo,timestamp,false);
    todos.push(todoObject);

    document.dispatchEvent(new Event(RENDER_EVENT));
}

