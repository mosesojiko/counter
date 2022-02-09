
import React from 'react'
import { Link } from 'react-router-dom'
import Button from "@mui/material/Button";
import PreviewIcon from '@mui/icons-material/Preview';

function Store(props) {
    const { store } = props
    return (
        <div key = { store._id } className="card product">
            <Link to={`/store/${store._id}`}>
                        <h2 style={{ textAlign: "center" }}>{ store.name }</h2>
                    </Link>
                <Link to ={`/store/${store._id}`}>
                     {/* image size should be 680px by 830px */}
                <img className="medium" src = {store.image} alt ={store.name} />

                </Link>
            <div className="card-body">
                <div>
                    <p>{ `${store.description.substring(0,30)}...`}</p>
                </div>
                <div className='card-body-span'>
                    <span>
                        <Link to ={`/store/${store._id}`}>
                            <Button variant="contained" color="success" size="small">
                                <PreviewIcon />
                        View store
                        </Button>
                    </Link>
                    </span>
                    <span>{store.city}</span>
                    
                </div>
             
            </div>
        </div>

    )
}

export default Store