import styled from "styled-components";
import PropTypes from "prop-types";
import { HiPencil, HiTrash } from "react-icons/hi";
import { HiSquare2Stack } from "react-icons/hi2";

// custom hooks
import { useCreateCabin } from "./useCreateCabin.js";
import { useDeleteCabin } from "./useDeleteCabin.js";

// utils
import { formatCurrency } from "../../utils/helpers.js";

// components
import Modal from "../../ui/Modal.jsx";
import CreateCabinForm from "../../features/cabins/CreateCabinForm.jsx";
import ConfirmDelete from "../../ui/ConfirmDelete.jsx";

// styled components
const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

const CabinRow = ({ cabin }) => {
  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
  } = cabin;

  // delete & duplicate with React Query
  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { isCreating, createCabin } = useCreateCabin();

  // duplicate
  function handleDuplicate() {
    const data = {
      name: `Copy of ${cabin.name}`,
      maxCapacity,
      regularPrice,
      discount,
      image,
    };
    createCabin(data);
  }

  return (
    <TableRow role="row">
      <Img src={image} />
      <Cabin>{name}</Cabin>
      <div>Fit up to {maxCapacity} guests</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      {discount ? (
        <Discount>{formatCurrency(discount)}</Discount>
      ) : (
        <span>&mdash;</span>
      )}
      <div>
        {/* duplicating */}
        <button disabled={isCreating} onClick={handleDuplicate}>
          <HiSquare2Stack />
        </button>

        {/* editing */}
        <Modal>
          <Modal.Open opens="edit">
            <button>
              <HiPencil />
            </button>
          </Modal.Open>
          <Modal.Window name="edit">
            <CreateCabinForm cabinToEdit={cabin} />
          </Modal.Window>
        </Modal>

        {/* deleting */}
        <Modal>
          <Modal.Open opens="delete">
            <button>
              <HiTrash />
            </button>
          </Modal.Open>
          <Modal.Window name="delete">
            <ConfirmDelete
              disabled={isDeleting}
              resourceName="cabins"
              onConfirm={() => deleteCabin(cabinId)}
            />
          </Modal.Window>
        </Modal>
      </div>
    </TableRow>
  );
};

export default CabinRow;

CabinRow.propTypes = {
  cabin: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    maxCapacity: PropTypes.number,
    regularPrice: PropTypes.number,
    discount: PropTypes.number,
    image: PropTypes.string,
  }).isRequired,
};
