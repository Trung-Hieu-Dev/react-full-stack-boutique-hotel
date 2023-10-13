import { HiArrowRightOnRectangle } from "react-icons/hi2";
import SpinnerMini from "../../ui/SpinnerMini.jsx";
import ButtonIcon from "../../ui/ButtonIcon.jsx";
import { useLogout } from "../../features/authentication/useLogout.js";

const Logout = () => {
  const { logout, isLoadingLogout } = useLogout();

  return (
    <ButtonIcon onClick={logout} disabled={isLoadingLogout}>
      {!isLoadingLogout ? <HiArrowRightOnRectangle /> : <SpinnerMini />}
    </ButtonIcon>
  );
};

export default Logout;
