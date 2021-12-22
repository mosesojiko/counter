import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getStores } from '../actions/storeActions';
import Store from '../components/Store';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Button from "@mui/material/Button";


function StoresPage() {
  const dispatch = useDispatch();

  //getAllStores from redux store
  const getAllStores = useSelector((state) => state.getAllStores);
  const { stores, loading, error } = getAllStores;

  useEffect(() => {
    dispatch(getStores());
  },[dispatch])
  return (
    <div>
      <div className="row around">
          <div className="home-header">
            <h4>
              <Link to="/">
                <Button variant="contained" color="success">
                  Products
                </Button>
              </Link>
            </h4>

            <h4>
              <Link to="/guide">
                <Button variant="contained" color="success">
                  Guide
                </Button>
              </Link>
            </h4>
          </div>
          <div>
            <h4>
              <Link to="/createstore">
                <Button variant="contained" color="success">
                  Create-store
                </Button>
              </Link>
            </h4>
          </div>
        </div>

     
      {
          loading? 
          <LoadingBox></LoadingBox>
          :
          error? <MessageBox variant="danger">{error}</MessageBox>
          :
          <div className="row center">
          {
            stores.map(store =>(
                <Store key={store._id} store={store}></Store>
            ))
          }
      </div>
        }
    </div>
  )
}

export default StoresPage
