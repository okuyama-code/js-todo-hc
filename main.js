// 'load'は"イベントの種別"。'load' イベントは、ウェブページやドキュメントの読み込みが完了した後に発火
window.addEventListener('load', () => {
	todos = JSON.parse(localStorage.getItem('todos')) || [];
  // HTML文書内で最初に見つかるidが 'name' の要素を取得すし、nameInputに代入する
  const nameInput = document.querySelector('#name');
  const newTodoForm = document.querySelector('#new-todo-form');

  const username = localStorage.getItem('username') || '';

  // ユーザー名の初期値としてローカルストレージから取得した値をセット
  nameInput.value = username;


// 名前の入力が変更された際のイベントリスナーを追加
  nameInput.addEventListener('change', e => {
    localStorage.setItem('username', e.target.value);
  })

  newTodoForm.addEventListener('submit', e => {
    // console.log(e.target);
    // console.log(e.target.elements);
    // console.log(e.target.elements.category1);
    // console.log(e.target.elements.content);
    e.preventDefault();

    const todo = {
      content: e.target.elements.content.value,
      category: e.target.elements.category.value,
      done: false,
      createdAt: new Date().getTime()
    }

    if (todo.content) {
      todos.push(todo);
    }

    // JSON形式の文字列に変換する
    localStorage.setItem('todos', JSON.stringify(todos));

    e.target.reset();

    DisplayTodos();
  })
  DisplayTodos();
})  

function DisplayTodos () {
  const todoList = document.querySelector('#todo-list');

  // ToDoリストが空になる
  todoList.innerHTML = '';

  todos.forEach(todo => {
    const todoItem = document.createElement('div');
    todoItem.classList.add('todo-item');

    const label = document.createElement('label');
    const input = document.createElement('input');
    const span = document.createElement('span');
    const content = document.createElement('div');
    const actions = document.createElement('div');
    const edit = document.createElement('button');
    const deleteButton = document.createElement('button');

    input.type = 'checkbox';
    input.checked = todo.done;
    span.classList.add('bubble')
    if (todo.category == 'personal') {
      span.classList.add('personal');
    } else {
      span.classList.add('business');
    }

    content.classList.add('todo-content');
    actions.classList.add('actions');
    edit.classList.add('edit');
    deleteButton.classList.add('delete');

    content.innerHTML = `<input type="text" value="${todo.content}" readonly />`;
    edit.innerHTML = 'Edit'
    deleteButton.innerHTML = 'Delete';

    label.appendChild(input);
    label.appendChild(span);
    // console.log(label);
    actions.appendChild(edit);
    actions.appendChild(deleteButton);
    // console.log(actions);
    todoItem.appendChild(label);
    todoItem.appendChild(content);
    todoItem.appendChild(actions);
    // console.log(todoItem);

    todoList.appendChild(todoItem);

    if (todo.done) {
      todoItem.classList.add('done')
    }

    input.addEventListener('change', (e) => {
      todo.done = e.target.checked;
      localStorage.setItem('todos', JSON.stringify(todos));

      if (todo.done) {
        todoItem.classList.add('done');
      } else {
        todoItem.classList.remove('done');
      }

      DisplayTodos();
    })

    edit.addEventListener('click', (e) => {
      const input = content.querySelector('input');
       // input要素のreadonly属性を削除し、フォーカスを当てる
      input.removeAttribute('readonly');
      input.focus();

       // input要素がフォーカスを失ったときのblurイベントを追加
      input.addEventListener('blur', (e) => {
        input.setAttribute('readonly', true);
        todo.content = e.target.value;

        localStorage.setItem('todos', JSON.stringify(todos));
        DisplayTodos();
      })
    })

  })

}




// 削除確認
// let result = confirm('削除しますか');

// if(result){
//   console.log('削除しました');
// }else{
//   console.log('削除をとりやめました');
// }
