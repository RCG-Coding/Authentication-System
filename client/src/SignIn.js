import React from 'react';
import {Link} from 'react-router-dom';

function SignIn() {
  return (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
        <div className='bg-white p-3 rounded w-25'>
            <h2>Sign-In</h2>
            <form>
                <div className='mb-3'>
                    <lable htmlFor='email'><strong>Email</strong></lable>
                    <input type='email' placeholder='Enter Email' name='email'
                    className='form-control rounded-0'/>
                </div>
                <div className='mb-3'>
                    <lable htmlFor='password'><strong>Password</strong></lable>
                    <input type='password' placeholder='Enter Password' name='password'
                    className='form-control rounded-0'/>
                </div>
                <button type='submit' className='btn btn-success w-100 rounded-0'>Sign In</button>
                <p>You are agree to our terms and policies</p>
                <Link to='/register' className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Register</Link>
            </form>
        </div>
    </div>
  )
}

export default SignIn;