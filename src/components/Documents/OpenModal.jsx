import { useEffect } from "react";
import { useState } from "react";
import style from "./style.module.scss";

import ReactDOM from "react-dom";

const OpenModal = ({ isOpen,  children }) => {
  const [isBrawser, setIsBrawser] = useState(false);

  useEffect(() => {
    setIsBrawser(true);
  }, []);

  const modalContent = isOpen && (
    <div className={style.modal_overlay}>
      <div className={style.modal}>{children}</div>
    </div>
  );

  return (
    isBrawser &&
    ReactDOM.createPortal(modalContent, document.getElementById("portal-root"))
  );
};

export default OpenModal;
