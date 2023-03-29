export { project as default };

import pubsub from "./pubSub.js";
import pubSub from "./pubSub.js";

const project = (title, newIcon) => {
  const todos = [];
  const icon = newIcon;
  const template = `<li class="flex gap-2 rounded-full pl-4 py-1" id="projectlist-item" data-project="${title}">
      <img src="${icon}" alt="" srcset="" />
      <button>${title}</button>
    </li>`;

  const getTitle = () => title;
  const getTodos = () => todos;
  const getTemplate = () => template;

  const addTodo = (newTodo) => {
    if (todos.includes(newTodo)) {
      alert("todo already added");
      return;
    }
    todos.push(newTodo);
    pubSub.publish("todosChanged", newTodo);
  };

  const removeTodo = (todoName) => {
    todos.forEach((todo) => {
      if (todo.getTitle() == todoName) {
        todos.splice(todos.indexOf(todo), 1);
        pubsub.publish("todosChanged");
      }
    });
  };

  return {
    getTitle,
    getTodos,
    addTodo,
    removeTodo,
    getTemplate,
  };
};
