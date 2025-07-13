import React, { useEffect, useRef } from "react";

const Modal = ({ showModal, setShowModal, children }) => {
  const modalRef = useRef(null);

  // Close modal on outside click
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowModal(false);
      }
    };

    if (showModal) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }
    
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showModal, setShowModal, modalRef]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#15315199] transition-opacity  ">
      <div
        ref={modalRef}
        className="lg:w-5/12 border border-gray-400 shadow-xl bg-white mx-auto rounded-2xl p-10 my-10 "
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
