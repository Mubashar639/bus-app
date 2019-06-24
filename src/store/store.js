import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import authReducer from "./reducers/authReducer";
import errorReducer from "./reducers/errorReducer";

const middleware = [thunk];

const rootreducer = combineReducers({
  auth: authReducer,
  errors: errorReducer
});

const store = createStore(rootreducer, {}, applyMiddleware(...middleware));

export default store;
