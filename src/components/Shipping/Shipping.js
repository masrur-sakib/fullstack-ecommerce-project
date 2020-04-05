import React from 'react';
import './Shipping.css'
import { useForm } from 'react-hook-form';
import { useAuth } from '../Login/useAuth';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';

const Shipping = () => {
    const { register, handleSubmit, errors } = useForm();
    const auth = useAuth();
    const onSubmit = data => { 
      // TODO: Sakib move this after payment
      console.log(auth.user.email);
      const savedCart = getDatabaseCart();
      const orderDetails = {email: auth.user.email, cart: savedCart}
      fetch('http://localhost:3000/placeOrder', {
        method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderDetails)
      })
      .then(res=>res.json())
      .then(data=>{
        console.log('order placed', data);
        alert('Successfully placed your order. Order Id:'+ data._id);
        processOrder();
      })
    }
    
  
    return (
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
    )
};

export default Shipping;