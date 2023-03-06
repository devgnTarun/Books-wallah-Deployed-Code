import React, { useState , useEffect } from 'react'
import MetaData from '../Layout/MetaData'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import {  useHistory, useRouteMatch} from 'react-router-dom';
import {useDispatch , useSelector} from 'react-redux'
import Slider from './Slider';
import { UPDATE_ADMIN_USER_RESET } from '../../Constants/userConstant';
import { clearError, getUsersDetailAction, updateUserRoleAction } from '../../Actions/userAction';
import Loader from '../Layout/Loader/Loader';

const UpdateUser = () => {

    // css added in product list.css

    const history = useHistory();
    const dispatch = useDispatch();

    const {loading , error , user} = useSelector(state => state.usersDetail) 

    const { loading : updateLoading,  error  : updateError, isUpdated} = useSelector(state => state.profile)

    const [name , setName]= useState('')
    const [role, setRole] = useState("")

    const match = useRouteMatch()
    const userId = match.params.id
    
    useEffect(() => {
        if( user && user._id !== userId) {
            dispatch(getUsersDetailAction(userId))
        }
        else {
            setName(user.name)
            setRole(user.role)
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
        if(updateError) {
        toast.error(updateError, {
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
        toast.success("User Updated Successfully", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
        history.push('/admin/users')
        dispatch({type : UPDATE_ADMIN_USER_RESET})
    }



    }, [dispatch , error, isUpdated , history , user , userId , updateError])
    


    const submitHandler = (e) => {
        e.preventDefault()
        let myForm = new FormData();

        myForm.set('name' , name);
        myForm.set('role' , role);

    dispatch(updateUserRoleAction( userId, myForm))
    }
    


  return (
    <>
            <MetaData title={'Update User'}/>
            <ToastContainer/>
            <div className="dashboard">
                <Slider/>

                <div className="create_product_page">
                    {
                        loading ?  <Loader/>  :  <form action="" className='create_product_form' encType='multipart/form-data' onSubmit={submitHandler}>
                        <h3>Update User</h3>
                       
                        <div>
                            <label htmlFor="name">
                                    Name :
                            </label>
                            <input type="text" placeholder='User Name' value={name} onChange={(e) => setName(e.target.value)}/>
                        </div>


                        <div>
                            <label htmlFor="category">Roles</label>
                            <select required onClick={(e) => setRole(e.target.value)} >
                                <option value="">Choose Role</option>
                                <option value="admin">Admin</option>
                                <option value="user">User</option>
                                
                            </select>
                        </div>

                      


                        <button id='create_pruduct_button' type='submit' disabled={updateLoading ? true : false || role === '' ? true : false}>Update</button>


                    </form>
                    }
                </div>
            </div>
    </>
  )
}


export default UpdateUser