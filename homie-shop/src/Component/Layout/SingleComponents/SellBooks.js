import React from 'react'
import './sell.css'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

const SellBooks = () => {

  const handleSend = (e)=> {
    e.preventDefault()
    setTimeout(() => {
      toast.success("Email sended ", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    }, 3000);
 
  }
  return (

    <>
    <ToastContainer/>
        <div className="sellBook_page">
            <div>
            <i class="fas fa-hand-peace"></i>
            <h3>This Page is Under Process! Working for every person seller function!</h3>
            <form action=""><input required type="email" placeholder='Enter E-mail' />
            <button onClick={handleSend}>Notify me!</button></form>
            
            </div>
        </div>
    </>
  )
}

export default SellBooks