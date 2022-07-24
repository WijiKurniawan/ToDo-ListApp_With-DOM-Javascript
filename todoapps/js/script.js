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

    if (todoObject.isCompleted) {
        const undoButton = document.createElement('button');
        undoButton.classList.add('undo-button');
     
        undoButton.addEventListener('click', function () {
          undoTaskFromCompleted(todoObject.id);
        });
     
        const trashButton = document.createElement('button');
        trashButton.classList.add('trash-button');
     
        trashButton.addEventListener('click', function () {
          removeTaskFromCompleted(todoObject.id);
        });
     
        container.append(undoButton, trashButton);
      } else {
        const checkButton = document.createElement('button');
        checkButton.classList.add('check-button');
        
        checkButton.addEventListener('click', function () {
          addTaskToCompleted(todoObject.id);
        });
        
        container.append(checkButton);
      }
   
    return container;
  }

//render Event
  document.addEventListener(RENDER_EVENT, function () {
    const uncompletedTODOList = document.getElementById('todos');
    uncompletedTODOList.innerHTML = '';
   
    const completedTODOList = document.getElementById('completed-todos');
    completedTODOList.innerHTML = '';

    for (const todoItem of todos) {
        const todoElement = makeTodo(todoItem);
        if (!todoItem.isCompleted)
          uncompletedTODOList.append(todoElement);
        else
          completedTODOList.append(todoElement);
      }
    });
// render event

// function ceklis Todo ke yang sudah dilakukan start 
  function addTaskToCompleted (todoId) {
    const todoTarget = findTodo(todoId);
   
    if (todoTarget == null) return;
   
    todoTarget.isCompleted = true;
    document.dispatchEvent(new Event(RENDER_EVENT));
  }

  function findTodo(todoId) {
    for (const todoItem of todos) {
      if (todoItem.id === todoId) {
        return todoItem;
      }
    }
    return null;
  }
// end

//function untuk hapus dan undo Todo start
function removeTaskFromCompleted(todoId) {
    const todoTarget = findTodoIndex(todoId);
   
    if (todoTarget === -1) return;
   
    todos.splice(todoTarget, 1);
    document.dispatchEvent(new Event(RENDER_EVENT));
  }
   
   
  function undoTaskFromCompleted(todoId) {
    const todoTarget = findTodo(todoId);
   
    if (todoTarget == null) return;
   
    todoTarget.isCompleted = false;
    document.dispatchEvent(new Event(RENDER_EVENT));
  }
// end

// function untuk Todo hapus dan undo
function removeTaskFromCompleted(todoId) {
    const todoTarget = findTodoIndex(todoId);
   
    if (todoTarget === -1) return;
   
    todos.splice(todoTarget, 1);
    document.dispatchEvent(new Event(RENDER_EVENT));
  }
   
   
  function undoTaskFromCompleted(todoId) {
    const todoTarget = findTodo(todoId);
   
    if (todoTarget == null) return;
   
    todoTarget.isCompleted = false;
    document.dispatchEvent(new Event(RENDER_EVENT));
  }
// end

// fix error fungsi find todoIndex tidak ditemukan
function findTodoIndex(todoId) {
    for (const index in todos) {
      if (todos[index].id === todoId) {
        return index;
      }
    }
   
    return -1;
  }
  // selesai buat function findTodoIndex