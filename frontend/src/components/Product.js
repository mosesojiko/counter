import React from "react";
//import { useState } from "react";
import { Link } from "react-router-dom";
//import Rating from "./Rating";
import Button from "@mui/material/Button";
import DetailsIcon from '@mui/icons-material/Details';
import PreviewIcon from '@mui/icons-material/Preview';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';

function Product(props) {
  const { product, showStoreButton} = props;
  //const [qty, setQty] = useState(1);
  const qty = 1;
  return (
    <div key={product._id} className="card product">
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
            <Link to={`/basket/${product._id}?qty=${qty}`}>
              <Button variant="contained" color="secondary" size="small">
                <AddShoppingCartOutlinedIcon />
                Buy
              </Button>
            </Link>
          </span>
          <span>
            <Link to={`/product/${product._id}`}>
              <Button variant="contained" color="success" size="small">
                <DetailsIcon />
                Detail
              </Button>
            </Link>
          </span>
          {
            showStoreButton === true ? 
              (<span>
              <Link to={`/store/${product.productStoreId}`}>
                  <Button variant="contained" color="success" size="small">
                    <PreviewIcon />
                  Store
                </Button>
              </Link>
              </span>) : ""
          }
          
        </div>

        {/* <Rating rating={product.rating} numReviews={product.numReviews} /> */}
      </div>
    </div>
  );
}

export default Product;
