import { useState } from "react";
import Button from "../ui/Button.jsx";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable.jsx";
import CreateCabinForm from "../features/cabins/CreateCabinForm.jsx";

function Cabins() {
  const [showForm, setShowForm] = useState(false);

  function handleShowForm() {
    setShowForm((show) => !show);
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>Filter / Sort</p>
      </Row>

      <Row>
        <CabinTable />

        <Button onClick={() => setShowForm((show) => !show)}>
          Add New Cabin
        </Button>

        {showForm && <CreateCabinForm onShowForm={handleShowForm} />}
      </Row>
    </>
  );
}

export default Cabins;
