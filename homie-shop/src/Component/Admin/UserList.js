import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { Button } from '@material-ui/core'
import MetaData from '../Layout/MetaData'
import Slider from './Slider'
import { DataGrid } from '@material-ui/data-grid'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import './productList.css'
import Loader from '../Layout/Loader/Loader'
import { clearError, deleteUserAction, getAllUsersAction } from '../../Actions/userAction'
import { DELETE_USER_RESET } from '../../Constants/userConstant'

const UserList = () => {

    const dispatch = useDispatch()
    const history = useHistory()

    const {error , loading , users} = useSelector(state => state.allUser)

    const {error : deleteError , isDeleted , message} = useSelector(state => state.profile)

    const deleteHandler = (id) => {
        dispatch(deleteUserAction(id))
    }


    const columns = [
        {field : "id" , headerName : "User Id" , minWidth : 200 , flex : 0.5},
        {field : "email" , headerName : "Email" , minWidth : 250 , flex : 0.5},
        {field : "name" , headerName : "Name" , minWidth : 150 , flex : 0.3 , type : "number"},
        {field : "role" , headerName : "Role" , minWidth : 230 , flex : 0.5 , type : "number" , cellClassName : (params) => {
          return (params.getValue(params.id , "role")=== "admin" ? "greenColor" : " redColor")
        }},
        {field : "action" , headerName : "Actions" , minWidth : 150 , type : "number" , sortable : false,flex : 0.3,
        renderCell : (params) => {
            return(
                <>
                <Link className='edit_Icon' to={`/admin/user/${params.getValue(params.id, 'id')}`}>
                <i className="far fa-edit"></i>
                </Link>
                <Button color='secondary' onClick={ () => deleteHandler(params.getValue(params.id, 'id'))}>
                    <i className="fas fa-trash"></i>
                </Button>
                </>
            )

         }    },
    ]

    const rows = [] ;
    users && users.forEach((item) => {
        rows.push({
            id : item._id,
            name : item.name,
            email : item.email,
            role : item.role,
        })
    })

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
        if(deleteError) {
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
        if(isDeleted) {
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
                history.push('/admin/users');
                dispatch({type : DELETE_USER_RESET})
        }       

        dispatch(getAllUsersAction())
    }, [dispatch , error , deleteError , isDeleted , history , message])
    

  return (
    <>
   {
    loading ? <Loader/> : ( <>
        <MetaData title="All Users"/> 
        <ToastContainer/> 
        <div className='dashboard'>
               <Slider/>

               <div className="allProduct_box">
                   <h2>All Users</h2>

                   <div className="product_container_box">
                       <DataGrid rows={rows} columns={columns} pageSize={10} disableSelectionOnClick autoHeight className='productlist_table'/>
                   </div>
               </div>
        </div>     
   </>)
   }
   </>
  )
}

export default UserList