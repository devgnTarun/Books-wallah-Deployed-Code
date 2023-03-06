import React, { useEffect } from 'react'
import Slider from './Slider.js'
import './dashboard.css'
import {Doughnut , Line} from 'react-chartjs-2'
import { CategoryScale } from "chart.js";
import { Chart as ChartJS } from "chart.js/auto";
import {
    IonTitle,
    useIonViewWillEnter,
    useIonViewWillLeave,
  } from "@ionic/react";
import { useSelector , useDispatch} from 'react-redux';
import {  getAdminProduct } from '../../Actions/productAction'
import MetaData from '../Layout/MetaData'
import { getAllOrders } from '../../Actions/orderAction.js';
import { getAllUsersAction } from '../../Actions/userAction.js';

  

const Dashboard = () => {
    
    const dispatch = useDispatch()
    const {products} = useSelector(state => state.products)
    const { orders} = useSelector(state => state.allOrder)
    const { users} = useSelector(state => state.allUser)


    useEffect(() => {
        dispatch(getAdminProduct())
        dispatch(getAllOrders())
        dispatch(getAllUsersAction())
    }, [dispatch ])

    let outOfStock = 0;

    products && products.forEach(i => {
        if(i.stock <= 0) {
            outOfStock += 1;
          
    }});

    useIonViewWillEnter(() => {
        ChartJS.register(CategoryScale);
      }, []);
    
      useIonViewWillLeave(() => {
        ChartJS.unregister(CategoryScale);
      }, []);

      let totalAmount = 0;
      orders && orders.forEach(item => {
            totalAmount += item.totalPrice
      });

    const lineState = {
        labels : ["Initial Amount" , "Earned Amount"],
        datasets : [
            {
                label : "Total Amount",
                backgroundColor : 'orange',
                hoverBackgroundColor : ['rgb(255, 115, 0)'],
                data  : [0 , totalAmount]
            }
        ]
    };

    const doughnutState = {
        labels : ["Out of Stock", "In Stock"],
        datasets : [
            {
                backgroundColor : ["orange" , "rgb(93, 224, 0)"],
                hoverBackgroundColor : ["rgb(255, 64, 0)" , "rgb(0, 255, 21)"],
                data : [outOfStock, products.length - outOfStock]
            }
        ]
    }
  return (
   <>
    <MetaData title={'DashBoard'}/>

        <div className="dashboard">

            <Slider/>

            <div className="dashboard_box">
                <h3>DashBoard</h3>


                <div className="dashboardSummary">
                    <div style={{background: "rgb(253,197,15)",
background: "linear-gradient(180deg, rgba(253,197,15,1) 0%, rgba(251,152,47,1) 100%)"}}>
                        <h3>{orders && orders.length}</h3>
                        <p>Orders</p>
                    </div>
                    <div style={{background: "rgb(253,114,15)",
background: "linear-gradient(180deg, rgba(253,114,15,1) 0%, rgba(255,0,39,1) 100%)"}}>
                        <h3>{users && users.length}</h3>
                        <p>Users</p>
                    </div>
                    <div style={{background: "rgb(15,244,253)",
background: "linear-gradient(180deg, rgba(15,244,253,1) 0%, rgba(0,52,255,1) 100%)"}}>
                        <h3>{products && products.length}</h3>
                        <p>Products</p>
                    </div>
                </div>

                 <div className="line_chart">
                    <Line data={lineState}/>
                </div>
            <div className="doughnut">
                    <Doughnut data={doughnutState}/>
            </div>


            </div>
        </div>
   </>
  )
}

export default Dashboard