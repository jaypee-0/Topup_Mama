import React from 'react';
import { Link } from 'react-router-dom';
import { Authcontext } from '../context/Authcontext';
import '../styles/Login.scss'

export const Login = () => {
  interface Auth {
    errorlogin: boolean | string[]
    handleLogin: (e: React.FormEvent) => void
  }

  const {handleLogin, errorlogin}:Auth = React.useContext(Authcontext)
  const [passwordShow, setPasswordShow] = React.useState<Boolean>(false);
  const togglePassword = () => {
    setPasswordShow(!passwordShow);
  };

  return (
    <div id='login'>
      <div className='vh-100 d-flex align-items-center'>
        <div className='formbox col-10 col-sm-7 col-md-6 col-lg-4 mx-auto py-4 px-3'>
          <h2 className='pb-1'>Welcome back!</h2>
          <p className={errorlogin ? 'mb-1' : "pt-4 text-left logintext"}>Login with your details.</p>
          <div className='w-100'>
            <form id='loginForm' onSubmit={handleLogin} className='form-text'>               
            {errorlogin && <p className="tiro mb-0 fs-6x text-danger">{errorlogin}</p>}
              <input
                type='text'
                placeholder='Username'
                name="username"
                className='my-3 py-3 ps-2'
                required
              />
              <div className='d-flex flex-row'>
                <input
                  id='password'
                  type={passwordShow ? 'text' : 'password'}
                  placeholder='Password'
                  name="password"
                  className='w-100 position-relative my-2 py-3 ps-2'
                  required
                />
                <p
                  onClick={togglePassword}
                  className='show cursor-pointer pt-2 mt-3 position-absolute'>
                  SHOW
                </p>
              </div>
              {/* <p className='py-2'>FORGOT PASSWORD ?</p> */}
                <button type='submit' className='py-3 w-100'>
                  Login
                </button>
                <p className="text-center text-dark mb-0 mt-1">Don't have an account?</p>
                <p className="text-center">Register <Link to="/register">here</Link></p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
