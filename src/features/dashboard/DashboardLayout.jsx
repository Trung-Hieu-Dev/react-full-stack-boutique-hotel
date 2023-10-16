import styled from "styled-components";

// components
import Spinner from "../../ui/Spinner.jsx";
import Stats from "../../features/dashboard/Stats.jsx";

// hooks
import { useRecentBooking } from "./useRecentBooking.js";
import { useRecentStays } from "./useRecentStays.js";
import { useCabins } from "../cabins/useCabins.js";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

const DashboardLayout = () => {
  const { isLoading: isLoadingBookings, bookings } = useRecentBooking();

  const {
    isLoading: isLoadingStays,
    confirmedStays,
    numDays,
  } = useRecentStays();

  const { isLoading: isLoadingCabins, cabins } = useCabins();

  if (isLoadingBookings || isLoadingStays || isLoadingCabins)
    return <Spinner />;

  console.log(bookings, confirmedStays);

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinCount={cabins.length}
      />
      <div>Today activity</div>
      <div>Chart stay durations</div>
      <div>Chart sales</div>
    </StyledDashboardLayout>
  );
};

export default DashboardLayout;
