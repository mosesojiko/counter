import React from "react";
//import { useState } from "react";
import { Link } from "react-router-dom";
//import Rating from "./Rating";

function Product(props) {
  const { product } = props;
  //const [qty, setQty] = useState(1);
  const qty = 1;
  return (
    <div key={product._id} className="card">
      <Link to={`/product/${product._id}`}>
        <img className="medium" src={product.image} alt={product.name} />
      </Link>
      <div className="card-body">
        <Link to={`/product/${product._id}`}>
          <h2 style={{ textAlign: "center" }}>{product.name}</h2>
          {/* {product.isSold && <h3 className="sold">Item Sold</h3>} */}
        </Link>
        <div className="card-body-items">
          <div className="price">
            <h3>#{product.price}</h3>
          </div>
          <div>
            <p>{product.storeCity}</p>
          </div>
        </div>
        <div className="card-body-span">
          <span>
            <Link to={`/basket/${product._id}?qty=${qty}`}><strong>Buy</strong></Link>
          </span>
          <span>
            <Link to={`/product/${product._id}`}>detail</Link>
          </span>
          <span>
            <Link to={`/store/${product.productStoreId}`}>
              view-store
            </Link>
          </span>
        </div>

        {/* <Rating rating={product.rating} numReviews={product.numReviews} /> */}
      </div>
    </div>
  );
}

export default Product;
