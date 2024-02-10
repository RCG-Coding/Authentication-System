import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './Home';
import Register from './Register';
import SignIn from './SignIn';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/signIn' element={<SignIn/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
