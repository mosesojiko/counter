import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBizNameStore } from '../actions/storeActions';

function StoreDetailsPageCopy(props) {
    const dispatch = useDispatch();
    const businessName = props.match.params.name;

    //get store by business name
  const bizname = useSelector((state) => state.bizname);
  const { loading, error, store } = bizname
    console.log(store)

     useEffect(() => {
    dispatch(getBizNameStore(businessName))
  },[businessName])
    
    
    //business name to find store
    // useEffect(() => {
    //     const fetchstore = async () => {
    //         try {
    //             setLoading(true)
    //           const { data } = await axios.get(`/api/v1/store/${businessName}`)
    //           setLoading(false)
    //             setStores(data)
                
    //         } catch (error) {
    //           setError(true)
    //           setLoading(false)
                
    //         }
    //     }
    //     fetchstore()
    // }, [businessName])


  return (
    <div>StoreDetailsPageCopy</div>
  )
}

export default StoreDetailsPageCopy