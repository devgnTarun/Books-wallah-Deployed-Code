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
import { clearError, deleteOrderAction, getAllOrders } from '../../Actions/orderAction'
import { DELETE_ORDER_RESET } from '../../Constants/orderConstant'

const OrderList = () => {

    const dispatch = useDispatch()
    const history = useHistory()

    const {error , loading , orders} = useSelector(state => state.allOrder)

    const {error : deleteError , isDeleted} = useSelector(state => state.delOrder)

    const deleteHandler = (id) => {
        dispatch(deleteOrderAction(id))
    }


    const columns = [
        {
            field : "id",
            headerName : "Order ID",
            minWidth : 240,
            flex : 0.8
          }
          , {
            field : "status",
            headerName : "Status",
            minWidth : 150,
            flex : 0.5,
            cellClassName : (params) => {
              return (params.getValue(params.id , "status")=== "Delivered" ? "greenColor" : " redColor")
            }
          } ,
           {
            field : "itemsQty",
            headerName : "Items QtY",
            type :"number",
            minWidth : 150,
            flex : 0.3
           },
           {
            field : "amount",
            headerName : "Amount",
            type :"number",
            minWidth : 150,
            flex : 0.3
           },
        {field : "action" , headerName : "Actions" , minWidth : 150 , type : "number" , sortable : false,flex : 0.3,
        renderCell : (params) => {
            return(
                <>
                <Link className='edit_Icon' to={`/admin/order/${params.getValue(params.id, 'id')}`}>
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
    orders && orders.forEach((item) => {
        rows.push({
            id : item._id,
            itemsQty : item.orderItem.length,
            amount : item.totalPrice,
            name : item.name,
            status : item.orderStatus
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
            toast.success("Order Deleted Successfully!!", {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
                history.push('/admin/dashboard');
                dispatch({type : DELETE_ORDER_RESET})
        }       

        dispatch(getAllOrders())
    }, [dispatch , error , deleteError , isDeleted , history])
    

  return (
    <>
   {
    loading ? <Loader/> : ( <>
        <MetaData title="All Orders"/>  
        <div className='dashboard'>
               <Slider/>

               <div className="allProduct_box">
                   <h2>All Orders</h2>

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


export default OrderList