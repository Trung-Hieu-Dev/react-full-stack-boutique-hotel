// components
import { useSearchParams } from "react-router-dom";
import Spinner from "../../ui/Spinner.jsx";
import CabinRow from "../../features/cabins/CabinRow.jsx";
import Table from "../../ui/Table.jsx";
import Menus from "../../ui/Menus.jsx";

// custom hook
import { useCabins } from "../../features/cabins/useCabins.js";

const CabinTable = () => {
  // react query getting data from database
  const { isLoading, cabins } = useCabins();

  // access query params from url
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;

  // get query params value from url
  const filterValue = searchParams.get("discount") || "all";

  // set filtered cabins
  let filteredCabins;

  if (filterValue === "all") filteredCabins = cabins;

  if (filterValue === "with-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);

  if (filterValue === "no-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);

  // sort
  const sortBy = searchParams.get("sortBy") || "name-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedCabins = filteredCabins.sort(
    (a, b) => (a[field] - b[field]) * modifier,
  );
  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
};

export default CabinTable;
