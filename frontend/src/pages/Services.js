import React from 'react'

function Services() {
    return (
        <div style={{backgroundColor:"#f5f5f5", padding:"10px", textAlign:"center", maxWidth:"100%"}}>
            <h2>Our service charges</h2>

            <h4>Store charge</h4>
            <p>It is free to register, create your store,  and sell on Mosganda. However, you will be charged <strong>#1000</strong> once in a year for store maintenance.</p>
            <h4> Item/Product </h4>
            <p>It is free to add items and post them for sale. Mosganda will only charge you a little token for our service when you sell that item/product.
            The service charge for item(s) is as follow:
            <table className="table">
            <thead>
            <tr>
            <th>No.</th>
            <th>Item/Product Price Range</th>
            <th>Charges</th>
            </tr>
            </thead>
            <tbody>
            <tr>
            <td>(1)</td>
            <td>#2000 and below</td>
            <td>#50</td>
            </tr>
            <tr>
            <td>(2)</td>
            <td>#2001 - #5000</td>
            <td>#100</td>
            </tr>
            <tr>
            <td>(3)</td>
            <td>#5001 - #10,000</td>
            <td>#200</td>
            </tr>
            <tr>
            <td>(4)</td>
            <td>#10,001 and above</td>
            <td>1.5% + #100</td>
            </tr>
            </tbody>
            </table>
            </p>
        </div>
    )
}

export default Services
