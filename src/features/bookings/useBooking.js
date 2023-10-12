import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getBooking as getBookingApi } from "../../services/apiBookings.js";
export function useBooking() {
  const { bookingId } = useParams();

  const { isLoading, data: booking } = useQuery({
    queryKey: ["booking", bookingId],
    queryFn: () => getBookingApi(bookingId),
    retry: false,
  });
  return { isLoading, booking };
}
