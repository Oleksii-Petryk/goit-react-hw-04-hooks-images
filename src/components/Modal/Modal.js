import React, { useEffect } from 'react';
import styles from './Modal.module.css';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ onClose, largeImageURL, alt }) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  const handleOverlayClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return createPortal(
    <div className={styles.Overlay} onClick={handleOverlayClick}>
      <div className={styles.Modal}>
        <img className={styles.image} src={largeImageURL} alt={alt} />
      </div>
    </div>,
    modalRoot,
  );
}
