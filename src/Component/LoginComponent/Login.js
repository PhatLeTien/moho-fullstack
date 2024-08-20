import React from 'react';
import '../LoginComponent/LoginStyle.css';
import { FaUser, FaLock, FaArrowLeft } from "react-icons/fa";



const Login = () => {
  return (
    <div className='login-container'>
      <div className='body-login'>
        <div className='wrapper'>
          <form action="">
            <h1>Login</h1>
            <div className="input-box">
              <input type="text" placeholder='Username' required />
              <FaUser className='icon' />
            </div>


            <div className="input-box">
              <input type="password" placeholder='Password' required />
              <FaLock className='icon' />
            </div>

            <div className="remember-forgot">
              <label><input type="checkbox" />Remember me</label>
              <a href="/">Forgot password?</a>
            </div>

            <button type="submit">Login</button>

            <div className="register-link">
              <p>Don't have an account ? <a href="/register">Register</a></p>
            </div>
          </form>
          <div className="back-to-home-link">
            <FaArrowLeft className="icon" />
            <a href="/">Back To Home</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;