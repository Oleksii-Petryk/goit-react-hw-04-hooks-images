import React from 'react';
import styles from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({ images, onClick }) {
  const setSelectedImgs = e => {
    const tags = e.target.dataset.alt;
    const largeImageURL = e.target.dataset.url;
    onClick({ tags, largeImageURL });
  };

  return images.map(({ id, webformatURL, tags, largeImageURL }) => (
    <li className={styles.ImageGalleryItem} key={id} onClick={setSelectedImgs}>
      <img
        className={styles.image}
        src={webformatURL}
        data-alt={tags}
        data-url={largeImageURL}
        alt={tags}
      />
    </li>
  ));
}
