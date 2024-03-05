import React, { FC, useState } from 'react';
import './Modal.css';
import { Button } from '../buttons/Button';
import Modal from './Modal';

interface ModalSlideProps {
  children: React.ReactNode;
  buttonText: string;
}

const ModalSlide: FC<ModalSlideProps> = ({ children, buttonText }) => {
  const [modal, setModal] = useState<boolean>(false);

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

export default ModalSlide;