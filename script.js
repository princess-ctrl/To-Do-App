'use strict';

const todoContainer = document.querySelector('.inner_container');
const inputTodo = document.querySelector('.input_todo');
const addTodoBtn = document.querySelector('.add_todo');
const todoList = document.querySelector('.todo_list');
const message = document.querySelector('.message');

message.classList.add('hidden');

//ADD EventListener that will take the user's task in a list by clicking on the add btn

const checkIcon = document.createElement('i');
checkIcon.classList.add('fa-solid', 'fa-circle-check', 'btn-small', 'check');

const editIcon = document.createElement('i');
editIcon.classList.add('fa-regular', 'fa-pen-to-square', 'edit', 'btn-small');

const deleteIcon = document.createElement('i');
deleteIcon.classList.add('fa-solid', 'fa-trash', 'delete', 'btn-small');

addTodoBtn.addEventListener('click', function (e) {
  e.preventDefault();

  if (inputTodo.value === '') {
    message.classList.remove('hidden');
    setTimeout(() => {
      message.classList.add('hidden');
    }, 3000);
  } else {
    if (inputTodo.todoItem) {
      // If it does, update the existing todo item
      inputTodo.todoItem.querySelector('span.todo__text').textContent =
        inputTodo.value;
      // Remove the reference
      inputTodo.todoItem = null;
    } else {
      let list = document.createElement('li');
      let span = document.createElement('span');
      span.classList.add('todo__text');
      span.innerHTML = inputTodo.value;
      list.appendChild(span);
      list.appendChild(checkIcon.cloneNode(true));
      list.appendChild(editIcon.cloneNode(true));
      list.appendChild(deleteIcon.cloneNode(true));
      todoList.appendChild(list);
    }
  }
  inputTodo.value = '';
});

//function to remove a to-do item
const removeTodoItem = function (listItem) {
  listItem.remove();
};

// Function to toggle the 'hidden' class
const toggleHiddenClass = function (element) {
  if (element.lastChild) {
    element.lastChild.classList.toggle('hidden');
  }
};

todoList.addEventListener('click', function (e) {
  // / Check if the clicked element is a delete icon
  if (e.target.classList.contains('delete')) {
    // Get the parent element (the to-do item)
    const listItem = e.target.parentNode;
    removeTodoItem(listItem);
    toggleHiddenClass(e.target);
  }

  //Edit

  if (e.target.classList.contains('edit')) {
    const todoItem = e.target.parentNode;
    const currentTodoItem = todoItem.querySelector('.todo__text');
    inputTodo.value = currentTodoItem.textContent;
    inputTodo.todoItem = todoItem;
  }

  //Check
  if (e.target.classList.contains('check')) {
    e.target.parentNode
      .querySelector('span.todo__text')
      .classList.toggle('checked');
  }
});
