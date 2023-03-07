import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useRouteMatch } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import {  clearError, resetPassword } from "../../Actions/userAction";
import Loader from "../Layout/Loader/Loader";
import MetaData from "../Layout/MetaData";

const ResetPassword = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const match = useRouteMatch();
    
    const {error , success  , loading} = useSelector(state => state.forgotPassword);

    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

  function handleSubmit(e) {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set('password' ,  password)
    myForm.set('confirmPassword' ,  confirmPassword)
    dispatch( resetPassword( match.params.token  ,myForm))
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
    if(success) {
        toast.success("Password Reset Successfully", {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "dark",
    })
    history.push('/login')
    }
} 
  , [dispatch , error  , history , success ]);
  

  return (
    <>
    {loading ? <Loader/> :  <>
  <ToastContainer/>
  <MetaData title={'Reset Password'}/>
  <div className="login-container">
    <div className="clippath"></div>

      <div className="login_box">
      <h1>Reset Password    </h1>
    <form onSubmit={handleSubmit} encType='application/json'>


      <label>
        New Password:
        <input
          type="password"
          placeholder='Set Password'
          value={password}
          onChange={(e)=> setPassword(e.target.value)}
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


      <button type="submit" value={'Update'} >Update </button>
    </form>
    </div>
  </div>
    </>}
 </>
  )
}

export default ResetPassword