/* eslint-disable */

import supabase from "./supabase.js";

export async function getBookings({ filter, sortBy }) {
  let query = supabase
    .from("bookings")
    .select(
      "id, created_at, startDate, endDate, numNights, numGuests, status, totalPrice, cabins(name), guests(fullName," +
        " email)",
    ); // join tables

  // Filter
  if (filter) query = query.eq(filter.field, filter.value);

  // Sort
  if (sortBy)
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    });

  const { data, error } = await query;

  if (error) {
    console.error(error);
    throw new Error("Bookings could not be loaded");
  }
  return data;
}
