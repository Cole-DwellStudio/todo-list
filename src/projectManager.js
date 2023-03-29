export { projectManager as default };

import pubSub from "./pubSub";
import project from "./project";
import crownIcon from "./assets/icon-project-crown.svg";

const projectManager = (() => {
  let projects = [];

  let activeProject = null;

  const initialize = () => {
    if (localStorage.getItem("projects")) {
      projects = JSON.parse(localStorage.getItem("projects"));
      activeProject = projects[0];
      pubSub.publish("projectsChanged", projects);
    } else {
      createProject({ title: "Default Project", icon: crownIcon });
    }
  };

  const setActiveProject = (newActiveProjectName) => {
    projects.forEach((project) => {
      if (project.title == newActiveProjectName) {
        activeProject = project;
      }
    });
    pubSub.publish("projectsChanged", projects);
    return activeProject;
  };

  const createProject = ({ title, icon }) => {
    // check if a project with that name already exists
    if (
      projects.some((element) => {
        return element.title == title;
      })
    ) {
      alert(
        "Sorry, that project name is already taken. Please choose a new name."
      );
      return;
    }
    let newProject = project(title, icon);
    projects.push(newProject);
    setActiveProject(newProject.title);
    pubSub.publish("projectsChanged", projects);
  };

  const addTodoToProject = (projectToAddTo, todoToAdd) => {
    projectToAddTo.todos.push(todoToAdd);
    pubSub.publish("todosChanged", projectToAddTo.todos);
  };

  const removeTodoFromProject = (projectToRemoveFrom, todoToRemove) => {
    projectToRemoveFrom.todos.forEach((todo) => {
      if (todo.title == todoToRemove) {
        projectToRemoveFrom.todos.splice(
          projectToRemoveFrom.todos.indexOf(todo),
          1
        );
        pubSub.publish("todosChanged", projectToRemoveFrom.todos);
        pubSub.publish("projectsChanged", projects);
      }
    });

    //   todos.forEach((todo) => {
    // //     if (todo.getTitle() == todoName) {
    // //       todos.splice(todos.indexOf(todo), 1);
    // //       pubsub.publish("todosChanged");
    // //     }
    // //   });
  };

  const getProjects = () => projects;
  const getActiveProject = () => activeProject;

  // const initProjects = () => {
  //   if (localStorage.getItem("projects")) {
  //     projects = JSON.parse(localStorage.getItem("projects"));
  //     projects.forEach((project) => {
  //       project.getTitle = () => title;
  //     });
  //   }
  // };

  // initProjects();

  return {
    createProject,
    getProjects,
    setActiveProject,
    getActiveProject,
    addTodoToProject,
    removeTodoFromProject,
    initialize,
  };
  // store an array of all the {projects}
  // the displayManager will ask us to make a new project
  // we will create that project using the factory
  // and store it in our array
  // then we will tell the display manager to update its view
  // and pass in our new array of projects
  // the display manager will then update the DOM with the projects
})();
