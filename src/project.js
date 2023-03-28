export { project as default };

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
    pubSub.publish("todosChanged", todos);
  };

  return {
    getTitle,
    getTodos,
    addTodo,
    getTemplate,
  };
};
