//menambah aksi untuk todo start
document.addEventListener('DOMContentLoaded',function () {// aksi
    const submitFrom = document.getElementById('form');
    submitFrom.addEventListener('submit', function (event) {
        event.preventDefault();
        addTodo();// dibbungkus disini
    }); 
});
//end

//buat fungsi todo start 
function addTodo() {
    const textTodo = document.getElementById('title').value;
    const timestamp = document.getElementById('date').value;

    const generatedID = generateId();
    const todoObject = generateTodoObject(generatedID,textTodo,timestamp,false);
    todos.push(todoObject);

    document.dispatchEvent(new Event(RENDER_EVENT));
}
//end

//menuliskan fungsi start
function generateId() {// untuk menghasilkan id
    return +new Date();//fungsi new Date untuk mengambil timestamp pada js
}
function generateTodoObject(id,task,timestamp,isCompleted) {//fubgsi untuk meng generate Todo yang baru
    return{
        id,
        task,
        timestamp,
        isCompleted
    }
}
//end

//implementasi start
const todos = [];//array yang berfungsi menampung data Todo
const RENDER_EVENT = 'render-todo';// custom event yang berfungsi merubah data pada todo(patokan/default)
//end

//buat listener RENDER_EVENT
document.addEventListener(RENDER_EVENT,function () {
    console.log(todos)//mencoba listener dengan mencetak todo
});

//pembuatan elemen yang akan di tampilakan di halaman web
function makeTodo(todoObject) {
    const textTitle = document.createElement('h2');
    textTitle.innerText = todoObject.task;
   
    const textTimestamp = document.createElement('p');
    textTimestamp.innerText = todoObject.timestamp;
   
    const textContainer = document.createElement('div');
    textContainer.classList.add('inner');
    textContainer.append(textTitle, textTimestamp);
   
    const container = document.createElement('div');
    container.classList.add('item', 'shadow');
    container.append(textContainer);
    container.setAttribute('id', `todo-${todoObject.id}`);
   
    return container; 
  }
  //panggil tampil halaman web
  document.addEventListener(RENDER_EVENT, function () {
    console.log(todos);
    const uncompletedTODOList = document.getElementById('todos');
    uncompletedTODOList.innerHTML = '';
   
    for (const todoItem of todos) {
      const todoElement = makeTodo(todoItem);
      uncompletedTODOList.append(todoElement);
    }
  });
