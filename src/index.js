import "./style.css";

// import modules
import pubSub from "./pubsub.js";

//import images
import crownIcon from "./icon-project-crown.svg";
import schoolIcon from "./icon-project-school.svg";
import swordIcon from "./icon-project-sword.svg";
import dollarIcon from "./icon-project-dollar.svg";

const todo = ({
  newTitle,
  newDescription,
  newDueDate,
  newPriority,
  newNotes,
}) => {
  let title = newTitle;
  let description = newDescription;
  let dueDate = newDueDate;
  let priority = newPriority;
  let notes = newNotes;

  const setTitle = (newTitle) => {
    title = newTitle;
  };

  const getTitle = () => title;

  return { setTitle, getTitle };
};

const project = (title, newIcon) => {
  const todos = [];
  const icon = newIcon;
  const template = `<li class="flex gap-2 bg-black bg-opacity-[0] rounded-full pl-4 py-1" id="projectlist-item" data-project="${title}">
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
  };

  return {
    getTitle,
    getTodos,
    addTodo,
    getTemplate,
  };
};

const projectManager = (() => {
  const projects = [];

  let activeProject = null;

  const setActiveProject = (newActiveProjectName) => {
    projects.forEach((project) => {
      if (project.getTitle() == newActiveProjectName) {
        activeProject = project;
      }
    });
    return activeProject;
  };

  const createProject = ({ title, icon }) => {
    // check if a project with that name already exists
    if (
      projects.some((element) => {
        return element.getTitle() == title;
      })
    ) {
      alert(
        "Sorry, that project name is already taken. Please choose a new name."
      );
      return;
    }
    let newProject = project(title, icon);
    projects.push(newProject);
    pubSub.publish("projectsChanged", projects);
  };

  const getProjects = () => projects;
  const getActiveProject = () => activeProject;

  return {
    createProject,
    getProjects,
    setActiveProject,
    getActiveProject,
  };
  // store an array of all the {projects}
  // the displayManager will ask us to make a new project
  // we will create that project using the factory
  // and store it in our array
  // then we will tell the display manager to update its view
  // and pass in our new array of projects
  // the display manager will then update the DOM with the projects
})();

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
  const newTodoButton = document.getElementById("new-todo");
  const projectsList = document.getElementById("projects-list");
  const newProjectForm = document.getElementById("newproject-form");
  const newProjectOverlay = document.getElementById("newproject-overlay");
  const projectPanel = document.getElementById("project-panel");
  const projectTemplate = document.getElementById("project-template").innerHTML;

  let activeProject = null;

  const onProjectsChanged = (projects) => {
    renderProjectsList(projects);
    activeProject = projects[projects.length - 1];
  };

  pubSub.subscribe("projectsChanged", onProjectsChanged);

  newProjectButton.addEventListener("click", (e) => {
    e.preventDefault();

    newProjectOverlay.classList.toggle("invisible");
    // projectManager.createProject({ title: "Personal", icon: crownIcon });
  });

  projectsList.addEventListener("click", (e) => {
    if (e.target.nodeName == "BUTTON") {
      e.target.addEventListener("click", setActiveProject(e.target.innerHTML));
      // e.target.parentNode.classList.add("bg-opacity-[0.04]");
    }
  });

  newprojectCancelButton.addEventListener("click", (e) => {
    newProjectOverlay.classList.toggle("invisible");
    // projectManager.createProject({ title: "Personal", icon: crownIcon });
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
      projectsList.innerHTML += project.getTemplate();
    });
  };

  const setActiveProject = (newActiveProjectName) => {
    activeProject = projectManager.setActiveProject(newActiveProjectName);

    if (activeProject == null) {
      alert("No project by that name in the project list");
      return;
    }

    renderProjectPage();
    // activeProject = null;
    // projectManager.getProjects().forEach((project) => {
    //   if (project.getTitle() == newActiveProjectName) {
    //     activeProject = project;
    //   }
    // });
    // if (activeProject == null) {
    //   alert("project not found");
    // }
    // renderProjectPage();
  };

  const renderProjectPage = () => {
    projectsList.querySelectorAll("#projectlist-item").forEach((li) => {
      if (li.dataset.project == projectManager.getActiveProject().getTitle()) {
        li.classList.add("bg-opacity-[0.04]");
      } else {
        li.classList.remove("bg-opacity-[0.04]");
      }
    });
    projectPanel.querySelector("#projectname-header").innerHTML =
      activeProject.getTitle();
    projectPanel.querySelector("#todo-container").innerHTML = "";
  };
})();
