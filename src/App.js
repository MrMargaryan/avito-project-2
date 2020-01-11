import React, { useState } from 'react';
import ImageList from "./components/ImageList";
import Modal from './components/Modal';
import './App.css';

const App = () =>  {
  const [modalId, setModalId] = useState();

  const handleClick = (id) => {
      setModalId(id);
  }

  const closeModal = () => {
      setModalId();
  }

  return (
    <div className="container">
        <h1 className="title">TEST APP</h1>
        <ImageList handleClick={handleClick}/>
        {
            modalId ? <Modal id={modalId} closeModal={closeModal}/> : <noscript/>
        }
        <hr/>
        <h4 className="copyright">&#9400; 2018-2019</h4>
    </div>
  );
}

export default App;