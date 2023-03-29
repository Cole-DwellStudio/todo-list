export { displayManager as default };

import pubSub from "./pubSub";
import projectManager from "./projectManager";
import todo from "./todo.js";
import { format, parseISO, formatISO } from "date-fns";

//import images
import crownIcon from "./assets/icon-project-crown.svg";
import schoolIcon from "./assets/icon-project-school.svg";
import swordIcon from "./assets/icon-project-sword.svg";
import dollarIcon from "./assets/icon-project-dollar.svg";

const displayManager = (() => {
  const icons = {
    crown: crownIcon,
    school: schoolIcon,
    sword: swordIcon,
    dollar: dollarIcon,
  };
  const newProjectButton = document.getElementById("new-project");
  const newprojectCancelButton = document.getElementById(
    "newproject-cancelbutton"
  );
  const newTodoCancelButton = document.getElementById("newtodo-cancelbutton");
  const newTodoButton = document.getElementById("new-todo");
  const projectsList = document.getElementById("projects-list");
  const newProjectForm = document.getElementById("newproject-form");
  const newTodoForm = document.getElementById("newtodo-form");
  const newTodoOverlay = document.getElementById("newtodo-overlay");
  const newProjectOverlay = document.getElementById("newproject-overlay");
  const projectPanel = document.getElementById("project-panel");
  const todoContainer = document.getElementById("todo-container");
  const categoryToday = document.getElementById("category-today");
  const categoryOverdue = document.getElementById("category-today");
  const categoryCompleted = document.getElementById("category-today");

  let activeProject = null;

  const onProjectsChanged = (projects) => {
    activeProject = projectManager.getActiveProject();
    renderProjectsList(projects);
    renderProjectPage();
  };

  const onTodosChanged = (newTodo) => {
    renderTodos();
  };

  pubSub.subscribe("projectsChanged", onProjectsChanged);
  pubSub.subscribe("todosChanged", onTodosChanged);

  newProjectButton.addEventListener("click", (e) => {
    e.preventDefault();

    newProjectOverlay.classList.toggle("invisible");
  });

  newTodoButton.addEventListener("click", (e) => {
    e.preventDefault();

    newTodoOverlay.classList.toggle("invisible");
  });

  newTodoCancelButton.addEventListener("click", (e) => {
    newTodoOverlay.classList.toggle("invisible");
  });

  todoContainer.addEventListener("click", (e) => {
    e.stopPropagation();
    if (e.target.nodeName == "BUTTON") {
      projectManager.removeTodoFromProject(
        activeProject,
        e.target.dataset.title
      );
    }
  });

  projectsList.addEventListener("click", (e) => {
    if (e.target.nodeName == "BUTTON") {
      e.target.addEventListener(
        "click",
        projectManager.setActiveProject(e.target.innerHTML)
      );
      // e.target.parentNode.classList.add("bg-opacity-[0.04]");
    }
  });

  newprojectCancelButton.addEventListener("click", (e) => {
    newProjectOverlay.classList.toggle("invisible");
    // projectManager.createProject({ title: "Personal", icon: crownIcon });
  });

  newTodoForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(newTodoForm);

    if (!activeProject) {
      alert("No active project to add todos to");
    }

    let newTodo = todo({
      title: formData.get("name"),
      description: formData.get("description"),
      dueDate: formData.get("dueDate")
        ? format(
            parseISO(formData.get("dueDate"), { additionalDigits: 1 }),
            "M/dd/yy h:m a"
          )
        : "",
    });

    projectManager.addTodoToProject(activeProject, newTodo);
    // activeProject.addTodo(newTodo);

    newTodoForm.reset();
    newTodoOverlay.classList.toggle("invisible");
  });

  newProjectForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(newProjectForm);

    projectManager.createProject({
      title: formData.get("name"),
      icon: icons[formData.get("icon")],
    });

    newProjectForm.reset();
    newProjectOverlay.classList.toggle("invisible");
  });

  const renderProjectsList = (projects) => {
    projectsList.innerHTML = "";
    projects.forEach((project) => {
      projectsList.innerHTML += project.template;
    });
    projectsList.querySelectorAll("#projectlist-item").forEach((li) => {
      if (li.dataset.project == activeProject.title) {
        li.classList.toggle("bg-opacity-[0.04]");
        li.classList.toggle("bg-black");
      }
    });
  };

  const renderTodos = () => {
    todoContainer.innerHTML = "";
    activeProject.todos.forEach((todo) => {
      todoContainer.innerHTML += todo.template;
    });
  };

  const renderProjectPage = () => {
    projectPanel.querySelector("#projectname-header").innerHTML =
      activeProject.title;
    // todoContainer.innerHTML = "";

    renderTodos();
  };
})();
