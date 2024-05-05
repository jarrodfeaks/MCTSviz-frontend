import React from 'react';
import styles from './LoadingOverlay.module.css';

const LoadingOverlay = ({ isLoading, children }) => {

  const overlayBackgroundClass = isLoading ? `${styles.overlayBackground} ${styles.dim}` : styles.overlayBackground;
  const spinnerClass = isLoading ? `${styles.loadingSpinner} ${styles.show}` : styles.loadingSpinner;

  return (
    <div className={styles.loadingOverlay}>
      <div className={overlayBackgroundClass}>{children}</div>
      <div className={spinnerClass}>
        <div className={styles.spinner}></div>
      </div>
    </div>
  );
};

export default LoadingOverlay;
