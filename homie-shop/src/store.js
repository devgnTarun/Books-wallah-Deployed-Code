import {  combineReducers , applyMiddleware, createStore} from 'redux';
// import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import { deleteReviewReducer, newProductReducer, newReviewReducer, productDeleteReducer, productDetailReducer, productReducer, productReviewsReducer } from './Reducer/productReducer';
import { allUserReducer, forgotPasswordReducer, profileReducer, userReducer, usersDetailReducer } from './Reducer/userReducer';
import { cartReducer } from './Reducer/cartReducer';
import { allOrderReducer, getLoggedUserOrderReducer, newOrderReducer, orderDetailsReducer, updateOrderReducer } from './Reducer/orderReducer';

const reducer = combineReducers({
        products : productReducer   ,
        productDetail : productDetailReducer   ,
        user : userReducer ,
        profile : profileReducer,
        forgotPassword : forgotPasswordReducer,
        cart : cartReducer,
        newOrder : newOrderReducer,
        myOrders : getLoggedUserOrderReducer,
        orderDetails : orderDetailsReducer,
        newReview : newReviewReducer,
        newProduct : newProductReducer,
        delProduct : productDeleteReducer,
        allOrder : allOrderReducer,
        delOrder : updateOrderReducer,
        allUser : allUserReducer,
        usersDetail : usersDetailReducer,
        allReviews : productReviewsReducer,
        delReview : deleteReviewReducer, 
});

let initialState = {
        cart : {
                cartItem : localStorage.getItem('cartItems') ?
                JSON.parse(localStorage.getItem("cartItems")) : [],
                shippingInfo : localStorage.getItem('shippingInfo') ? 
                JSON.parse(localStorage.getItem('shippingInfo')) : {}
        }
       
};

let middleware = [thunk]
const store = createStore(reducer ,initialState , composeWithDevTools(applyMiddleware(...middleware)))

export default store