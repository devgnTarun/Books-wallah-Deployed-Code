import "./App.css";
import Header from "./Component/Layout/Header/Header";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Footer from "./Component/Layout/Footer/Footer";
import Home from './Component/Home/Home.js'
import ProductDetail from "./Component/Layout/Single Product Page/ProductDetail";
import Products from "./Component/Layout/Single Product Page/Products";
import Login from "./Component/User/Login";
import Register from "./Component/User/Register";
import { useEffect, useState } from "react";
import Profile from './Component/User/Profile'
import ProtectedRoute from "./Component/Route/ProtectedRoute";
import UpdateProfile from "./Component/User/UpdateProfile";
import UpdatePassword from "./Component/User/UpdatePassword";
import ForgotPassword from "./Component/User/ForgotPassword";
import ResetPassword from "./Component/User/ResetPassword";
import { useDispatch } from "react-redux";
import { loadUser } from "./Actions/userAction";
import Cart from "./Component/Cart/Cart";
import Shipping from "./Component/Cart/Shipping";
import ConfirmOrder from "./Component/Cart/ConfirmOrder";
import axios from "axios";
import Payement from "./Component/Cart/Payement";
import { Elements } from "@stripe/react-stripe-js";
import {loadStripe} from '@stripe/stripe-js'
import OrderSuccess from "./Component/Cart/OrderSuccess";
import MyOrder from "./Component/Order/MyOrder";
import OrderDetails from "./Component/Order/OrderDetails";
import Dashboard from "./Component/Admin/Dashboard";
import ProductList from "./Component/Admin/ProductList";
import NewProduct from "./Component/Admin/NewProduct.js";
import UpdateProduct from "./Component/Admin/UpdateProduct";
import OrderList from "./Component/Admin/OrderList";
import UpdateOrder from "./Component/Admin/UpdateOrder";
import UserList from "./Component/Admin/UserList";
import UpdateUser from "./Component/Admin/UpdateUser";
import ProductReviews from "./Component/Admin/ProductReviews";
import CategoryPage from "./Component/Layout/Single Product Page/CategoryPage";
import SellBooks from "./Component/Layout/SingleComponents/SellBooks";
import NotFound from "./Component/Layout/SingleComponents/NotFound";
import Condition from "./Component/Layout/SingleComponents/Condition";

function App() {

  const dispatch = useDispatch();

  const [stripeApiKey , setStripeApiKey] = useState("");

  async function getStripeApi () {
    const {data} = await axios.get("/api/v1/stripeApikey");

    setStripeApiKey(data.stripe_api_key)
  }

  useEffect(() => {

    dispatch(loadUser())
    
    getStripeApi()
  }, [dispatch])
  
  window.addEventListener('contextmenu' , (e) => e.preventDefault())

  return (
    <>
    <Router>
      <Header />

      {stripeApiKey && ( <Elements stripe={loadStripe(stripeApiKey)}>
           <ProtectedRoute exact path={'/processing/payement'}><Payement/></ProtectedRoute>
        </Elements>)
      }
      <Switch>

        <Route exact path={'/'}><Home/></Route>

        <Route exact path={'/resetPassword/:token'}> <ResetPassword/> </Route>

        <Route exact path={'/product/:id'}><ProductDetail/></Route>

        <Route exact path={'/products'}><Products/></Route>

        <Route exact path={'/products/:keyword'}><Products/></Route>

        <Route exact path={'/category/:keyword'}><CategoryPage/></Route>

        <Route exact path={'/login'}><Login/></Route>

        <Route exact path={'/register'}><Register/></Route>

        <ProtectedRoute exact path={'/account'}><Profile/></ProtectedRoute>

        <ProtectedRoute exact path={'/updateProfile'}><UpdateProfile/></ProtectedRoute>

        <ProtectedRoute exact path={'/updatePassword'}><UpdatePassword/></ProtectedRoute>

        <Route exact path={'/forgotPassword'}><ForgotPassword/> </Route>

        <Route exact path={'/cart'}><Cart/> </Route>

        <Route exact path={'/seller'}><SellBooks/> </Route>

        <Route exact path={'/condition'}><Condition/> </Route>

        <ProtectedRoute exact path={'/shipping'}><Shipping/></ProtectedRoute>

        <ProtectedRoute exact path={'/order/confirm'}><ConfirmOrder/></ProtectedRoute>

        <ProtectedRoute exact path={'/order/:id'}><OrderDetails/></ProtectedRoute>

        <ProtectedRoute exact path={'/success'}><OrderSuccess/></ProtectedRoute>

        <ProtectedRoute exact path={'/me/orders'}><MyOrder/></ProtectedRoute>

        <ProtectedRoute isAdmin={true}  exact path={'/admin/dashboard'}><Dashboard/></ProtectedRoute>

        <ProtectedRoute isAdmin={true}  exact path={'/admin/products'}><ProductList/></ProtectedRoute>

        <ProtectedRoute isAdmin={true}  exact path={'/admin/product'}><NewProduct/></ProtectedRoute>

        <ProtectedRoute isAdmin={true}  exact path={'/admin/product/:id'}><UpdateProduct/></ProtectedRoute>

        <ProtectedRoute isAdmin={true}  exact path={'/admin/orders'}><OrderList/></ProtectedRoute>

        <ProtectedRoute isAdmin={true}  exact path={'/admin/order/:id'}> <UpdateOrder/> </ProtectedRoute>

        <ProtectedRoute isAdmin={true}  exact path={'/admin/users'}><UserList/></ProtectedRoute>

        <ProtectedRoute isAdmin={true}  exact path={'/admin/user/:id'}> <UpdateUser/></ProtectedRoute>

        <ProtectedRoute isAdmin={true}  exact path={'/admin/reviews'}><ProductReviews/></ProtectedRoute>

        <Route component={window.location.pathname === '/processing/payement' ? null : NotFound}/>

      </Switch>
      <Footer/>
      </Router>
    </>
  );
}

export default App;
