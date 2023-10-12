import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getBookings as getBookingsApi } from "../../services/apiBookings.js";
import { PAGE_SIZE } from "../../utils/contants.js";

export function useBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // Filter
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };

  // Sort
  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  // Pagination
  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  // React query
  const { isLoading, data: { data: bookings, count } = {} } = useQuery({
    queryKey: ["bookings", filter, sortBy, currentPage], // tracked data for refresh
    queryFn: () => getBookingsApi({ filter, sortBy, currentPage }),
  });

  // React query pre-fetching
  let pageCount = Math.ceil(count / PAGE_SIZE);
  if (currentPage < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, currentPage + 1],
      queryFn: () =>
        getBookingsApi({ filter, sortBy, currentPage: currentPage + 1 }),
    });
  }
  if (currentPage > 1) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, currentPage - 1],
      queryFn: () =>
        getBookingsApi({ filter, sortBy, currentPage: currentPage - 1 }),
    });
  }

  return { isLoading, bookings, count };
}
