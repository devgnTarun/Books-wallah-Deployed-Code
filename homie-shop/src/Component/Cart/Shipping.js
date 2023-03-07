import React, { useState } from 'react'
import {  useSelector, useDispatch } from 'react-redux'
import './shipping.css'
import {useHistory} from 'react-router-dom'
import MetaData from '../Layout/MetaData'
import {Country , State,} from 'country-state-city'
import CheckOurSteps from './CheckOurSteps'
import Pincode from 'react-pincode';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import { saveShippingDetails } from '../../Actions/cartAction'

const Shipping = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const {shippingInfo} = useSelector((state) => state.cart)

    const [address, setAddress] = useState(shippingInfo.address)
    const [pinCode, setPinCode] = useState(shippingInfo.pinCode)
    const [city, setCity] = useState(shippingInfo.city)
    const [state, setState] = useState(shippingInfo.state)
    const [country, setCountry] = useState(shippingInfo.country)
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo)

    const shippingSubmit = (e) => {
            e.preventDefault();
            if(phoneNo.length < 10 || phoneNo.length > 10) {
                toast.error("Phone Number should be atleast of 10 digit", {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    });
                    return;
                  }
            dispatch(
                saveShippingDetails({address , city , state , country , pinCode, phoneNo})
            )
            history.push('/order/confirm')
    }
    
  return (
    <>
    <MetaData title={'Proceed Shipping'}/>
    <div className="shipping_page">
    <CheckOurSteps activeStep={0}/>
    <h2>Shipping Address</h2>
        <div className="shipping_box">
            

            <form className="shipping_form" onSubmit={shippingSubmit}>
            <label>
              Address:
              <input
                type="text"
                required
                value={address}
                onChange={e => setAddress(e.target.value)}
              />
            </label>

            <label>
              City:
              <input
              required
                type="text"
                value={city}
                onChange={e => setCity(e.target.value)}
              />
            </label>

            <label>
              Pincode:
              <input
              required
                type="number"
                value={pinCode}
                onChange={e => setPinCode(e.target.value)}
              />
            </label>
        {/* <label required>
            Pincode & City :
        <Pincode
        showArea={false}
        showDistrict={false}
        showState={false}
        invalidError="Please check pincode"
        lengthError='Pincode should be 6 digits'
        getData={(data) => setPinCode(data)}
          />
          </label> */}
            
            <label>
              Phone Number:
              <input
              required
                type="tele"
                value={phoneNo}
                onChange={e => setPhoneNo(e.target.value)}
              />
            </label>

            <label>
              Country:
                <select required value={country} onChange={(e) => setCountry(e.target.value)}>
                    <option > Country</option>
                    {Country && Country.getAllCountries().map((item) => 
                        <>
                        <option value={item.isoCode} key={item.flag}>  {item.name} </option>
                        </>
                    )}
                </select>
            </label>

            { country && 
              <label>
                  State :
                <select value={state} required onChange={(e) => setState(e.target.value)}>
                    <option>
                        State
                    </option>
                    {
                        State && State.getStatesOfCountry(country).map((i)  => 
                            <option key={i.name} value={i.isoCode}>
                                {i.name}
                            </option>
                        )
                    }
                </select>
              </label>}
            

                <input value={'Continue'}  className='shippingBtn' type='submit' />
                   
            </form>
        </div>
    </div>
    
    </>
  )
}

export default Shipping