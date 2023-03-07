import { DataGrid } from '@material-ui/data-grid';
import React , {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Layout/Loader/Loader';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import MetaData from '../Layout/MetaData';
import './order.css'
import { clearError, myOrders } from '../../Actions/orderAction';
import { Link } from 'react-router-dom';

const MyOrder = () => {
 
   const dispatch = useDispatch();

   const {loading , orders  , error} = useSelector(state => state.myOrders)
   const {user} = useSelector(state => state.user)

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
     {
      field : "actions",
      flex : 0.2,
      minWidth : 120,
      type : "number",
      sortable : false,
      renderCell : (params) => {
        return (
            <Link className='launchiCON' to={`/order/${params.getValue(params.id , "id")}`}> <i class="fa-solid fa-truck-fast "  ></i></Link>
        );
      }
     }
   ]
   const rows = []
   
   orders && orders.forEach((item , index) => {
    rows.push({
      itemsQty : item.orderItem.length,
      id  : item._id,
      status : item.orderStatus,
      amount : item.totalPrice
    })
    
   });

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
      dispatch(myOrders())
   }, [dispatch ,error ])
   

  return (
    <>
      <MetaData title={`${user.name}'s Orders`}/>
      <ToastContainer/>
      {loading ? <Loader/> : 

        <div className="myOrdersPage">
          <h3>{user.name}'s Orders</h3>
            <div className="myOrderBox">
              <DataGrid 
              rows={rows}
              columns={columns}
              pageSize={8}
              disableSelectionOnClick
              className='myOrdersTable'
              autoHeight
              />
            </div>
        </div>

      }
    </>
  )
}

export default MyOrder