import styled from "styled-components";

// components
import Spinner from "../../ui/Spinner.jsx";

// hooks
import { useRecentBooking } from "./useRecentBooking.js";
import { useRecentStays } from "./useRecentStays.js";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

const DashboardLayout = () => {
  const { isLoading: isLoadingBookings, bookings } = useRecentBooking();
  const { isLoading: isLoadingStays, confirmedStays } = useRecentStays();

  if (isLoadingBookings || isLoadingStays) return <Spinner />;

  console.log(bookings, confirmedStays);

  return (
    <StyledDashboardLayout>
      <div>Statistics</div>
      <div>Today activity</div>
      <div>Chart stay durations</div>
      <div>Chart sales</div>
    </StyledDashboardLayout>
  );
};

export default DashboardLayout;
