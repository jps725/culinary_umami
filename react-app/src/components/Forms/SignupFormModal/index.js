import SignUpForm from "./SignUpForm";
import React, { useState } from "react";
import { Modal } from "../../../context/Modal";

function SignUpFormModal() {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div>
      <button onClick={handleShowModal}>Sign Up</button>
      {showModal && (
        <Modal onClose={handleCloseModal}>
          <SignUpForm />
        </Modal>
      )}
    </div>
  );
}

export default SignUpFormModal;
