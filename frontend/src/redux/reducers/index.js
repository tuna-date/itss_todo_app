import { combineReducers } from "redux";

import {setNewProject} from "./newProject";
import {setBuildings} from "./buildings";

export default combineReducers({
  newProject: setNewProject ,
  buildings: setBuildings
});
