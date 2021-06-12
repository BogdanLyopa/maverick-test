import { createSelector } from "@reduxjs/toolkit";

export const getCustomers = (state) => state.customers.customers;

export const getFilter = (state) => state.customers.filter;

export const getVisibleCustomers = createSelector(
  [getCustomers, getFilter],
  (customers, filter) => {
    const normalizedFilter = filter.toLowerCase();

    return customers.filter(
      (customer) =>
        customer.country.toLowerCase().includes(normalizedFilter) ||
        customer.model.toLowerCase().includes(normalizedFilter) ||
        customer.publisher.toLowerCase().includes(normalizedFilter)
    );
  }
);
