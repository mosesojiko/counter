
import React from 'react'

function Store(props) {
    const { store } = props
    return (
        <div key = { store._id } className="card">
            <a href={`/store/${store._id}`}>
                        <h2>{ store.name }</h2>
                    </a>
                <a href={`/store/${store._id}`}>
                     {/* image size should be 680px by 830px */}
                <img className="medium" src = {store.image} alt ={store.name} />

                </a>
                <div className="card-body">
                <a href={`/store/${store._id}`}>
                        <h3>View store</h3>
                    </a>
                    
                </div>
            </div>

    )
}

export default Store