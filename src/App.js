
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import SingUp from './SingUp';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './Home';
import Navbar from './Navbar';
import { useEffect, useState } from 'react';
import CreateMovie from './CreateMovie';
import EditMovie from './EditMovie';

function App() {

  const local = localStorage.getItem('movieLogin')
  const [store, setStore] = useState({});

  useEffect(() => {
    if (localStorage.getItem('movieLogin')) {
      setStore(JSON.parse(localStorage.getItem('movieLogin')))
    }
  }, [local])




  return (
    <div className="App ">
      <BrowserRouter>
        <Navbar setStore={setStore} store={store} />
        <ToastContainer />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/movie' element={<CreateMovie />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SingUp />} />
          <Route path='/movie/:id' element={<EditMovie />} />
        </Routes>
      </BrowserRouter>

    </div >
  );
}

export default App;
