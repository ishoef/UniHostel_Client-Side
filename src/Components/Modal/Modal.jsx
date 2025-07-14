import React, { useEffect, useRef } from "react";

const Modal = ({ showModal, setShowModal, children }) => {
  const modalRef = useRef(null);

  // Close modal when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowModal(false);
      }
    };

    if (showModal) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showModal, setShowModal]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#15315199] px-4 overflow-y-auto">
      <div
        ref={modalRef}
        className="w-full max-w-lg md:max-w-2xl lg:max-w-3xl border border-gray-300 shadow-xl bg-white rounded-2xl p-6 my-10"
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
