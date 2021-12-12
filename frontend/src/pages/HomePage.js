import React, {  useEffect } from 'react'

import Product from '../components/Product';
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../actions/productActions';
import { Link } from 'react-router-dom';


function HomePage() {
 const dispatch = useDispatch();
  const getProducts = useSelector(state => state.getProducts)
  const { loading, error, products } = getProducts;
  //console.log(products)
   useEffect(()=>{
      dispatch(getAllProducts())
   }, [dispatch] )
    return (
      <div>
        <div className="row around">
          <div className="home-header">
            <h4>
              <Link to="/stores">Stores</Link>
            </h4>
            <h4>
              <Link to="/guide">Guide</Link>
            </h4>
          </div>
          <div>
            <h4>
              <Link to="/createstore">Create-Store</Link>
            </h4>
            
          </div>
        </div>

        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <div className="row center">
            {products.map((product) => (
              <Product key={product._id} product={product}></Product>
            ))}
          </div>
        )}
      </div>
    );
}

export default HomePage
