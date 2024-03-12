import React, { FC, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import './Modal.css';

interface ModalProps {
  open: boolean;
  children: React.ReactNode;
}

const Modal: FC<ModalProps> = ({ open, children }) => {
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (open) {
      dialog.current?.showModal();
    } else {
      dialog.current?.close();
    }

    return () => {};
  }, [open]);

  return createPortal(
    <dialog ref={dialog}>
      <div className="dialog-inner">{children}</div>
    </dialog>,
    document.getElementById('modal') as HTMLElement
  );
};

export default Modal;