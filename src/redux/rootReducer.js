import authReducer from './slices/authSlice';
import visitReducer from './slices/visitsSlice';

const { combineReducers } = require('@reduxjs/toolkit');

const appReducer = combineReducers({
  auth: authReducer,
  visit: visitReducer
});

const rootReducer = (state, action) => {
  if (action.type === 'auth/logout') state = {};
  return appReducer(state, action);
};

export default rootReducer;
