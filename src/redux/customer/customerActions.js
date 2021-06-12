import { createAction } from "@reduxjs/toolkit";

export const addCustomer = createAction("customers/addCustomer");

export const deleteCustomer = createAction("customers/deleteCustomer");

export const editCustomer = createAction("customers/editCustomer");

export const changedFilter = createAction("customers/filterChanged");
