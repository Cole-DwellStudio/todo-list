export { localStorageManager as default };
import pubSub from "./pubSub";

const localStorageManager = (() => {
  const onProjectsChanged = (projects) => {
    localStorage.setItem("projects", JSON.stringify(projects));
  };
  //   const onTodosChanged = () => {
  //     onProjectsChanged();
  //   };
  pubSub.subscribe("projectsChanged", onProjectsChanged);
  //   pubSub.subscribe("todosChanged", onTodosChanged);
})();
