import "./style.css";

// import external dependencies
import { format, parseISO } from "date-fns";

// import local modules
import pubSub from "./pubSub.js";
import todo from "./todo.js";
import project from "./project.js";
import projectManager from "./projectManager";
import displayManager from "./displayManager";

//import assets
import crownIcon from "./assets/icon-project-crown.svg";
import schoolIcon from "./assets/icon-project-school.svg";
import swordIcon from "./assets/icon-project-sword.svg";
import dollarIcon from "./assets/icon-project-dollar.svg";

projectManager.createProject({ title: "Default Project", icon: crownIcon });
