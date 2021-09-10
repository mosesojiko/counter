import data from './data';
import Product from './components/Product'

function App() {
  return (
    <div className="grid-container">
        <header className="row">
            <div>
                <a className="brand" href="/">Mosganda</a>
            </div>
            <div>
                <a href="/store">Store</a>
                <a href="/cart">Cart</a>
                <a href="/signup">Sign Up</a>
                <a href="/signin">Sign In</a>
            </div>
        </header>
        <main>
            <div className="row center">
              {
                data.products.map((product) =>(
                  <Product product = {product} />
                ))
              }
                
            </div>
        </main>
        <footer className="row center">
            All right reserved
        </footer>
    </div>
  );
}

export default App;
