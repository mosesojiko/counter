import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getSoldProducts } from '../actions/productActions';
import { createWidthdraw } from '../actions/widthdrawActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { CREATE_WIDTHDRAW_RESET } from '../constants/widthdrawConstants';

function SoldProducts() {

    const [ accountName, setAccountName ] = useState('')
    const [accountNumber, setAccountNumber ] = useState(0)
    const [ bank, setBank ] = useState('')
    const [ amount, setAmount ] = useState(0)
    const [ email, setEmail ] = useState('')
    const [ phone, setPhone ] = useState('')
    //const [totalAmount, setTotalAmount ] = useState(0)
  //get login user details from store
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  console.log(userInfo);

  //get ordered products from redux store
  const productSold = useSelector((state) => state.productSold);
  const { loading, error, soldProducts } = productSold
  console.log(soldProducts);

  //get widthdrawal from redux store
  const widthdrawal = useSelector((state) => state.widthdrawal);
  const { loading: loadDraw, error: errorDraw, success } = widthdrawal

  const solo = soldProducts
  console.log(solo)

const dispatch = useDispatch();


useEffect(() =>{
    dispatch(getSoldProducts())
},[dispatch])

  const handleSubmit = () => {
      dispatch(createWidthdraw(accountName, accountNumber, bank, amount, email, phone));
      dispatch({type: CREATE_WIDTHDRAW_RESET})
  }

    return (
      <div>
        <div className="row top">
          <div className="col-1 widthdrawal-steps">
            <h3>
              Total Amount: <strong>#</strong>
            </h3>
          </div>
          <div>
            <div className="col-2 widthdrawal-steps">
              <h3>Widthdrawal Steps</h3>
              <ul>
                <li>Get your product delivered to your customer.</li>
                <li>Click on the payout button to payout the product</li>
                <li>Fill the widthdrawal form and submit.</li>
                <li>Get paid within 48 hours.</li>
              </ul>
            </div>
          </div>
        </div>
        <div>
          <form className="form" onSubmit={handleSubmit}>
            <div>
              <h1>Widthdrawal Form</h1>
            </div>
            {loadDraw && <LoadingBox></LoadingBox>}
            {errorDraw && <MessageBox variant="danger">{errorDraw}</MessageBox>}
            {success && (
              <MessageBox variant="success">
                Widthdraw request submitted.
              </MessageBox>
            )}
            <div>
              <label htmlFor="accountname">Account Name</label>
              <input
                type="text"
                id="acoountname"
                onChange={(e) => setAccountName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="accountnumber">Account Number</label>
              <input
                type="text"
                id="accountnumber"
                onChange={(e) => setAccountNumber(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="bank">Bank Name</label>
              <input
                type="text"
                id="bank"
                onChange={(e) => setBank(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="amount">Amount</label>
              <input
                type="text"
                id="amount"
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="phone">Phone</label>
              <input
                type="text"
                id="phone"
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div>
              <label />
              <button className="primary" type="submit">
                Widthdraw
              </button>
            </div>
          </form>
        </div>
        <h3>Sold Items</h3>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger"></MessageBox>
        ) : (
          <div className="row center">
            {soldProducts.map(
              (product) =>
                product?.buyerName && (
                  <div key={product._id} className="card">
                    <Link to={`/product/${product._id}`}>
                      {/* image size should be 680px by 830px */}
                      <img
                        className="medium"
                        src={product.image}
                        alt={product.name}
                      />
                    </Link>
                    <div className="card-body">
                      <Link to={`/product/${product._id}`}>
                        <h2>Product Name: {product.name}</h2>
                      </Link>
                      <div className="price">
                        Price: <strong>#{product.price}</strong>
                      </div>
                      <div>
                        <h3>Customer Information</h3>
                        <p>
                          Name: <strong>{product.buyerName}</strong>
                        </p>
                        <p>
                          Phone: <strong>{product.buyerPhone}</strong>
                        </p>
                        <p>
                          Address: <strong>{product.buyerAddress}</strong>
                        </p>
                        <p>
                          Payment Status:{" "}
                          <strong>
                            {product.isPaid ? "Paid" : "Not Yet Paid"}
                          </strong>
                        </p>
                        <p>
                          Payment Date:{" "}
                          <strong>
                            {product.isPaid
                              ? product.isPaidAt.substring(0, 10)
                              : "Not Yet Paid"}
                          </strong>
                        </p>
                      </div>
                    </div>
                  </div>
                )
            )}
          </div>
        )}
      </div>
    );
}

export default SoldProducts
