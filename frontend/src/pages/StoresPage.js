import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getStores } from '../actions/storeActions';
import Store from '../components/Store';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';


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
      <Link to ="/createstore">Create Store</Link>
      <Link to = "/createproduct">Create Product</Link>
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
