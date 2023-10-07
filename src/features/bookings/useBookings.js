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

  const { isLoading, data: bookings } = useQuery({
    queryKey: ["bookings", filter], // refresh page if bookings / filter changed
    queryFn: () => getBookingsApi({ filter }),
  });
  return { isLoading, bookings };
}
