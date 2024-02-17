import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';

function Register() {

    const [values, setValues] = useState({
        name:'',
        email:'',
        password:''
    })
    const navigate = useNavigate();

    const submit = async(e) => {
        e.preventDefault();
        try{
            const result = await axios.post('http://localhost:1000/register',values);
            console.log(result)
            if(result.data.Status === 'Registered Successfully'){
                alert(result.data.Status);
                navigate('/signIn');
            }else{
                alert(result.data.Error);
            }
            

        }catch(err){
            console.error(err);
        }       
    }

  return (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
        <div className='bg-white p-3 rounded w-25'>
            <h2>Sign-Up</h2>
            <form onSubmit={submit}>
                <div className='mb-3'>
                    <lable htmlFor='name'><strong>Name</strong></lable>
                    <input type='text' placeholder='Enter Name' name='name'
                    onChange={e => setValues({...values, name: e.target.value})} className='form-control rounded-0'/>
                </div>
                <div className='mb-3'>
                    <lable htmlFor='email'><strong>Email</strong></lable>
                    <input type='email' placeholder='Enter Email' name='email'
                    onChange={e => setValues({...values, email: e.target.value})} className='form-control rounded-0'/>
                </div>
                <div className='mb-3'>
                    <lable htmlFor='password'><strong>Password</strong></lable>
                    <input type='password' placeholder='Enter Password' name='password'
                    onChange={e => setValues({...values, password: e.target.value})} className='form-control rounded-0'/>
                </div>
                <button type='submit' className='btn btn-success w-100 rounded-0'>Sign Up</button>
                <p>You are agree to our terms and policies</p>
                <Link to='/signIn' className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Login</Link>
            </form>
        </div>
    </div>
  )
}

export default Register;