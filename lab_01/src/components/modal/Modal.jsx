import { createPortal } from "react-dom";
import "./Modal.css";
import { useEffect, useRef } from "react";

export default function Modal({ children, ...props }) {
  const dialog = useRef();

  useEffect(() => {
    if (props.open) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }

    return () => {};
  }, [props.open]);

  return createPortal(
    <dialog ref={dialog}>
      <div className="dialog-inner">{children}</div>
    </dialog>,
    document.getElementById("modal")
  );
}
