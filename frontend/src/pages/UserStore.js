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
import Rating from "../components/Rating";

function UserStore() {
  //get login user details from store
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  console.log(userInfo);

  //get userstore from redux store
  const userStoreDetails = useSelector((state) => state.userStoreDetails);
  const { userStore } = userStoreDetails;

  //get user products from redux store
  const userproducts = useSelector((state) => state.userproducts);
  const { userProducts } = userproducts;
  console.log(userProducts);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserStore());
    dispatch(getUserProducts());
  }, [dispatch, userInfo]);

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

  //get posted product from redux store
  const postedProduct = useSelector((state) => state.postedProduct);
  const {
    loading: loadPostProduct,
    error: errorPostProduct,
    success: successPostProduct,
  } = postedProduct;


  //get unpost product from redux store
  const unpostProduct = useSelector((state) => state.unpostProduct);
  const {
    loading: loadingUnpostProduct,
    error: errorUnpostProduct,
    success: sucessUnpostProduct,
  } = unpostProduct;


  return (
    <div>
      <div className="row top bottom">
        <div className="col-1">
          <div className="profile-card">
            <div className="row around">
              <div>
                <h3>Store owner</h3>
                <img
                  className="img medium"
                  src={userStore && userStore.creatorImage}
                  alt="profile"
                />
              </div>
              <div>
                <div>
                  <h2>Name: {userStore && userStore.creatorName} </h2>
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
                <div className="profile-links">
                  <Link to="#">
                    <i class="fa fa-instagram"></i>
                  </Link>
                  <Link to="#">
                    <i class="fa fa-twitter"></i>
                  </Link>
                  <Link to="#">
                    <i class="fa fa-linkedin"></i>
                  </Link>
                  <Link to="#">
                    <i class="fa fa-facebook"></i>
                  </Link>
                </div>
              </div>
            </div>
            <div>
              {
                <Link to="/profile">
                  <button className="profile-button">Edit profile</button>
                </Link>
              }
            </div>
          </div>
        </div>
        <div className="col-2">
          <div className="row around">
            <div className="store-image">
              <h1 className="store-name">
                Store Name: <strong>{userStore && userStore.name}</strong>{" "}
              </h1>
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
              <div>
                {
                  <Link to="/editstore">
                    <button className="profile-button">Edit store</button>
                  </Link>
                }
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
                <button className="primary" type="submit" onClick={handlePost}>
                  Post store
                </button>
                {loadingUnpost && <LoadingBox></LoadingBox>}
                {errorUnpost && (
                  <MessageBox variant="danger">{errorUnpost}</MessageBox>
                )}
                {sucessUnpost && (
                  <MessageBox variant="success">
                    Store removed from stores page successfully.
                  </MessageBox>
                )}
                <button
                  className="primary"
                  type="submit"
                  onClick={handleUnpost}
                >
                  Unpost store
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="store-name">
          Checkout list of my items below for your shopping pleasure.
        </h2>
      </div>
      <div>
        {
          <Link to="/createproduct">
            <button className="profile-button">Add items to your store</button>
          </Link>
        }
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
        {userProducts &&
          userProducts.map((product) => (
            <div key={product._id} className="card">
              <Link to={`/product/${product._id}`}>
                {/* image size should be 680px by 830px */}
                <img
                  className="medium"
                  src={product.image}
                  alt={product.name}
                />
              </Link>
              <div className="card-body">
                <Link to={`/product/${product._id}`}>
                  <h2>{product.name}</h2>
                </Link>
                <Rating
                  rating={product.rating}
                  numReviews={product.numReviews}
                />
                <div className="price">#{product.price}</div>

                <div>
                
                  <button className="primary" type="submit"
                  onClick={() =>dispatch(editPostedProduct({ id: product._id }))}>
                    Post
                  </button>
                  <button className="primary" type="submit"
                  onClick ={() =>  dispatch(unPostedProduct({ id: product._id }))}>
                    unPost
                  </button>
                  <Link to={`/update/${product._id}`}>
                    <button className="primary">Edit</button>
                  </Link>
                  <Link to={`/delete/${product._id}`}>
                    <button className="primary">Delete</button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default UserStore;
