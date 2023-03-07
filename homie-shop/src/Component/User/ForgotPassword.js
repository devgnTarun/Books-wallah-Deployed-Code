import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { ToastContainer , toast } from 'react-toastify'
import { clearError, forgotPassword } from '../../Actions/userAction'
import Loader from '../Layout/Loader/Loader'
import MetaData from '../Layout/MetaData'


const ForgotPassword = () => {

    const dispatch = useDispatch()

    const {message , loading , error} = useSelector((state) => state.forgotPassword)
    const [email, setEmail] = useState("")


    function handleSubmit(e) {
      e.preventDefault();
  
      const myForm = new FormData();
      myForm.set('email' ,  email)
      dispatch( forgotPassword(myForm))
    }
    
  useEffect(() => {
    if(message) {
      toast.success(message, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    }
    
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

  }, [dispatch , error  , message  ]);

  return (
    <>
       {loading ? <Loader/> :  <>
    <ToastContainer/>
    <MetaData title={'Forgot Password'}/>
    <div className="login-container">
      <div className="clippath"></div>

        <div className="login_box">
        <h1>Forgot Password   </h1>
      <form onSubmit={handleSubmit} encType='multipart/form-data'>
  
        <label>
          Email :
          <input
            type="email"
            name='email'
            placeholder='Forgot Token will be sent to entered email'
            value={email}
            required
            onChange={(e)=> setEmail(e.target.value)}
          />
        </label>

        <button type="submit" value={'Forgot'} >Generate</button>
      </form>
      {/* disabled={loading? true : false} */}
      </div>
    </div>
      </>}
    </>
  )
}

export default ForgotPassword