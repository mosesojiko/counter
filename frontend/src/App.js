
import { BrowserRouter, Route } from 'react-router-dom';
import ProductPage from './pages/ProductPage';
import HomePage from './pages/HomePage';
import StoresPage from './pages/StoresPage';
function App() {
  return (
    <BrowserRouter>
    <div className="grid-container">
    <header className="row">
        <div>
            <a className="brand" href="/">Mosganda</a>
        </div>
        <div>
            <a href="/stores">Stores</a>
            <a href="/">Products</a>
            <a href="/guide">Guide</a>
        </div>
        <div>
            <a href="/basket">Basket</a>
            <a href="/signup">Sign-Up</a>
            <a href="/signin">Login</a>
        </div>
    </header>
    <main>
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
