// The types of actions that you can dispatch to modify the state of the store

import assets from "../../views/Config/assets";
import config from "../../views/Config/strings";

export const types = {
  SET_BUILDINGS: 'SET_BUILDINGS',
  DELETE_BUILDINGS: 'DELETE_BUILDINGS',
  UPDATE_BUILDINGS: 'UPDATE_BUILDINGS',
  SET_GROUNDS: 'SET_GROUNDS',
  SET_FLOORS: 'SET_FLOORS',
  SET_APARTMENTS: 'SET_APARTMENTS',
  SET_TAB: 'SET_TAB',
  SET_PROJECT: 'SET_PROJECT'
};

// Helper functions to dispatch actions, optionally with payloads
export const buildingsActionCreators = {
  setTab: (tab) => {
    return {type: types.SET_TAB, value: tab}
  },

  setProject: (project_id) => {
    return {type: types.SET_PROJECT, value: project_id}
  },


  setBuildings: (newBuilding) => {
    return {type: types.SET_BUILDINGS, value: newBuilding}
  },
  deleteBuildings: (newBuilding) => {
    return {type: types.DELETE_BUILDINGS, value: newBuilding}
  },
  updateBuildings: (newBuilding) => {
    return {type: types.UPDATE_BUILDINGS, value: newBuilding}
  },

  setGrounds: (array) => {
    return {type: types.SET_PROPERTIES, value: array}
  },

  setFloors: (array) => {
    return {type: types.SET_PROPERTIES, value: array}
  },

  setApartments: (array) => {
    return {type: types.SET_APARTMENTS, value: array}
  },


};


// Initial state of the store
const initialState = {
  project_id: null,
  tab: "1",
  buildings: [],
  grounds: [],
  floors: [],
  apartments: [],
};

export const setBuildings = (state = initialState, action) => {
  const {type, value} = action;

  switch (type) {
    case types.SET_PROJECT:
      state.project_id = value;
      state.tab = "1";
      break;

    case types.SET_TAB:
      state.tab = value.toString();
      break;

    case types.SET_BUILDINGS:
      if (Array.isArray(value)) {
        state.buildings = value;
      } else {
        state.buildings.push(value);
        state.tab = "2";
      }
      break;
    case types.UPDATE_BUILDINGS:
      if (Array.isArray(value)) {
        state.buildings = value;
      } else {
        let temp = state.buildings;
        let currentIndex = temp.findIndex(item => value.id === item.id);
        state.buildings[currentIndex] = value;
        console.log(state.buildings);
        state.tab = "2";
      }

      break;
    case types.DELETE_BUILDINGS:
      let buildings = state.buildings;
      state.buildings = buildings.filter(item => value !== item.id);
      state.tab = "2";
      break;

    case types.SET_GROUNDS:
      state.grounds = value;
      state.tab = "3";
      break;

    case types.SET_FLOORS:
      state.floors = value;
      state.tab = "4";
      break;

    case types.SET_APARTMENTS:
      state.apartments = value;
      break;

  }


  return state;
};

