import { toast } from 'react-toastify';
import React, { useEffect, useState } from 'react';
import LoadBox from '../Loader/Loader';
import ImageGallery from '../ImageGallery/ImageGallery';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import { API } from '../../services/API';

export default function LogicApp({ queryImages }) {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const [showModal, setShowModal] = useState(false);
  const [largeImage, setLargeImage] = useState('');
  const [alt, setAlt] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!queryImages) {
      return;
    }
    setStatus('pending');
    setPage(1);

    API(queryImages)
      .then(requestedImages => {
        if (requestedImages.hits.length !== 0) {
          setImages(requestedImages.hits);
          setStatus('resolved');
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          });
          setPage(prevPage => prevPage + 1);
        } else {
          Promise.reject(
            toast.error(
              `Images with name "${queryImages}" not found. Try again!!!`,
            ),
          );
        }
      })
      .catch(error => {
        setError(error);
        setStatus('rejected');
      });
  }, [queryImages]);

  const onLoadMore = () => {
    API(queryImages, page)
      .then(requestedImages => {
        setImages(prevImages => [...prevImages, ...requestedImages.hits]);

        setPage(page + 1);
        setStatus('resolved');
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      })
      .catch(error => {
        setError(error);
        setStatus('rejected');
      });
  };

  const onOpenModal = ({ tags, largeImageURL }) => {
    setAlt(tags);
    setLargeImage(largeImageURL);
    setShowModal(true);
  };

  const onCloseModal = () => {
    setShowModal(false);
  };

  if (status === 'idle') {
    return <ImageGallery />;
  }

  if (status === 'pending') {
    return <LoadBox />;
  }

  if (status === 'rejected') {
    return <h1>{error.message}</h1>;
  }

  if (status === 'resolved') {
    return (
      <>
        <ImageGallery>
          <ImageGalleryItem images={images} onClick={onOpenModal} />
        </ImageGallery>
        {images.length !== 0 && <Button onClick={onLoadMore} />}
        {showModal === true && (
          <Modal largeImageURL={largeImage} alt={alt} onClose={onCloseModal} />
        )}
      </>
    );
  }
}
