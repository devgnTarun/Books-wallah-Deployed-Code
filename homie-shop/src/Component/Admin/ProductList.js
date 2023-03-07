import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { Button } from '@material-ui/core'
import MetaData from '../Layout/MetaData'
import Slider from './Slider'
import { DataGrid } from '@material-ui/data-grid'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import { clearError, deleteProductAction, getAdminProduct } from '../../Actions/productAction'
import './productList.css'
import Loader from '../Layout/Loader/Loader'
import { DELETE_PRODUCT_RESET } from '../../Constants/productContant'

const ProductList = () => {

    const dispatch = useDispatch()
    const history = useHistory()

    const {error , loading , products} = useSelector(state => state.products)

    const {error : deleteError , isDeleted} = useSelector(state => state.delProduct)

    const deleteHandler = (id) => {
        dispatch(deleteProductAction(id))
    }


    const columns = [
        {field : "id" , headerName : "Product Id" , minWidth : 200 , flex : 0.5},
        {field : "name" , headerName : "Name" , minWidth : 250 , flex : 0.5},
        {field : "stock" , headerName : "Stock" , minWidth : 150 , flex : 0.3 , type : "number"},
        {field : "price" , headerName : "Price" , minWidth : 230 , flex : 0.5 , type : "number"},
        {field : "action" , headerName : "Actions" , minWidth : 150 , type : "number" , sortable : false,flex : 0.3,
        renderCell : (params) => {
            return(
                <>
                <Link className='edit_Icon' to={`/admin/product/${params.getValue(params.id, 'id')}`}>
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
    products && products.forEach((item) => {
        rows.push({
            id : item._id,
            name : item.name,
            price : item.price,
            stock : item.stock,
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
            toast.success("Product Deleted Successfully!!", {
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
                dispatch({type : DELETE_PRODUCT_RESET})
        }       

        dispatch(getAdminProduct())
    }, [dispatch , error , deleteError , isDeleted , history])
    

  return (
    <>
   {
    loading ? <Loader/> : ( <>
        <MetaData title="All Products"/>  
        <div className='dashboard'>
               <Slider/>

               <div className="allProduct_box">
                   <h2>All Products</h2>

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

export default ProductList