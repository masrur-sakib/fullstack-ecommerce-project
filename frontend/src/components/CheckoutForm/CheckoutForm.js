import React from 'react';
import {
    CardElement,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';
import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CheckoutForm = (props) => {
    const [paymentError, setPaymentError] = useState(null);
    const [paymentCompleted, setPaymentCompleted] = useState(null);
    const stripe = useStripe();
    const elements = useElements();

    // Toast Notification Functions 
    toast.configure();
    const toastOrderConfirmed = () => {
        toast.success('Your Order is Confirmed', {
            position: toast.POSITION.BOTTOM_RIGHT, 
            autoClose: 3000
        })
    }
    const toastPaymentError = (error) => {
        toast.error(error, {
            position: toast.POSITION.BOTTOM_RIGHT, 
            autoClose: 3000
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
        });
        if(error){
            setPaymentError(error.message);
            setPaymentCompleted(null);
            toastPaymentError(error.message);
        }
        else{
            setPaymentCompleted(paymentMethod);
            const payment = {
                id: paymentMethod.id,
                last4: paymentMethod.card.last4

            }
            props.handlePlaceOrder(payment);
            setPaymentError(null);
            toastOrderConfirmed();
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            <button className="mt-3 btn btn-info" type="submit" disabled={!stripe}>
                Pay
            </button>
            {
                paymentError && <p className="mt-3 text-danger">{paymentError}</p>
            }
            {
                paymentCompleted && <p className="mt-3 text-success">Payment is done successfully.</p>
            }
        </form>
    );
};

export default CheckoutForm;