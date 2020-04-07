import React from 'react';
import './Shipping.css'
import { useForm } from 'react-hook-form';
import { useAuth } from '../Login/useAuth';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { getDatabaseCart, clearLocalShoppingOrder } from '../../utilities/databaseManager';
import CheckoutForm from '../CheckoutForm/CheckoutForm';
import { useState } from 'react';

const Shipping = () => {
  const { register, handleSubmit, errors } = useForm();
  const [shipInfo, setShipInfo] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const auth = useAuth();

  const stripePromise = loadStripe('pk_test_HQajl2JHQiUqsUrjiPOEEpOZ00SOr6tG6W');

  const onSubmit = data => {
    setShipInfo(data);

  }

  const handlePlaceOrder = (payment) => {
    const savedCart = getDatabaseCart();
    const orderDetails = {
      email: auth.user.email,
      cart: savedCart,
      shipment: shipInfo,
      payment: payment
    }
    fetch('http://localhost:3000/placeOrder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderDetails)
    })
      .then(res => res.json())
      .then(order => {
        setOrderId(order._id);
        clearLocalShoppingOrder();
      })
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6" style={{ display: shipInfo && 'none' }}>
          <h3>Shipment Information</h3>
          <form className="shipping_form" onSubmit={handleSubmit(onSubmit)}>
            <input name="name" defaultValue={auth.user.name} ref={register({ required: true })} placeholder='Name' />
            {
              errors.name && <span className='error'>This field is required</span>
            }

            <input name="email" defaultValue={auth.user.email} ref={register({ required: true })} placeholder='Email' />
            {
              errors.email && <span className='error'>This field is required</span>
            }

            <input name="AddressLine1" ref={register({ required: true })} placeholder='Address Line 1' />
            {errors.AddressLine1 && <span className='error'>This field is required</span>}
            <input name="AddressLine2" ref={register} placeholder='Address Line 2' />
            <input name="city" ref={register({ required: true })} placeholder='City' />
            {errors.city && <span className='error'>This field is required</span>}
            <input name="country" ref={register({ required: true })} placeholder='Country' />
            {errors.country && <span className='error'>This field is required</span>}
            <input name="zipcode" ref={register({ required: true })} placeholder='Zip Code' />
            {errors.zipcode && <span className='error'>This field is required</span>}
            <input className='shipping_btn' type="submit" />
          </form>
        </div>
        <div className="col-md-6" style={{ 'marginTop': '100px', display: shipInfo ? 'block' : 'none' }}>
          <h3>Payment Information</h3>
          <Elements stripe={stripePromise}>
            <CheckoutForm handlePlaceOrder={handlePlaceOrder}>

            </CheckoutForm>
          </Elements>
          <br />
          {
            orderId && <div>
              <h5>Thanks for shopping with us</h5>
              <h6>Your Order Id: <b>{orderId}</b></h6>
            </div>
          }
        </div>
      </div>
    </div>
  )
};

export default Shipping;