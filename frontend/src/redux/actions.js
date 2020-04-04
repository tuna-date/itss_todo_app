import {newProjectActionCreators} from "./reducers/newProject";
import {buildingsActionCreators} from "./reducers/buildings";

export const actionDispatcher =
  {
    newProject: newProjectActionCreators,
    buildings: buildingsActionCreators
  };
