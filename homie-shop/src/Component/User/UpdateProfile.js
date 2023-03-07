import React, { useEffect, useState } from 'react'
import avtarpic from '../Images/user.png'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { clearError, loadUser, register, updateProfile } from '../../Actions/userAction';
import { UPDATE_USER_RESET } from '../../Constants/userConstant';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import './login.css';
import Loader from '../Layout/Loader/Loader';
import MetaData from '../Layout/MetaData';


const UpdateProfile = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    const {user} = useSelector(state => state.user);
    const {error , isUpdated , loading} = useSelector(state => state.profile);

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    
    const [avatar, setAvatar] = useState('')
    const [avatarPreview, setavatarPreview] = useState(avtarpic)

  function handleSubmit(e) {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set('name' ,  name)
    myForm.set('email' ,  email)
    myForm.set('avatar' ,  avatar)
    dispatch( updateProfile(myForm))
  }

  const updateProfileChange = (e) => {
        const reader = new FileReader();

        reader.onload =() => {
          if(reader.readyState === 2) {
            setavatarPreview(reader.result)
            setAvatar(reader.result)
          }
        }
        reader.readAsDataURL(e.target.files[0])
    
}

  
  useEffect(() => {

    if(user) {
        setName(user.name)
        setEmail(user.email)
        setavatarPreview(user.avatar.url)
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
    if(isUpdated) {
      toast.success("Profile updated Successfully", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });

      dispatch(loadUser());

      history.push('/account');

      dispatch({
        type : UPDATE_USER_RESET,
      })

    }
  }, [dispatch , error  , history ,user , isUpdated]);
  

  return (
    <>
            {loading ? <Loader/> :  <>
    <ToastContainer/>
    <MetaData title={'Update Profile'}/>
    <div className="login-container">
      <div className="clippath"></div>

        <div className="login_box">
        <h1>Update Profile   </h1>
      <form onSubmit={handleSubmit} encType='multipart/form-data'>
        <label>
          Name :
          <input
            type="text"
            name='name'
            value={name}
            onChange={(e)=> setName(e.target.value)}
          />
        </label>
        <label>
          Email :
          <input
            type="email"
            name='email'
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
          />
        </label>

        <div className="registerImage">
          <div className="avtarBox"> <img src={avatarPreview} value={avatarPreview} alt="" /></div>
          
        <input className='image_file' type={'file'} name='avatar' accept='image/' onChange={updateProfileChange}/>
        </div>

        <button type="submit" value={'Register'} >Update</button>
      </form>
      {/* disabled={loading? true : false} */}
      </div>
    </div>
      </>}
    </>
  )
}

export default UpdateProfile