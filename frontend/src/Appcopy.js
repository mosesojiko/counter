
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
import StoreDetailsPage from './pages/StoreDetailsPage';
import UserStore from './pages/UserStore';
import EditStore from './pages/EditStore';
import UpdateProduct from './pages/UpdateProduct';
import DeleteProduct from './pages/DeleteProduct';
import SoldProducts from './pages/SoldProducts';
import WithdrawHistory from './pages/WithdrawHistory';
import Chats from './pages/Chats';
import { ChatState } from "./context/ChatProvider";
import axios from 'axios';
import {useEffect, useState } from 'react';
import Guide from './pages/Guide';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CustomerOrders from './pages/CustomerOrders';
import Feedback from './pages/Feedback';
import UserList from './pages/UserList';
import StoreList from './pages/StoreList';
import ProductList from './pages/ProductList';
import OrderList from './pages/OrderList';
import WithdrawList from './pages/WithdrawList';
import ComplainList from './pages/ComplainList';
import TermConditions from './pages/TermConditions';
import About from './pages/About';
import Ojiko from './pages/Ojiko';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import LoadingBox from './components/LoadingBox';
import NewsletterEmailList from './pages/NewsletterEmailList';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import Video from './pages/Video';
import Services from './pages/Services';
import ShoppingBasketOutlinedIcon from '@mui/icons-material/ShoppingBasketOutlined';
import ChatIcon from '@mui/icons-material/Chat';
import ViewUser from './pages/ViewUser';
import ForgotPassword from './pages/ForgotPassword';
import Resetpassword from './pages/Resetpassword';
import Privacy from './pages/Privacy';
import Dashboard from './pages/Dashboard';
import Head from './pages/Head';
import SearchIcon from '@mui/icons-material/Search';






