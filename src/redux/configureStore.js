import {configureStore} from "@reduxjs/toolkit";
import studentsReducer from "./slices/students/slice";

const reducer = {
  allStudents: studentsReducer,
};

const store = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
export default store;
