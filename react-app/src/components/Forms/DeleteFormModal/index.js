import DeleteForm from "./DeleteForm";
import React, { useState } from "react";
import { Modal } from "../../../context/Modal";

function DeleteFormModal({ userId, recipeId }) {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div>
      <button className="recipe__delete--button" onClick={handleShowModal}>
        Delete
      </button>
      {showModal && (
        <Modal onClose={handleCloseModal}>
          <DeleteForm recipeId={recipeId} userId={userId} />
        </Modal>
      )}
    </div>
  );
}

export default DeleteFormModal;
