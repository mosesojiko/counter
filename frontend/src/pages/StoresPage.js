import React from 'react'
import Store from '../components/Store'
import data from '../data'

function StoresPage(props) {
    return (
        <div className="row center">
          {
            data.stores.map(store =>(
              <Store key = {store._id} store = {store}></Store>
            ))
          }
      </div>
    )
}

export default StoresPage
