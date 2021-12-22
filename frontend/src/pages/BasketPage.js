import React, {useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addToBasket, removeFromBasket } from '../actions/basketActions';
import MessageBox from '../components/MessageBox';
import Button from "@mui/material/Button";

function BasketPage(props) {
    const productId = props.match.params.id;
    //finding the qty
    const qty = props.location.search? Number(props.location.search.split('=')[1]) : 1

    const [proceed, setProceed ] = useState(true)
    //get basket from redux store
    const basket = useSelector((state) => state.basket);
    const { basketItems } = basket;
    console.log(basketItems)
    

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(addToBasket(productId, qty))
    },[dispatch, productId, qty])

    const removeFromBasketHandler = (id) => {
        dispatch(removeFromBasket(id))
    }
    //check if every element in the basket is has the same storeId
    const findStoreId = basket.basketItems.map((id) =>{
        return id.storeId
    })
    const storeId = findStoreId[0];
    const check = (val) => val === storeId

    const handleCheckout = () => {
        if(findStoreId.every(check)){
            setProceed(true)
            props.history.push('/login?redirect=shipping')
        }else{
            setProceed(false)
            
        }
       
    }
    return (
      <div className="row top">
        <div className="col-2">
          <h1>Shopping Basket</h1>
          {!proceed && (
            <p className="danger">
              Sorry, we discourage buying from more than one store/seller at a
              time. You can buy all your items from one store or order them
              seperately. Thanks.
            </p>
          )}
          {basketItems.length === 0 ? (
            <MessageBox>
              Basket is empty. <Link to="/">Go Shopping</Link>{" "}
            </MessageBox>
          ) : (
            <ul>
              {basketItems.map((item) => (
                <li key={item.product}>
                  <div className="row">
                    <div>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="small"
                      ></img>
                      
                    </div>
                    <div className="min-30">
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                      <p>Store name: {item.storeName}</p>
                      <p>
                        Location: {item.storeCity}, {item.storeCountry}
                      </p>
                      <p>
                        Seller-name: {item.sellerName}
                      </p>
                      <p><Link to={`/store/${item.storeId}`}>
                        
                          <Button
                            variant="contained"
                            color="success"
                            size="small"
                          >
                            View-store
                          </Button>
                        
                      </Link></p>
                    </div>
                    <div>
                      <select
                        value={item.qty}
                        onChange={(e) =>
                          dispatch(
                            addToBasket(item.product, Number(e.target.value))
                          )
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>#{item.price}</div>
                    <div>
                      <button
                        type="button"
                        onClick={() => removeFromBasketHandler(item.product)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="col-1">
          <div className="card card-body">
            <ul>
              <li>
                <h2>
                  Subtotal ({basketItems.reduce((a, c) => a + c.qty, 0)} items)
                  : #{basketItems.reduce((a, c) => a + c.price * c.qty, 0)}
                </h2>
              </li>
              <li>
                <button
                  type="button"
                  onClick={handleCheckout}
                  className="primary block"
                  disabled={basketItems.length === 0}
                >
                  Proceed to checkout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
}


export default BasketPage
