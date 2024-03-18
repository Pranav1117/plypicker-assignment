import { useState } from "react";
const Modal = ({ message }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="modal">
      <div className="modal-content">
        <p>{message}</p>
        <button onClick={() => setShowModal(false)}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
