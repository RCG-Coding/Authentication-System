import React, { useEffect, useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';

function Home() {

  const [auth, setAuth] = useState(false);
  const [msg, setMsg] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get('http://localhost:1000/')
    .then(res => {
      if(res.data.Status === 'Success'){
        setAuth(true);
        setName(res.data.name)
      }else{
        setAuth(false);
        setMsg(res.data.Error)
      }
    })
    .then(err => console.log(err));
  },[]);

  const logOut = () => {
    axios.get('http://localhost:1000/logOut')
      .then(res => {
        window.location.reload(true);
      })
      .catch(err => console.log(err));
  }

  return (
    <div className='container mt-4'>
      {
        auth?
        <div>
          <h3>You Are Autherized {name}</h3>
          <button className='btn btn-danger' onClick={logOut}>LogOut</button>
        </div>
        :
        <div>
          <h3>{msg}</h3>
          <h3>Login Now</h3>
          <Link to='/signIn' className='btn btn-primary'>LogIn</Link>
        </div>

      }
    </div>
  )
}

export default Home;