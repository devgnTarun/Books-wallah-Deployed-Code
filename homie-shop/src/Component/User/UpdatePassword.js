import React, { useEffect, useState } from 'react'
import Loader from '../Layout/Loader/Loader'
import './login.css';
import { useDispatch , useSelector } from 'react-redux';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import { useHistory } from 'react-router-dom';
import MetaData from '../Layout/MetaData';
import { UPDATE_PASSWORD_RESET } from '../../Constants/userConstant';
import { clearError, updatePassword } from '../../Actions/userAction';

const UpdatePassword = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const {error , isUpdated , loading} = useSelector(state => state.profile);

    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

  function handleSubmit(e) {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set('oldPassword' ,  oldPassword)
    myForm.set('newPassword' ,  newPassword)
    myForm.set('confirmPassword' ,  confirmPassword)
    dispatch( updatePassword(myForm))
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
    if(isUpdated) {
      toast.success("Password Reset Successfully", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });


      history.push('/account');

      dispatch({
        type : UPDATE_PASSWORD_RESET,
      })

    }
  }, [dispatch , error  , history  , isUpdated]);
  

  return (
    <>
    {loading ? <Loader/> :  <>
  <ToastContainer/>
  <MetaData title={'Update Password'}/>
  <div className="login-container">
    <div className="clippath"></div>

      <div className="login_box">
      <h1>Reset Password    </h1>
    <form onSubmit={handleSubmit} encType='application/json'>

      <label>
        Old Password:
        <input
          type="password"
          placeholder='Old Password'
          value={oldPassword}
          onChange={(e)=> setOldPassword(e.target.value)}
          required
        />
      </label>
      <label>
        New Password:
        <input
          type="password"
          placeholder='New Password'
          value={newPassword}
          onChange={(e)=> setNewPassword(e.target.value)}
          required
        />
      </label>
      <label>
        Confirm Password:
        <input
          type="password"
          placeholder='Confirm Password'
          value={confirmPassword}
          onChange={(e)=> setConfirmPassword(e.target.value)}
          required
        />
      </label>


      <button type="submit" value={'Change'} >Update </button>
    </form>
    </div>
  </div>
    </>}
 </>
  )
}

export default UpdatePassword
