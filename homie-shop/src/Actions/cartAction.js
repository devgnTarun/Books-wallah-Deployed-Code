import { ADD_TO_CART, REMOVE_CART_ITEM, SAVE_SHIPPING_INFO } from "../Constants/cartConstant"
import axios from "axios"

export const addToCart = (id , quantity) => async (dispatch, getState) => {

        const {data} = await axios.get(`/api/v1/product/${id}`)

        dispatch({
            type : ADD_TO_CART,
            payload : {
                product : data.product._id,
                name : data.product.name,
                price : data.product.price,
                image : data.product.images[0].url,
                stock : data.product.stock,
                quantity,
            }
        })

         localStorage.setItem('cartItems' , JSON.stringify(getState().cart.cartItem))
}

export const removeFromCart = (id) => async (dispatch, getState) => {
    dispatch({
        type : REMOVE_CART_ITEM,
        payload : id,
    })
    localStorage.setItem('cartItems' , JSON.stringify(getState().cart.cartItem))
}
//  SAVE_SHIPPING_INFO
export const saveShippingDetails = (data) => async (dispatch ) => {
    dispatch(
        {
            type : SAVE_SHIPPING_INFO,
            payload : data,
        }
    )

    localStorage.setItem('shippingInfo' , JSON.stringify(data))
}