function App() {
  const [newsEmail, setNewsEmail] = useState('')
  const [createNewsEmailSuccess, setCreateNewsEmailSuccess] = useState(false)
  const [createNewsEmailFail, setCreateNewsEmailFail] = useState(false)
  const [ loadingnewsEmail, setLoadingnewsEmail] = useState(false)
  const [trackbasket, setTrackbasket] = useState(true)


  //get access to basket items
  const basket = useSelector((state) => state.basket);
  const { basketItems } = basket;
  const [notifs, setNotifs] = useState([]) //for notification

  //get access to userLogin from redux store
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  

  //logout function
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout());
    window.location = "/";
  };

   //import state from context
    const { selectedChat, chats } = ChatState();

  //fetch all user notifications
  const myNotification = async () => {
    try {
      const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };

      const { data } = await axios.get("/api/v1/chat/findnotification", config);
      setNotifs(data)

    } catch (error) {
      console.log(error)
    }
  }
 
  useEffect(() => {
    myNotification()
  },[userInfo, selectedChat, chats])
 
  const myNotifications = notifs.filter((n) => n.latestMessage.sender._id !== userInfo._id)
  
  //function to collect newsletter email
  const submitNewsletter = async(e) => {
    e.preventDefault();
    try {
            setLoadingnewsEmail(true)
            await axios.post('/api/v1/newsletter/create', { newsEmail });
            setLoadingnewsEmail(false)
      setCreateNewsEmailSuccess(true)
      setNewsEmail("")
      
        } catch (error) {
            setCreateNewsEmailFail(true)
        }

  }
  return (
    <BrowserRouter>
    
      <div className="grid-container">
        <header className="row">
          <div>
            <a className="brand" href="/">
              <img style={{ width: "30px", height: "30px" }} src='/images/mosganda-logo4.jpg' alt="" />
           <span style={{margin:"0px"}}>osganda</span>
            </a>
          </div>
          
          <div className="header-items">
          <span>
          <Link to="/chats">
              <ChatIcon sx={{ fontSize: "15px", color:"yellow"}} />
              Chat
              {myNotifications.length > 0 && (
                <span className="badge">{myNotifications.length}</span>
              )}
                </Link>
          </span>
            
            <span>
            <Link to="/basket/:id">
              
               <ShoppingBasketOutlinedIcon  sx={{ fontSize: "15px", color:"yellow" }} />
              Basket
              {basketItems.length > 0 && (
                <span className="badge">{basketItems.length}</span>
              )}
            </Link>
            </span>
            
              {
                !userInfo && <span>
                <Link to="/register">Register</Link>
              </span>
              }
            
            <span>
            {
              /* Show name of user that logged in. Also implement logout */
              userInfo ? (
                <div className="dropdown">
                  <Link to="#">
                    {userInfo.name}<span><ArrowDropDownIcon /></span> {" "}
                  </Link>
                  <ul className="dropdown-content">
                    <li>
                      <Link to="/profile">Edit Profile</Link>
                    </li>
                    <li>
                      <Link
                        to={userInfo.isSeller ? "/userstore" : "/createstore"}
                      >
                        {userInfo.isSeller ? "User Store" : "Create Store"}
                      </Link>
                    </li>
                    <li>
                      <Link to="/orderhistory">My Orders</Link>
                    </li>
                     <li>
                      {userInfo.isSeller && (
                        <Link to="/orderedproducts">Customer Orders</Link>
                      )}
                    </li> 
                    <li>
                      {userInfo.isSeller && (
                        <Link to="/soldproducts">Sold Items</Link>
                      )}
                    </li>
                    <li>
                      {userInfo.isSeller && (
                        <Link to="/findwithdrawals">Withdraws</Link>
                      )}
                    </li>
                    
                    <li>
                      <Link to="#logout" onClick={logoutHandler}>
                        {" "}
                        Logout{" "}
                      </Link>
                    </li>
                  </ul>
                </div>
              ) : (
                <Link to="/login">Login</Link>
              )
            }
            </span>

            <span>
            {
              userInfo && userInfo.isAdmin && (
                <div className='dropdown'>
                  <Link to="#admin">Admin {" "}<span><ArrowDropDownIcon /></span></Link>
                  <ul className='dropdown-content'>
                    <li>
                      <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li>
                      <Link to="/userlist">Users</Link>
                    </li>
                    <li>
                      <Link to="/storelist">Stores</Link>
                    </li>
                    <li>
                      <Link to="/productlist">Products</Link>
                    </li>
                    <li>
                      <Link to="/orderlist">Orders</Link>
                    </li>
                    <li>
                      <Link to="/withdrawlist">withdraws</Link>
                    </li>
                    <li>
                      <Link to="/complainlist">Complains</Link>
                    </li>
                    <li>
                      <Link to="/newsletterlist">Newsletters</Link>
                    </li>
                  </ul>
                </div>
              )
            }
            </span>
          </div>
        </header>
        <main>
         
          <Route path="/head" component={ Head }></Route>
          <Route path="/dashboard" component={ Dashboard }></Route>
           <Route path="/privacy" component={ Privacy }></Route>
          <Route path="/resetpassword/:id" component={ Resetpassword }></Route>
          <Route path="/forgotpassword" component={ ForgotPassword }></Route>
          <Route path="/viewuser/:id" component={ ViewUser }></Route>
        <Route path="/services" component={ Services }></Route>
           <Route path="/video" component={ Video }></Route>
          <Route path="/newsletterlist" component={ NewsletterEmailList }></Route>
          <Route path="/ojiko" component={ Ojiko }></Route>
          <Route path="/about" component={ About }></Route>
          <Route path="/termsandconditions" component={ TermConditions }></Route>
          <Route path="/complainlist" component={ ComplainList }></Route>
          <Route path="/withdrawlist" component={ WithdrawList }></Route>
          <Route path="/orderlist" component={ OrderList }></Route>
          <Route path="/productlist" component={ ProductList }></Route>
          <Route path="/storelist" component={ StoreList }></Route>
          <Route path="/userlist" component={ UserList }></Route>
          <Route path="/feedback" component={ Feedback }></Route>
          <Route path="/guide" component={Guide}></Route>
          <Route path="/chats" component={Chats}></Route>
          <Route path="/findwithdrawals" component={WithdrawHistory}></Route>
          <Route path="/soldproducts" component={SoldProducts}></Route>
         <Route path="/orderedproducts" component={CustomerOrders}></Route> 
          <Route path="/delete/:id" component={DeleteProduct}></Route>
          <Route path="/update/:id" component={UpdateProduct}></Route>
          <Route path="/editstore" component={EditStore}></Route>
          <Route path="/userstore" component={UserStore}></Route>
          <Route path="/store/:id" component={StoreDetailsPage}></Route>
          <Route path="/createproduct" component={CreateProductPage}></Route>
          <Route path="/createstore" component={CreateStore}></Route>
          <Route path="/profile" component={ProfilePage}></Route>
          <Route path="/orderhistory" component={OrderHistoryPage}></Route>
          <Route path="/order/:id" component={OrderPage}></Route>
          <Route path="/placeorder" component={PlaceOrderPage}></Route>
          <Route path="/payment" component={PaymentMethodPage}></Route>
          <Route path="/shipping" component={ShippingAddressPage}></Route>
          <Route path="/register" component={RegisterPage}></Route>
          <Route path="/login" component={LoginPage}></Route>
          <Route path="/basket/:id?" component={BasketPage}></Route>
          <Route path="/stores" component={StoresPage}></Route>
          <Route path="/product/:id" component={ProductPage}></Route>
          <Route path="/" component={HomePage} exact></Route>
        </main>
        <footer>
          <div className='mosganda-footer'>
            <div className='mosganda-footer-item'>
              <p>Follow us</p>
            
              <p> <Link to="#" style={{ color: "white", margin: "2px" }}><FacebookIcon sx={{fontSize:30, backgroundColor:"white", color:"blue"}}/></Link>
                  <Link to="#" style={{ color: "white", margin: "2px" }}><InstagramIcon sx={{fontSize:30, backgroundColor:"white", color:"purple"}} /></Link>
                  <Link to="#" style={{ color: "white", margin: "2px" }}><TwitterIcon sx={{fontSize:30, backgroundColor:"white", color:"#1c86ee"}} /></Link>
                  <Link to="#" style={{ color: "white", margin: "2px" }}><YouTubeIcon sx={{fontSize:30, backgroundColor:"white", color:"red"}} /></Link>
              </p>
              <p>
                <WhatsAppIcon sx={{fontSize:30}} />
                <span style={{color:"yellow"}}>08166774455</span>
              </p>
              
            </div>
            <div className='mosganda-footer-item'>
              <p>Company</p>
              <p> <Link to="/about" style={{ color: "yellow" }}>About us</Link></p>
              <p> <Link to="/guide" style={{ color: "yellow" }}>How to use this site</Link></p>
              <p> <Link to="/privacy" style={{color:"yellow"}}>Privacy</Link></p>
              <p> <Link to="/termsandconditions" style={{ color: "yellow" }}>Terms and Conditions</Link></p>
              <p> <Link to="/feedback" style={{color:"yellow"}}>Your feedback</Link></p>
            </div>
            
            <div className='mosganda-footer-item'>
              <p>Mosganda</p>
              <p style={{color:"yellow"}}>081237453684, 080555565666</p>
              <p style={{color:"yellow"}}>contact@mosganda.com</p>
              <p style={{paddingBottom:"0", marginBottom:"0",fontSize:"13px"}}>Subscribe to our newsletter</p>
              <form className='newsletter' onSubmit={submitNewsletter}>
                <div><input type="text" id="newsletter" placeholder='example@gmail.com'
                  onChange={(e) => setNewsEmail(e.target.value)} required
                  value={newsEmail}
                />
                  <label />
                </div>
                <button style={{color:"#023c3f", fontWeight:"bold"}} type="submit">Subscribe</button>
                {
                    loadingnewsEmail && <LoadingBox></LoadingBox>
                }
                {
            createNewsEmailFail && <Stack sx={{ width: '90%' }} spacing={2}>
              <Alert severity="error" onClose={() => setCreateNewsEmailFail(false)}>Error.</Alert>
      
            </Stack>
                }
                {
              createNewsEmailSuccess && <Stack sx={{ width: '90%' }} spacing={2}>
              <Alert severity="success" onClose={() => setCreateNewsEmailSuccess(false)}>Successful.</Alert>
      
            </Stack>
                }
              </form>
            </div>
          </div>
          <div className="row center footer-item">All rights reserved</div>
          </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
