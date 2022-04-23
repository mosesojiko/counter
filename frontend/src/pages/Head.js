import React from 'react'
import './Head.css'
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';

function Head() {
    
  return (
    <div className="Header">
            {/* Logo */}
            <Link to="/">
              <div className="Header-logo">
                  Logo
                    {/* <img src={"https://mikekitko.com/wp-content/uploads/2019/10/amazon-logo-white-768x232.png"} /> */}
                </div>
            </Link>
            {/* Address */}
            <div className="Header-optionAddress">
                {/* icon */}
                <div className="Header-option">
                    <span className="Header-optionLineOne">Hello,</span>
                    <span className="Header-optionLineTwo">Select your address</span>
                </div>

            </div>
            {/* Search */}
            <div className="Header-search">
                <input className="Header-searchInput" type="text" />
                <div className="Header-searchIconContainer">
                     <SearchIcon /> 
                </div>  
            </div>
            <div className="Header-navItems">
                    {/* Login name */}
                <div className="Header-option">
                    <span className="Header-optionLineOne">Hello, Nazariy</span>
                    <span className="Header-optionLineTwo">Account  Lsits</span>
                </div>  
                    {/* Orders */}
                <div className="Header-option">
                    <span className="Header-optionLineOne">Returns</span>
                    <span className="Header-optionLineTwo"> Orders</span>
                </div>  
                    {/* Cart */}
                <Link to="/cart">
                    <div className="Header-optionCart">
                         <ShoppingCartIcon /> 
                        <span className="Header-cartCount">0</span>
                    </div>
                </Link>
            </div>
  
            
        </div>
  )
}

export default Head