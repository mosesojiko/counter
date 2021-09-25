
import { BrowserRouter, Link, Route } from 'react-router-dom';
import ProductPage from './pages/ProductPage';
import HomePage from './pages/HomePage';
import StoresPage from './pages/StoresPage';
import BasketPage from './pages/BasketPage';
import { useSelector } from 'react-redux';


function App() {
    //get access to basket items
    const basket = useSelector(state => state.basket);
    const { basketItems } = basket;
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
            <Link to ="/signup">Sign-Up</Link>
            <Link to ="/signin">Login</Link>
        </div>
    </header>
    <main>
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
