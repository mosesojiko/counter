import React from 'react'
import './CreateStoreSteps.css'
import {  Link } from 'react-router-dom';

function CreateStoreSteps() {
  return (
      <div className='createstoresteps'> 
          <h2 className='createstoresteps-header'>Steps to create a store</h2>
          <p style={{color:"green", fontWeight:"bold", textAlign:"center"}}>You are four steps away from creating your online store.</p>
          <div className='createstoresteps-container'>
              <div className='createstoresteps-option'>
                  <h3>Step One</h3>
                      <img src="/steps/register3.jpg" alt="" />
                  <p className='gray'>Register with your name, email, and password.</p>
                  <Link to ="/register">Register here</Link>
              </div>
              <div className='createstoresteps-option'>
                  <h3>Step two</h3>
                      <img src="/steps/login2.jpg" alt="" />
                  <p className='gray'>Login with your registered email and password.</p>
                  <Link to ="/login">Login here</Link>
              </div>
              <div className='createstoresteps-option'>
                  <h3>Step three</h3>
                      <img src="/steps/online4.jpg" alt="" />
                  <p className='gray'>Fill the <q>Create Store</q> form.</p>
                  <Link to ="/createstore">Create store here</Link>
              </div>
              <div className='createstoresteps-option'>
                  <h3>Step four</h3>
                      <img style={{width: "150px"}} src="/steps/selling3.jpg" alt="" />
                  <p className='gray'>Add items to your store and start selling.
                  To access your store, click on your name at the top of the page, click on <q>userstore</q> in the dropdown.</p>
                  
              </div>
              <div className='createstoresteps-option'>
                  <p className='gray'>
                      To learn more, visit our step to step guide on {" "}
                      <Link to="/guide">how to use this website here</Link>
                  </p>
              </div>
          </div>

          {/* why sell on Mosganda */}
          <div >
              <h3 className='createstoresteps-header'>Why sell on Mosganda?</h3>
              <div className='sellonmosganda'>
                  <div className='sellonmosganda-container'>
                      <div style={{backgroundColor:"green", padding:"3px"}}><img style={{width:"120px"}} src="/steps/money2.jpg" alt="" /></div>
                      <h4>Make more money</h4>
                      <p className='gray'>Mosganda allows you to bring your business online, and make unlimited sales.</p>
                  </div>

                  <div className='sellonmosganda-container'>
                      <div style={{backgroundColor:"green", padding:"3px"}}><img style={{width:"120px"}} src="/steps/customers1.jpg" alt="" /></div>
                      <h4>Create customer base</h4>
                      <p className='gray'>Mosganda allows you to create business groups on Mosganda chat. This way, the seller can remarket to the customers and have business discussions with them.</p>
                  </div>

                  <div className='sellonmosganda-container'>
                      <div style={{backgroundColor:"green", padding:"3px"}}><img style={{width:"120px"}} src="/steps/brand2.jpg" alt="" /></div>
                      <h4>Retain your brand identity</h4>
                      <p className='gray'>Your brand identity remains intact. Customers know you by your brand.</p>
                  </div>

                  <div className='sellonmosganda-container'>
                      <div style={{backgroundColor:"green", padding:"3px"}}><img style={{width:"120px"}} src="/steps/graphic1.jpg" alt="" /></div>
                      <h4>No design skills</h4>
                      <p className='gray'>You do not need a graphic designer to create your online store. Just fill the form with your store information.</p>
                  </div>

                  <div className='sellonmosganda-container'>
                      <div style={{backgroundColor:"green", padding:"3px"}}><img style={{width:"120px"}} src="/steps/selling1.jpg" alt="" /></div>
                      <h4>Low commission</h4>
                      <p className='gray'>We charge you as low as 3% when you have successfully made a sale.</p>
                  </div>

                  <div className='sellonmosganda-container'>
                      <div style={{backgroundColor:"green", padding:"3px"}}><img style={{width:"120px"}} src="/steps/support1.jpg" alt="" /></div>
                      <h4>Customer support</h4>
                      <p className='gray'>You have our 24/7 support.</p>
                  </div>

                  <div className='sellonmosganda-container'>
                      <div style={{backgroundColor:"green", padding:"3px"}}><img style={{width:"120px"}} src="/steps/location1.jpg" alt="" /></div>
                      <h4>Location</h4>
                      <p className='gray'>You can sell from any town/city in Nigeria.</p>
                  </div>

              </div>
          </div>
    </div>
  )
}

export default CreateStoreSteps