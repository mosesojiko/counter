import React from 'react';
import './services.css'

function Services() {
    return (
        <div className='createstoresteps'>
            <h3 style={{ textAlign: "center",marginBottom:"50px" }}>Our service charge</h3>
            
                
                    <div className='sellonmosganda-container service'>
                        <div style={{ backgroundColor: "green", padding: "3px" }}>
                            <img style={{ width: "120px" }} src="/steps/onlinebiz3.png" alt="" /></div>
                      <p className='gray'>We only charge you 3% when you have successfully sold an item.</p>
                  </div>
                
            
            <div>
                <h3 style={{ textAlign: "center", marginTop: "50px", marginBottom:"50px"}}>Withdrawal steps</h3>
                <div className='sellonmosganda'>
                    <div className='sellonmosganda-container'>
                        <div style={{ backgroundColor: "green", padding: "3px" }}>
                            <img style={{ width: "120px" }} src="/steps/payment1.jpg" alt="" /></div>
                        <h4>Customer has paid for your Item.</h4>
                      <p className='gray'>Go to your <strong>Sold items</strong>.</p>
                    </div>
                    <div className='sellonmosganda-container'>
                        <div style={{ backgroundColor: "green", padding: "3px" }}>
                            <img style={{ width: "120px" }} src="/steps/delivery2.jpg" alt="" /></div>
                        <h4>Delivery</h4>
                      <p className='gray'>Send the item(s) to the customer(buyer).</p>
                    </div>
                    <div className='sellonmosganda-container'>
                        <div style={{ backgroundColor: "green", padding: "3px" }}>
                            <img style={{ width: "120px" }} src="/steps/withdraw1.jpg" alt="" /></div>
                        <h4>Fill the withdrawal form</h4>
                      <p className='gray'>In the <strong>sold item page</strong>, click on the <strong>Pay me</strong> button and enter your account details.</p>
                    </div>
                    <div className='sellonmosganda-container'>
                        <div style={{ backgroundColor: "green", padding: "3px" }}>
                            <img style={{ width: "120px" }} src="/steps/complete1.jpg" alt="" /></div>
                        <h4>All is set</h4>
                      <p className='gray'>Get paid within 48 hours.</p>
                  </div>
                </div>
            </div>
        </div>
    )
}

export default Services
