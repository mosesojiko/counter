
import React from 'react'
import { Link } from 'react-router-dom'

function Store(props) {
    const { store } = props
    return (
        <div key = { store._id } className="card">
            <Link to={`/store/${store._id}`}>
                        <h2>{ store.name }</h2>
                    </Link>
                <Link to ={`/store/${store._id}`}>
                     {/* image size should be 680px by 830px */}
                <img className="medium" src = {store.image} alt ={store.name} />

                </Link>
                <div className="card-body">
                <Link to ={`/store/${store._id}`}>
                        <h3>View store</h3>
                    </Link>
                    
                </div>
            </div>

    )
}

export default Store