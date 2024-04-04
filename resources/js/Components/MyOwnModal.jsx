import React, { useRef, useEffect } from 'react';
import { IoMdClose } from "react-icons/io";

const MyOwnModal = ({ isOpen, onClose, children }) => {
  const overlayStyles = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: isOpen ? 1 : 0,
    transition: 'opacity 0.3s ease',
    pointerEvents: isOpen ? 'auto' : 'none',
  };

  const modalStyles = {
    background:
      "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0))",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    borderRadius: "20px",
    border: "1px solid rgba(255,255,255,0.18)",
    boxShadow: "0 8px 32px 0 rgba(0,0,0,0.37)",
    padding: '20px',
    zIndex: 1000,
    width: '80%',
    maxHeight: '80%',
    overflowY: 'scroll',
    opacity: isOpen ? 1 : 0,
    transition: 'opacity 0.3s ease',
    position: 'relative',
  };

  const closeButtonStyles = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    fontSize: '1.5rem',
    cursor: 'pointer',
    color: '#fff'
  };

  const modalRef = useRef(null);

  useEffect(() => {
    const handleBodyOverflow = () => {
      document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    };

    handleBodyOverflow();

    return () => {
      handleBodyOverflow();
    };
  }, [isOpen]);

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div>
      <div style={overlayStyles} onClick={onClose}>
        <div style={modalStyles} ref={modalRef} onClick={handleModalClick} className="no-scrollbar">
          <button style={closeButtonStyles} onClick={onClose}><IoMdClose /></button>
          {children}
        </div>
      </div>
    </div>
  );
};

export default MyOwnModal;
