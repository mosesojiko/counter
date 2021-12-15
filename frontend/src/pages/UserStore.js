import React, { useEffect } from "react";
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


function UserStore() {
  //get login user details from store
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  console.log(userInfo);

  //get userstore from redux store
  const userStoreDetails = useSelector((state) => state.userStoreDetails);
  const { loading, error, userStore } = userStoreDetails;

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

  //get editPost from redux store
  const postedStore = useSelector((state) => state.postedStore);
  const {
    loading: loadingPost,
    error: errorPost,
    success: successPost,
  } = postedStore;
  const handlePost = () => {
    dispatch(editPostedStore({ id: userStore._id }));
  };

  //refresh to update success post
  if (successPost) {
    setTimeout(() => {
      window.location = "/userStore";
    }, 2000);
  }

  //get unpost store from redux
  const unpostStore = useSelector((state) => state.unpostStore);
  const {
    loading: loadingUnpost,
    error: errorUnpost,
    success: sucessUnpost,
  } = unpostStore;

  const handleUnpost = () => {
    dispatch(unPostedStore({ id: userStore._id }));
  };

  //reload window to clear the message after 2 seconds
  if (sucessUnpost) {
    setTimeout(() => {
      window.location = "/userStore";
    }, 2000);
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

  return (
    <div>
      <div className="row around">
        <div className="home-header">
          <h4>
            <Link to="/stores">Stores</Link>
          </h4>
          <h4>
            <Link to="/guide">Guide</Link>
          </h4>
          <h4>
            <Link to="/">Products</Link>
          </h4>
        </div>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        <div>
          <h4>
            <Link to="/createproduct">
              <button className="primary">Add items for sale</button>
            </Link>
          </h4>
        </div>
      </div>
      <div className="row top bottom">
        <div className="col-1">
          <div className="profile-card">
            <div className="row around">
              <div>
                <h3>
                  <span className="name-description">Seller Name:</span>{" "}
                  {userInfo.name}
                </h3>
                <img
                  className="img medium"
                  src={userStore && userStore.creatorImage}
                  alt="profile"
                />
              </div>
              <div>
                <div>
                  <div className="contact">
                    <p>
                      <span>
                        <i class="fa fa-phone-square" aria-hidden="true"></i>
                      </span>{" "}
                      {userStore && userStore.creatorPhone}
                    </p>
                    <p>
                      <span>
                        <i class="fa fa-envelope" aria-hidden="true"></i>
                      </span>
                      {userStore && userStore.creatorEmail}
                    </p>
                  </div>
                </div>
                {/* <div className="profile-links">
                 
                  <Link to="#">
                    <i class="fa fa-twitter"></i>
                  </Link>
                  <Link to="#">
                    <i class="fa fa-linkedin"></i>
                  </Link>
                  <Link to="#">
                    <i class="fa fa-facebook"></i>
                  </Link>
                </div> */}
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
              <h2>Store Details</h2>
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
              <div className="store-utils">
                <p>
                  <Link to="/editstore">
                    <button className="primary">Edit </button>
                  </Link>
                </p>

                <p>
                  {userStore && userStore.isPosted ? (
                    <button
                      className="primary"
                      type="submit"
                      onClick={handleUnpost}
                    >
                      Unpost 
                    </button>
                  ) : (
                    <button
                      className="primary"
                      type="submit"
                      onClick={handlePost}
                    >
                      Post 
                    </button>
                  )}
                </p>
              </div>
              <div>
                {loadingPost && <LoadingBox></LoadingBox>}
                {errorPost && (
                  <MessageBox variant="danger">{errorPost}</MessageBox>
                )}
                {successPost && (
                  <MessageBox variant="success">
                    Store posted to stores page successfully.
                  </MessageBox>
                )}

                {loadingUnpost && <LoadingBox></LoadingBox>}
                {errorUnpost && (
                  <MessageBox variant="danger">{errorUnpost}</MessageBox>
                )}
                {sucessUnpost && (
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
        <div className="add-item">
          <Link to="/createproduct">
            <button className="primary">Add items for sale</button>
          </Link>
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

      <div className="row center">
        {loadingProduct && <LoadingBox></LoadingBox>}
        {errorProduct && (
          <MessageBox variant="danger">{errorProduct}</MessageBox>
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
                  {product.isSold && <h3 className="sold">Item Sold</h3>}
                </Link>
                <div className="price">#{product.price}</div>

                <div className="store-utils">
                  <p>
                    {product.isPosted ? (
                      <button
                        className="primary"
                        type="submit"
                        onClick={() =>
                          dispatch(unPostedProduct({ id: product._id }))
                        }
                      >
                        unPost
                      </button>
                    ) : (
                      <button
                        className="primary"
                        type="submit"
                        onClick={() =>
                          dispatch(editPostedProduct({ id: product._id }))
                        }
                      >
                        Post
                      </button>
                    )}
                  </p>
                  <p>
                    <Link to={`/update/${product._id}`}>
                      <button className="primary">Edit</button>
                    </Link>
                  </p>
                  <p>
                    <Link to={`/delete/${product._id}`}>
                      <button className="primary">Delete</button>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default UserStore;
