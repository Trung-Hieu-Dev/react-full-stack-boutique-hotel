import { useQuery } from "@tanstack/react-query";
import { getBookings as getBookingsApi } from "../../services/apiBookings.js";

export function useBookings() {
  const { isLoading, data: bookings } = useQuery({
    queryKey: ["bookings"],
    queryFn: getBookingsApi,
  });
  return { isLoading, bookings };
}
