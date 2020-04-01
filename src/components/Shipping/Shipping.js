import React from 'react';
import './Shipping.css'
import { useForm } from 'react-hook-form';
import { useAuth } from '../Login/useAuth';

const Shipping = () => {
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = data => { console.log(data) }
    const auth = useAuth();
  
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