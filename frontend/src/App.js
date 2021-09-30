
import { BrowserRouter, Link, Route } from 'react-router-dom';
import ProductPage from './pages/ProductPage';
import HomePage from './pages/HomePage';
import StoresPage from './pages/StoresPage';
import BasketPage from './pages/BasketPage';
import { useDispatch, useSelector } from 'react-redux';
import LoginPage from './pages/LoginPage';
import { logout } from './actions/userActions';
import RegisterPage from './pages/RegisterPage';



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
            <Link to ="/basket">Basket
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
    <Route path = '/register' component = { RegisterPage } ></Route>
    <Route path = '/login' component = { LoginPage } ></Route>
    <Route path = '/basket/:id' component = { BasketPage } ></Route>
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
