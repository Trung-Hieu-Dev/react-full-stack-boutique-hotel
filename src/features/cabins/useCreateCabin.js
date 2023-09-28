import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditCabin as createEditCabinApi } from "../../services/apiCabins.js";

export function useCreateCabin() {
  // insert data with react query
  const queryClient = useQueryClient();

  // create cabin
  const { isLoading: isCreating, mutate: createCabin } = useMutation({
    mutationFn: createEditCabinApi,
    onSuccess: () => {
      toast.success("Cabin created successfully!");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isCreating, createCabin };
}
