// The types of actions that you can dispatch to modify the state of the store

import assets from "../../views/Config/assets";

export const types = {
  SET_PROPERTY: 'SET_PROPERTY',
  SET_PROPERTIES: 'SET_PROPERTIES',

  RESET: "RESET"
};

// Helper functions to dispatch actions, optionally with payloads
export const newProjectActionCreators = {
  setProperty: (key, value) =>
  {
    return {type: types.SET_PROPERTY, value: value, key: key}
  },

  setProperties: (object) =>
  {
    return {type: types.SET_PROPERTIES, value: object}
  },

  reset: () =>
  {
    return {type: types.RESET}
  }
};


// Initial state of the store
const initialState = {
  investor:{},
  name: "",
  address: "",
  facilities: [],
  ward_id: 1,
  tenure: "",
  listed_on: "",
  latitude: 21.026263,
  longitude: 105.832930,
  new_image_path: [assets.placeholder],
  number_condo: 0,
  status: "new",
  company_id: 1,
  completed_at: "",
  images:[],

};

export const setNewProject = (state = initialState, action) =>
{
  const {type, value, key} = action;

  switch (type)
  {
    case types.SET_PROPERTY:
      state = {
        ...state,
        [key]: value
      };
      break;

    case types.SET_PROPERTIES:
      state = {
        ...state,
        ...value
      };
      break;
  }

  console.log(key, value, state);
  return state;
};
