import React from 'react';
import useAuth from '../../hooks/useAuth';

const PlaceOrder = () => {
    const {user} = useAuth();
    if(user.email) localStorage.removeItem('product');
    return (
        <div>
            <h1>Order Placed</h1>
        </div>
    );
};

export default PlaceOrder;