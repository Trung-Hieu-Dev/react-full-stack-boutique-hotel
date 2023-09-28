import { useQuery } from "@tanstack/react-query";
import { getCabins as getCabinsApi } from "../../services/apiCabins.js";

export function useCabins() {
  const { isLoading, data: cabins } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabinsApi,
  });
  return { isLoading, cabins };
}
