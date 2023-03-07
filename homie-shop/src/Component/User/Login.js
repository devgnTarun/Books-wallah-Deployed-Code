import React, { useEffect, useState } from 'react';
import './login.css';
import { Link, useHistory, useLocation } from 'react-router-dom';
import {useDispatch , useSelector} from 'react-redux'
import { clearError, login } from '../../Actions/userAction';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import Loader from '../Layout/Loader/Loader';
import MetaData from "../Layout/MetaData";


function Login() {

  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const {loading , error , isAuthenticated} = useSelector((state) => state.user)

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const redirect = location.search ? location.search.split('=')[1] : '/account' ;

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(login(email , password)) 
  }

  useEffect(() => {
    if(error) {
        toast.error(error, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
        dispatch(clearError())
    }
    if(isAuthenticated) {
      toast.success("Logged In Successfully", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
        history.push(redirect)
      }
  }, [dispatch , error , isAuthenticated , history , redirect]);

  return (
   <>
       <>
        {loading ? <Loader/> :   <>
        <ToastContainer/>
        <MetaData title={'Login'}/>
        <div className="login-container">
          <div className="clippath"></div>
    
            <div className="login_box">
            <h1>Login   </h1>
          <form  onSubmit={handleSubmit}>
            <label>
              Email:
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </label>
            <label>
              Password:
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </label>
            <button type="submit">Login</button>
          </form>
          <Link className='forgotpass' to={'/forgotPassword'} >Forgot Password</Link>
          <Link to={'/register'} className='signbtn'>Don't Have account Register</Link>
          </div>
        </div>
          </>}
        </>
   </>
  );
}

export default Login;
