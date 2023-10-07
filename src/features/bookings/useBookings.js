import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getBookings as getBookingsApi } from "../../services/apiBookings.js";

export function useBookings() {
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

  // react query
  const { isLoading, data: bookings } = useQuery({
    queryKey: ["bookings", filter, sortBy], // tracked data for refresh
    queryFn: () => getBookingsApi({ filter, sortBy }),
  });

  return { isLoading, bookings };
}
