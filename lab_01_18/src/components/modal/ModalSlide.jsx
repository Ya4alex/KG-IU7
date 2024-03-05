import "./Modal.css";

import { Button } from "../buttons/Button";
import Modal from "./Modal";
import { useState } from "react";

export default function ModalSlide({ children, buttonText, ...props }) {
  const [modal, setModal] = useState(false);

  return (
    <>
      <Button onClick={() => setModal(true)}>{buttonText}</Button>
      <Modal open={modal}>
        <article>{children}</article>
        <Button onClick={() => setModal(false)}>Ок</Button>
      </Modal>
    </>
  );
}
