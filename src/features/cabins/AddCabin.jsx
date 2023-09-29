/* eslint-disable */
import { useState } from "react";

import Modal from "../../ui/Modal.jsx";
import CreateCabinForm from "../../features/cabins/CreateCabinForm.jsx";
import Button from "../../ui/Button.jsx";

const AddCabin = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpenModal((show) => !show)}>
        Add New Cabin
      </Button>

      {/* {isOpenModal && <CreateCabinForm onShowForm={handleShowForm} />} */}
      {isOpenModal && (
        <Modal onClose={() => setIsOpenModal(false)}>
          <CreateCabinForm onCloseModal={() => setIsOpenModal(false)} />
        </Modal>
      )}
    </>
  );
};

export default AddCabin;
