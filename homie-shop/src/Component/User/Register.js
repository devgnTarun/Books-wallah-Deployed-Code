import React, { useState , useEffect } from 'react';
import './login.css';
import { Link , useHistory} from 'react-router-dom';
import {useDispatch , useSelector} from 'react-redux'
import { clearError, register } from '../../Actions/userAction';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import Loader from '../Layout/Loader/Loader';
import avtarpic from '../Images/user.png'
import MetaData from '../Layout/MetaData'

function Register() {


  const {loading , error , isAuthenticated} = useSelector((state) => state.user)

  //Usage of some usefull things
  const dispatch = useDispatch();
  const history = useHistory();

  // User Define with email and password
  const [user, setUser] = useState({
    name : '',
    email : '' ,
    password : '',
  })
  // Getting data from user
  const {name , email , password} = user;
  // Avatar
  const [avatar, setAvatar] = useState('')
  const [avatarPreview, setavatarPreview] = useState(avtarpic)
 
  // Function for Form connection with backend
  function handleSubmit(e) {
    e.preventDefault();
  
    const myForm = new FormData();
    myForm.set('name' ,  name)
    myForm.set('email' ,  email)
    myForm.set('password' ,  password)
    myForm.set('avatar' ,  avatar)
    dispatch( register(myForm))
  }

  // Avtar changing and onChange mixed
  const registerChange = (e) => {
      if(e.target.name === 'avatar') {
          const reader = new FileReader();

          reader.onload =() => {
            if(reader.readyState === 2) {
              setavatarPreview(reader.result)
              setAvatar(reader.result)
            }
          }
          reader.readAsDataURL(e.target.files[0])
      }

      else {
        setUser({...user , [e.target.name] : e.target.value} )
      }
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
      history.push('/account')
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
    }
  }, [dispatch , error , isAuthenticated , history ]);
  

  return (
   <>
      {loading ? <Loader/> :  <>
    <ToastContainer/>
    <MetaData title={'Register'}/>
    <div className="login-container">
      <div className="clippath"></div>

        <div className="login_box">
        <h1>Register User   </h1>
      <form onSubmit={handleSubmit} encType='multipart/form-data'>
        <label>
          Name :
          <input
            type="text"
            name='name'
            value={name}
            onChange={registerChange}
          />
        </label>
        <label>
          Email :
          <input
            type="email"
            name='email'
            value={email}
            onChange={registerChange}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name='password'
            value={password}
            onChange={registerChange}
          />
        </label>

        <div className="registerImage">
          <div className="avtarBox"> <img src={avatarPreview} value={avatarPreview} alt="" /></div>
          
        <input className='image_file' type={'file'} name='avatar' accept='image/' onChange={registerChange}/>
        </div>

        <button type="submit" value={'Register'} >Register</button>
      </form>
      {/* disabled={loading? true : false} */}
      <Link to={'/login'} className='signbtn'>Already Have account Register</Link>
      </div>
    </div>
      </>}
   </>
  );
}

export default Register;