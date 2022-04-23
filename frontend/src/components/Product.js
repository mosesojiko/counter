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
          <h4 style={{ textAlign: "center" }}>{product.name}</h4>
         
        </Link>
        <div className="card-body-items">
            <h4>#{product.price}</h4>
          
            <p>{product.storeCity}</p>
          
        </div>
        <div className="card-body-span">
          <span>
            <Link to={`/basket/${product._id}?qty=${qty}`}>
              <Button variant="contained" color="secondary" size="small">
                <span className="card-body-span-items">
                  <AddShoppingCartOutlinedIcon />
                  <span>Buy</span>
                </span>
                
              </Button>
            </Link>
          </span>
          <span>
            <Link to={`/product/${product._id}`}>
              <Button variant="contained" color="success" size="small">
                <span className="card-body-span-items">
                   <DetailsIcon />
                  <span>Detail</span>
                </span>
              </Button>
            </Link>
          </span>
          {
            showStoreButton === true ? 
              (<span>
              <Link to={`/store/${product.productStoreId}`}>
                  <Button variant="contained" color="success" size="small">
                    <span className="card-body-span-items">
                   <PreviewIcon />
                  <span>Store</span>
                </span>
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
