import React, { useEffect } from 'react'
import {  useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import MetaData from '../Layout/MetaData'
import Loader from '../Layout/Loader/Loader'
import './profile.css'
import { ToastContainer } from 'react-toastify'

const Profile = () => {

    const {user, loading , isAuthenticated} = useSelector(state => state.user)
    const history = useHistory()
   const { orders } = useSelector(state => state.myOrders)


    useEffect(() => {
        if(isAuthenticated === false) {
            history.push('/login')
        }
    }, [  history , isAuthenticated])
  return (
   <>
    {loading ? <Loader/> :  
    <>
        <MetaData title={user.name + `'s Profile`}/>
        <ToastContainer/>
        <div className="profile_page">

            <div className="left_profile">
                <h3>My Profile</h3>
                <div className="profile_image">
                    <img src={user.avatar.url} alt="" srcset="" />
                </div>
                <div className="left_details">
                    <Link className='profile_btn'  to='/updateProfile'>Edit Profile</Link>
                </div>  
            </div>



            <div className="right_profile">
                <div>
                    <h4>Full Name :</h4>
                    <p>{user.name}</p>
                </div>
                <div>
                    <h4>Your Email : </h4>
                    <p>{user.email}</p>
                </div> 
                <div>
                    <h4>Ordered Items : </h4>
                    <p style={{color : 'green'}}>{ orders && orders.length}</p>
                </div>
                <div className='btn_div'>
                    <Link className='profile_btn' to='/updatePassword'> Change Your Password</Link>
                    <Link className='profile_btn' to='/me/orders'> Your Orders </Link>
                </div>
            </div>
        </div>
    </>
    }
   </>
  )
}

export default Profile