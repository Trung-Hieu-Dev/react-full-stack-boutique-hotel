import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { login as loginApi } from "../../services/apiAuth.js";

export function useLogin() {
  const navigate = useNavigate();

  const { mutate: login, isLoading: isLoadingLogin } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: () => {
      navigate("/");
    },
    onError: (err) => {
      console.log("Error", err);
      toast.error("Invalid email or password!");
    },
  });

  return { login, isLoadingLogin };
}
