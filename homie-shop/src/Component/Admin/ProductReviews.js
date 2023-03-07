import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { Button } from '@material-ui/core'
import MetaData from '../Layout/MetaData'
import Slider from './Slider'
import { DataGrid } from '@material-ui/data-grid'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import { clearError, deleteReviewAction , allReviewAction } from '../../Actions/productAction'
import Loader from '../Layout/Loader/Loader'
import {  DELETE_REVIEW_RESET } from '../../Constants/productContant'

const ProductReviews = () => {

    const dispatch = useDispatch()
    const history = useHistory()

    const {error  , reviews , loading} = useSelector(state => state.allReviews)

    const {error : deleteError , isDeleted} = useSelector(state => state.delReview)

    const deleteHandler = (reviewId) => {
        dispatch(deleteReviewAction(reviewId , productId))
    }

    const [productId, setProductId] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(allReviewAction(productId))
    }   


    const columns = [
        {field : "id" , headerName : "Product Id" , minWidth : 200 , flex : 0.5},
        {field : "user" , headerName : "User" , minWidth : 250 , flex : 0.5},
        {field : "rating" , headerName : "Rating" , minWidth : 150 , flex : 0.3 , type : "number" , cellClassName : (params) => {
            return (params.getValue(params.id , "rating") >= 3 ? "greenColor" : " redColor")}},
        {field : "comment" , headerName : "Comment" , minWidth : 350 , flex : 0.5 , type : "number"},
        {field : "action" , headerName : "Actions" , minWidth : 150 , type : "number" , sortable : false,flex : 0.3,
        renderCell : (params) => {
            return(
                <>
                <Button color='secondary' onClick={ () => deleteHandler(params.getValue(params.id, 'id'))}>
                    <i className="fas fa-trash"></i>
                </Button>
                </>
            )

         }    },
    ]

    const rows = [] ;
    reviews && reviews.forEach((item) => {
        rows.push({
            id : item._id,
            user : item.name,
            rating : item.rating,
            comment : item.comment,
        })
    })

    useEffect(() => {
        if(productId.length === 24){
        dispatch(allReviewAction(productId))
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
            toast.success("Review Deleted Successfully!!", {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
                history.push('/admin/reviews');
                dispatch({type : DELETE_REVIEW_RESET})
        }       

    }, [dispatch , toast , error , deleteError , isDeleted , history , productId])
    

  return (
    <>
   {
    loading ? <Loader/> : ( <>
        <MetaData title="All Reviews"/>  
        <div className='dashboard'>
               <Slider/>

               <div className="allProduct_box">

               <form action="" className='create_product_form' encType='multipart/form-data' onSubmit={submitHandler}>
                        <h3>All Reviews</h3>
                       
                        <div>
                            <label htmlFor="name">
                                    Name :
                            </label>
                            <input type="text" placeholder='Product Name' required value={productId} onChange={(e) => setProductId(e.target.value)}/>
                        </div>


                        <button id='create_pruduct_button' type='submit' disabled={loading ? true : false || productId === '' ? true : false}>Create</button>


                    </form>


                   {/* <h2>All Reviews</h2> */}

                   {
                    reviews && reviews.length > 0 ? <div className="product_container_box">
                    <DataGrid rows={rows} columns={columns} pageSize={10} disableSelectionOnClick autoHeight className='productlist_table'/>
                </div> : <h2>No Reviews Found</h2>
                   }
               </div>
        </div>     
   </>)
   }
   </>
  )
}


export default ProductReviews