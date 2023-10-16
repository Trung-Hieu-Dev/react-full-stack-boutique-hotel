import Button from "../../ui/Button";
import { useCheckout } from "../../features/check-in-out/useCheckout.js";

function CheckoutButton({ bookingId }) {
  const { checkout, isCheckingOut } = useCheckout();

  return (
    <Button
      $variation="primary"
      $size="small"
      onClick={() => checkout(bookingId)}
      disabled={isCheckingOut}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
