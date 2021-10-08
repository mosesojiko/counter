
import { BrowserRouter, Link, Route } from 'react-router-dom';
import ProductPage from './pages/ProductPage';
import HomePage from './pages/HomePage';
import StoresPage from './pages/StoresPage';
import BasketPage from './pages/BasketPage';
import { useDispatch, useSelector } from 'react-redux';
import LoginPage from './pages/LoginPage';
import { logout } from './actions/userActions';
import RegisterPage from './pages/RegisterPage';
import ShippingAddressPage from './pages/ShippingAddressPage';
import PaymentMethodPage from './pages/PaymentMethodPage';
import PlaceOrderPage from './pages/PlaceOrderPage';
import OrderPage from './pages/OrderPage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import ProfilePage from './pages/ProfilePage';
import CreateStore from './pages/CreateStorePage';
import CreateProductPage from './pages/CreateProductPage';



function App() {
    //get access to basket items
    const basket = useSelector(state => state.basket);
    const { basketItems } = basket;

    //get access to userLogin from redux store
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;


    //logout function
    const dispatch = useDispatch()
    const logoutHandler = () =>{
        dispatch(logout())
    }
  return (
    <BrowserRouter>
    <div className="grid-container">
    <header className="row">
        <div>
            <a className="brand" href="/">Mosganda</a>
        </div>
        <div>
            <Link to ="/stores">Stores</Link>
            <Link to="/">Products</Link>
            <Link to ="/guide">Guide</Link>
        </div>
        <div>
            <Link to ="/basket/:id">Basket
            {
                basketItems.length > 0 &&
                <span className="badge">{basketItems.length}</span>
            }
            </Link>
            <Link to ="/register">Register</Link>
            {
                  /* Show name of user that logged in. Also implement logout */
                  userInfo? (
                    <div className ="dropdown">
                    <Link to ="#">{ userInfo.name } <i className ="fa fa-caret-down"></i> </Link>
                    <ul className = "dropdown-content">
                    <li>
                        <Link to ="/profile">User Profile</Link>
                    </li>
                    <li>
                        <Link to ="/orderhistory">Order History</Link>
                    </li>
                   <Link to ="#logout" onClick= { logoutHandler }> Logout </Link>
                   </ul>
               </div>

                  ):
                  (
                    <Link to ="/login">Login</Link>
                  )
            }
           
            
        </div>
    </header>
    <main>
    <Route path = '/createproduct' component = { CreateProductPage } ></Route>
    <Route path = '/createstore' component = { CreateStore } ></Route>
    <Route path = '/profile' component = { ProfilePage } ></Route>
    <Route path = '/orderhistory' component = { OrderHistoryPage } ></Route>
    <Route path = '/order/:id' component = { OrderPage } ></Route>
    <Route path = '/placeorder' component = { PlaceOrderPage } ></Route>
    <Route path = '/payment' component = { PaymentMethodPage } ></Route>
    <Route path = '/shipping' component = { ShippingAddressPage } ></Route>
    <Route path = '/register' component = { RegisterPage } ></Route>
    <Route path = '/login' component = { LoginPage } ></Route>
    <Route path = '/basket/:id?' component = { BasketPage } ></Route>
    <Route path = '/stores' component = { StoresPage } ></Route>
    <Route path = '/product/:id' component = {ProductPage} ></Route>
      <Route path = '/' component = {HomePage} exact></Route>
            
    </main>
    <footer className="row center">
        All right reserved
    </footer>
</div>
    </BrowserRouter>
   );
}

export default App;
