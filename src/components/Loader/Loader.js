import React from 'react';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';
import styles from './Loader.module.css';

export default function LoadBox() {
  return (
    <div className={styles.loader}>
      <Loader type="Bars" color="#3f51b5" height={100} width={100} />
    </div>
  );
}
