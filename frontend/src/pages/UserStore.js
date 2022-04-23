import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { editPostedProduct, getUserProducts, unPostedProduct } from "../actions/productActions";
import {
  editPostedStore,
  getUserStore,
  unPostedStore,
} from "../actions/storeActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Button from "@mui/material/Button";
import { useHistory } from 'react-router-dom'
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import FlightOutlinedIcon from '@mui/icons-material/FlightOutlined';
import UndoIcon from '@mui/icons-material/Undo';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import axios from "axios"
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';


import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function UserStore() {
  const [copyStoreLink, setCopyStoreLink] = useState('');
  //get login user details from store
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  console.log(userInfo);

  const history = useHistory()
  if (!userInfo.isSeller) {
      history.push('/')
    
  }
  //get userstore from redux store
  const userStoreDetails = useSelector((state) => state.userStoreDetails);
  const { loading, error, userStore } = userStoreDetails;
 console.log(userStore)

  //get user products from redux store
  const userproducts = useSelector((state) => state.userproducts);
  const {
    loading: loadingProduct,
    error: errorProduct,
    userProducts,
  } = userproducts;
  console.log(userProducts);

  const dispatch = useDispatch();
  useEffect(() => {
        dispatch(getUserStore());
        dispatch(getUserProducts());
  }, [dispatch]);

  //console.log(userStore)
  
  //get editPost from redux store
  const postedStore = useSelector((state) => state.postedStore);
  const {
    loading: loadingPost,
    error: errorPost,
    success: successPost,
  } = postedStore;

  //Post store
  const handlePost = () => {
    dispatch(editPostedStore({ id: userStore._id }));
  };

  //refresh to update success post
  if (successPost) {
    setTimeout(() => {
      window.location='/userstore'
    }, 2000);
  }

  //get unpost store from redux
  const unpostStore = useSelector((state) => state.unpostStore);
  const {
    loading: loadingUnpost,
    error: errorUnpost,
    success: successUnpost,
  } = unpostStore;

  const handleUnpost = () => {
    dispatch(unPostedStore({ id: userStore._id }));
  };

  //reload window to clear the message after 2 seconds
  if (successUnpost) {
    setTimeout(() => {
      window.location = "/userstore";
    }, 2000);
  }

  if (errorPost) {
    setTimeout(() => {
      window.location = "/userstore";
    }, 3000);
  }
  if (errorUnpost) {
    setTimeout(() => {
      window.location = "/userstore";
    }, 3000);
  }

  //get posted product from redux store
  const postedProduct = useSelector((state) => state.postedProduct);
  const {
    loading: loadPostProduct,
    error: errorPostProduct,
    success: successPostProduct,
  } = postedProduct;

  //reload products to clear the message and refresh the button
  if (successPostProduct) {
    setTimeout(() => {
      window.location ="/userstore"
    }, 2000);
  }
  //get unpost product from redux store
  const unpostProduct = useSelector((state) => state.unpostProduct);
  const {
    loading: loadingUnpostProduct,
    error: errorUnpostProduct,
    success: sucessUnpostProduct,
  } = unpostProduct;

  //reload products to clear the message and refresh the button
  if (sucessUnpostProduct) {
    setTimeout(() => {
      window.location ="/userstore"
    }, 2000);
  }

  

  //copy store link
  const copyLink = async url => {
    try {
      await navigator.clipboard.writeText(url);
      setCopyStoreLink('Copied!');
    } catch (err) {
      setCopyStoreLink('Failed to copy!');
    }
  };

  //edit product when store is lock
  const handleLockProducts = () => {
    return userProducts.map((x) => {
      return dispatch(unPostedProduct({ id: x._id }))
    })
  }

  

//modal to close store
  const [open, setOpen] = React.useState(false);
  const [toBeOpened, setToBeOpened] = useState('')
  const [loadCloseStore, setLoadCloseStore] = useState(false)
  const [errorCloseStore, setErrorCloseStore] = useState(false)
  const [successCloseStore, setSuccessCloseStore] = useState(false)
  
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  
  const handleCloseStore = async (e) => {
    e.preventDefault()
    try {
      setLoadCloseStore(true)
      const { data } = await axios.put(`/api/v1/store/closestore`, {toBeOpened}, {
        headers: {
                    Authorization: `Bearer ${userInfo.token}`
                }
      })
      setLoadCloseStore(false)
      setSuccessCloseStore(true)

      //call handleLock products function
      handleLockProducts()

    } catch (error) {
      setErrorCloseStore(true)
      setLoadCloseStore(false)
    }
  }

  //open store for business activities
  const [loadOpenStore, setLoadOpenStore] = useState(false)
  const [errorOpenStore, setErrorOpenStore] = useState(false)
  const [successOpenStore, setSuccessOpenStore] = useState(false)

  const handleOpenStore = async () => {
   
    try {
      setLoadOpenStore(true);
       await axios.put(`/api/v1/store/openstore`,{id:userStore._id}, {
        headers: {
                    Authorization: `Bearer ${userInfo.token}`
                }
      })
      setLoadOpenStore(false)
      setSuccessOpenStore(true)
      
    } catch (error) {

      setErrorOpenStore(true)
      setLoadOpenStore(false)
    }
  }

  if (successOpenStore) {
    setTimeout(() => {
      window.location ="/userstore"
    }, 2000);
  }



  return (
        
          <div>
            

      {
        userStore && userStore.isClosed === true ?
        (<div className='close-store'>
          <h1>Business Activities Closed.</h1>
          <p>To be opened: </p>
            <h3>{ userStore && userStore.toBeOpened }</h3>
            <button onClick={handleOpenStore}>Open</button>
            {
              loadOpenStore && <LoadingBox></LoadingBox>
            }
            
            {
              successOpenStore && <Stack sx={{ width: '90%' }} spacing={2}>
              <Alert severity="success" onClose={() => setSuccessOpenStore(false)}>Store opened successfully.</Alert>
      
            </Stack>
            }
            {
              errorOpenStore && <Stack sx={{ width: '90%' }} spacing={2}>
              <Alert severity="error" onClose={() => setErrorOpenStore(false)}>Failed to open store.</Alert>
      
            </Stack>
            }
          </div>) :
          (
            <div>
            <div className="row around userstore-header-container">
        <div className="userstore-header">
          <h4 className="userstore-header-item userstore-header-spacing">
            <Link to="/stores">
              <Button variant="contained" color="success" size="small" onClick={handleOpenStore}>
                Stores
              </Button>
            </Link>
          </h4>
          <h4 className="userstore-header-spacing">
            <Link to="/guide">
              <Button variant="contained" color="success" size="small">
                Guide
              </Button>
            </Link>
          </h4>
          <h4 className="userstore-header-item userstore-header-spacing">
            <Link to="/">
              <Button variant="contained" color="success" size="small">
                Products
              </Button>
            </Link>
          </h4>
          <h4 className="userstore-header-item userstore-header-spacing">
            <Link to="/orderhistory">
              <Button variant="contained" color="success" size="small">
                my Orders
              </Button>
            </Link>
          </h4>
          <h4 className="userstore-header-item userstore-header-spacing">
            <Link to="/orderedproducts">
              <Button variant="contained" color="success" size="small">
                CustomerOrders
              </Button>
            </Link>
          </h4>
           <h4 className="userstore-header-spacing">
            <Link to="/soldproducts">
              <Button variant="contained" color="success" size="small">
                Sold Items
              </Button>
            </Link>
          </h4>
          <h4 className="userstore-header-spacing">
            <Link to="/findwidthdrawals">
              <Button variant="contained" color="success" size="small">
                Withdraws
              </Button>
            </Link>
          </h4>
        </div>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">Failed. Please, kindly logout and login again to access your store.</MessageBox>}
        <div className="userstore-header-spacing">
          <Button variant="contained" color="error" size="small" onClick={handleOpen}>
                lock store
              </Button>
        </div>
        <div>
          <h4>
             {/* <Link to="/createproduct">
              <Button variant="contained" color="success" size="large">
                Add Items For Sale
              </Button>
            </Link>  */}
            <Button variant="contained" onClick={() => copyLink(`localhost:3000/store/${userStore._id}`)}>
              Click to copy your store url
              <ContentCopyIcon />
     </Button>
  
  {copyStoreLink}
          </h4>
        </div>
      </div>
      <div className="row top bottom">
        <div className="col-1">
          <div className="profile-card">
            <div>
              
                <h3 className="profile-header">
                  <span className="name-description">Seller Name:</span>{" "}
                  {userInfo.name}
                        </h3>  
                                    
             
              <div>
                        <div className="row around">
                          <div>
                             <img
                  className="profile-img"
                  src= {userInfo.image}
                  alt="profile"
                /> 
                          </div>
                  <div className="contact">
                    <p>
                      <span>
                        <PhoneIcon />
                      </span>{" "}
                      {userStore && userStore.creatorPhone}
                    </p>
                    <p>
                      <span>
                        <EmailIcon />
                      </span>
                      {userStore && userStore.creatorEmail}
                    </p>
                  </div>
                </div>
                
              </div>
            </div>
            <div>
              <Link to="/profile">
                 <button className="profile-button">Edit profile</button> 
               
              </Link>
            </div>
          </div>
        </div>
        <div className="col-2">
          <div className="row around">
            <div className="store-image">
              <h3 className="store-name">
                <span className="name-description"> Store Name:</span>{" "}
                <strong>{userStore && userStore.name}</strong>{" "}
              </h3>
              <img
                className="img large"
                src={userStore && userStore.image}
                alt="store"
              />
            </div>
            <div className="description">
              <h3>Store Details</h3>
              <p>
                Business Address:{" "}
                <strong>{userStore && userStore.address}</strong>
              </p>
              <p>
                City/Town: <strong>{userStore && userStore.city}</strong>
              </p>
              <p>
                State: <strong>{userStore && userStore.state}</strong>
              </p>
              <p>
                Country: <strong>{userStore && userStore.country}</strong>
              </p>
              <p>
                Description:{" "}
                <strong>{userStore && userStore.description}</strong>
              </p>
              <p>
                Delivery: <strong>{userStore && userStore.deliveryCapacity}</strong>
              </p>
              <div className="store-utils">
                <p>
                  <Link to="/editstore">
                    <Button variant="contained" color="secondary" size="small">
                      <ModeEditOutlineOutlinedIcon />
                      Edit
                    </Button>
                  </Link>
                </p>

                <p>
                  {userStore && userStore.isPosted ? (
                    <Button
                      variant="contained"
                      color="success"
                      size="small"
                      onClick={handleUnpost}
                    >
                    
                      Unpost
                      <UndoIcon />
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="success"
                      size="small"
                      onClick={handlePost}
                      >
                        <FlightOutlinedIcon />
                      Post
                    </Button>
                  )}
                </p>
              </div>
              <div>
                {loadingPost && <LoadingBox></LoadingBox>}
                {errorPost && (
                  <MessageBox variant="danger">Failed to post store. Check your network and try again.</MessageBox>
                )}
                
                {successPost && (
                  <MessageBox variant="success">
                    Store posted to stores page successfully.
                  </MessageBox>
                )}

                {loadingUnpost && <LoadingBox></LoadingBox>}
                {errorUnpost && (
                  <MessageBox variant="danger">Failed to remove store from stores page. Check your network and try again.</MessageBox>
                )}
                {successUnpost && (
                  <MessageBox variant="success">
                    Store removed from stores page successfully.
                  </MessageBox>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div></div>
      <div>
        <div className="add-item row around">
          <div>
          <Link to="/createproduct">
            {/* <button className="primary">Add items for sale</button> */}
            <Button variant="contained" color="success" size="large">
              Add Items For Sale
              <AddCircleOutlineIcon />
              </Button>
          </Link>
          </div>
                  <div>
                    
           <Link to="/services">
            <Button sx={{marginTop: "3px"}} variant="contained" color="primary" size="large">
              Service Charges
              </Button>
          </Link> 
          </div>
        </div>

        {loadPostProduct && <LoadingBox></LoadingBox>}
        {errorPostProduct && (
          <MessageBox variant="danger">{errorPostProduct}</MessageBox>
        )}
        {successPostProduct && (
          <MessageBox variant="success">
            Product posted to product page successfully.
          </MessageBox>
        )}
        {loadingUnpostProduct && <LoadingBox></LoadingBox>}
        {errorUnpostProduct && (
          <MessageBox variant="danger">{errorUnpost}</MessageBox>
        )}
        {sucessUnpostProduct && (
          <MessageBox variant="success">
            Product removed from product page successfully.
          </MessageBox>
        )}
        
      </div>

      <div style={{backgroundColor:"white"}} className="row center">
        {loadingProduct && <LoadingBox></LoadingBox>}
        {errorProduct && (
          <MessageBox variant="danger">Failed to load items. Check your network and try again.</MessageBox>
        )}
        {userProducts &&
          userProducts.map((product) => (
            <div key={product._id} className="card">
              <Link to={`/product/${product._id}`}>
                <img
                  className="medium"
                  src={product.image}
                  alt={product.name}
                />
              </Link>
              <div className="card-body">
                <Link to={`/product/${product._id}`}>
                  <h2>{product.name}</h2>
                  {product.isPaid && <h3 className="sold">Item Sold</h3>}
                </Link>
                <div className="price">#{product.price}</div>

                <div className="store-utils">
                  <p>
                    {product.isPosted ? (
                      <Button
                        variant="contained"
                        color="success"
                        size="small"
                        onClick={() =>
                          dispatch(unPostedProduct({ id: product._id }))
                        }
                      >
                        
                        Unpost
                        <UndoIcon />
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        color="success"
                        size="small"
                        onClick={() =>
                          dispatch(editPostedProduct({ id: product._id }))
                        }
                        >
                          <FlightOutlinedIcon />
                        Post
                      </Button>
                    )}
                  </p>
                  {
                    !product.isPaid &&
                    <p>
                    <Link to={`/update/${product._id}`}>
                          <Button variant="contained" color="secondary" size="small">
                            <ModeEditOutlineOutlinedIcon />
                        Edit
                      </Button>
                    </Link>
                  </p>
                  }
                  {
                    !product.isPaid &&
                    <p>
                    <Link to={`/delete/${product._id}`}>
                          <Button variant="contained" color="error" size="small">
                           <DeleteOutlineIcon />
                        Delete
                      </Button>
                    </Link>
                  </p>
                  }
                  
                </div>
              </div>
            </div>
          ))}
      </div>


      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleCloseStore}>
            <h4>Opening Date</h4>
            {
              loadCloseStore && <LoadingBox></LoadingBox>
                  }
                 
            
            {
              errorCloseStore && <Stack sx={{ width: '90%' }} spacing={2}>
              <Alert severity="error" onClose={() => setErrorCloseStore(false)}>Failed to lock store.</Alert>
      
            </Stack>
                  }
                  
            
            {
              successCloseStore && <Stack sx={{ width: '90%' }} spacing={2}>
              <Alert severity="success" onClose={() => setSuccessCloseStore(false)}>Store locked successfully.</Alert>
      
            </Stack>
                  }
                  
            
            <label htmlFor="tobeopened">Date</label>
            <input type="text" id="tobeopened" placeholder="Monday 24th July, 2022."
              onChange={(e) => setToBeOpened(e.target.value)} required
            />
            <button style={{color:"green", margin:"3px"}} type="submit">Lock store</button>
          </form>
          <Button sx={{margin:"5px"}} variant="contained" color="error" size="small" onClick={handleClose}>
                           
                        Close
                      </Button>
        </Box>
      </Modal>


</div>
          )
      }


        </div>
     
  );
}

export default UserStore;
