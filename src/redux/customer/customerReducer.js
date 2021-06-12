import { combineReducers } from "redux";
import { createReducer } from "@reduxjs/toolkit";
import {
  addCustomer,
  deleteCustomer,
  editCustomer,
  changedFilter,
} from "./customerActions";

const customers = createReducer([], {
  [addCustomer]: (state, { payload }) => [...state, payload],
  [deleteCustomer]: (state, { payload }) =>
    state.filter(({ id }) => id !== payload),
  [editCustomer]: (state, { payload }) =>
    state.map((el) => (el.id !== payload.id ? el : payload)),
});
const filter = createReducer("", {
  [changedFilter]: (_, { payload }) => payload,
});
export default combineReducers({ customers, filter });
