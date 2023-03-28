export { projectManager as default };

import pubSub from "./pubSub";
import project from "./project";

const projectManager = (() => {
  const projects = [];

  let activeProject = null;

  const setActiveProject = (newActiveProjectName) => {
    projects.forEach((project) => {
      if (project.getTitle() == newActiveProjectName) {
        activeProject = project;
        console.log("active project set to: " + activeProject.getTitle());
      }
    });
    pubSub.publish("projectsChanged", projects);
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
    setActiveProject(newProject.getTitle());
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
