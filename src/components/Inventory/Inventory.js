import React from 'react';
import "./Inventory.css"

const handleAddToInventory = () => {
    // const product = fakeData[0];
    // console.log('before post', fakeData.length);
    // fetch('http://localhost:3000/addProduct', {
    //     method: 'POST', 
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(fakeData)
    // })
    // .then(res=>res.json())
    // .then(data=>{
    //     console.log('Post successful', data)
    // })
}

const Inventory = () => {
    return (
        <div>
            <h1>Add more products to sell</h1>
            <button onClick={handleAddToInventory}>Add to Inventory</button>
        </div>
    );
};


export default Inventory;