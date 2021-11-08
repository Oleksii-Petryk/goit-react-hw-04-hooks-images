import React, { useState } from 'react';
import styles from './Searchbar.module.css';
import { toast } from 'react-toastify';

export default function Searchbar({ onSubmit }) {
  const [searchImage, setSearchImage] = useState('');

  const handleSearchChange = e => {
    setSearchImage(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (searchImage.trim() === '') {
      return toast.error('Please enter name of requested image');
    }

    onSubmit(searchImage);
    setSearchImage('');
  };

  return (
    <header className={styles.Searchbar}>
      <form className={styles.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={styles.button}>
          <span className={styles.label}>Search</span>
        </button>

        <input
          className={styles.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchImage}
          onChange={handleSearchChange}
        />
      </form>
    </header>
  );
}
