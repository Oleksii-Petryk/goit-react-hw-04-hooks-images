import React, { useState } from 'react';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Searchbar from './components/Searchbar';
import LogicApp from './components/LogicApp';

export default function App() {
  const [searchImage, setSearchImage] = useState('');

  const formSubmitHandler = searchImage => {
    setSearchImage(searchImage);
  };

  return (
    <div className="App">
      <Searchbar onSubmit={formSubmitHandler} />
      <ToastContainer autoClose={3000} />
      <LogicApp queryImages={searchImage} />
    </div>
  );
}
