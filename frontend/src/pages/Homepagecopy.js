import React, {  useEffect, useState } from 'react'

import Product from '../components/Product';
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../actions/productActions';
import { Link } from 'react-router-dom';
import Button from "@mui/material/Button";
import axios from 'axios';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import SearchIcon from '@mui/icons-material/Search';
import StorefrontIcon from '@mui/icons-material/Storefront';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
//import QuizIcon from '@mui/icons-material/Quiz';
//import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';



function HomePage() {
  const [search, setSearch] = useState('')
  const [searchLoading, setSearchLoading] = useState(false)
  const [searchResult, setSearchResult] = useState([])
  const [searchError, setSearchError] = useState(false)
  const [notFound, setNotFound] = useState(false);
  const [emptySearch, setEmptySearch] = useState(false)

  const [category, setCategory] = useState('')
  const [categoryResult, setCategoryResult] = useState([])
  const [emptyCategory, setEmptyCategory] = useState('')
  const [loadingCategory, setLoadingCategory] = useState('')
  const [errorCategory, setErrorCategory] = useState('')
  const [notFoundCategory, setNotFoundCategory] = useState('')

 const dispatch = useDispatch();
  const getProducts = useSelector(state => state.getProducts)
  const { loading, error, products } = getProducts;
  console.log(products)
   useEffect(()=>{
     dispatch(getAllProducts())
   }, [dispatch])
 
  //handleSearch function
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search) {
      setEmptySearch(true);
      return
    }
    try {
      setSearchLoading(true)
      const { data } = await axios.get(`/api/v1/product/search?search=${search}`)
      setSearchLoading(false)
      setSearchResult(data)
      if (data.length === 0) {
        setNotFound(true)
      }
      setSearch("")
    } catch (error) {
      setSearchError(true)
      setSearchLoading(false)
    }
    
  }

  //search products by category
  const handleCategory = async (e) => {
    e.preventDefault()

    if (!category || category === '') {
      setEmptyCategory(true)
      return
    }

    try {
      setLoadingCategory(true)
      const { data } = await axios.get(`/api/v1/product/search?search=${category}`)
      setLoadingCategory(false)
      setCategoryResult(data)
      if (data.length === 0) {
        setNotFoundCategory(true)
      }
      setCategory('')
    } catch (error) {
      setErrorCategory(true)
      setLoadingCategory(false)
    }
  }


    return (
      <div>
        <div className="row around">
          <div className="home-header" style={{margin: "6px 2px"}}>
            <h4>
              <Link to="/stores">
                <Button variant="contained" color="success" size="small">
                  <StorefrontIcon sx={{m:1, fontSize: "20px"}} />
                  Stores
                </Button>
              </Link>
            </h4>
            
              <h4>
              <Link to="/createstore">
                <Button variant="contained" color="success" size="small">
                  
                  Create-store
                  <CreateNewFolderIcon sx={{m:1, fontSize: "20px"}} />
                </Button>
              </Link>
            </h4>
            
          </div>
          <div style={{margin:"5px"}}>
            <form onSubmit={handleCategory} style={{display:"flex"}}>
              <label htmlFor="category"></label>
              <select id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value=""> Category</option>
              <option value="men">Men's fashion</option>
              <option value="women">Women's fashion</option>
               <option value="phone">Phone and Accessories</option>
                <option value="computing">Computing</option>
                <option value="health">Health and Beauty</option>
                <option value="baby">Baby Products</option>
                <option value="furniture">Furniture</option>
                <option value="automobile">Automobile</option>
                <option value="gaming">Gaming</option>
                <option value="food">Food</option>
                <option value="drinks">Drinks</option>
                <option value="household">Household equipment</option>
                <option value="groceries">Groceries</option>
                <option value="pharmacy">Pharmacy (drugs)</option>
                <option value="others">Others</option>
               </select>
               <button type="submit" style={{backgroundColor:"#8b2500", color:"white"}}><SearchIcon sx={{fontSize:"18px"}} /></button>
               </form>
            {
              notFoundCategory && <Stack sx={{ width: '90%' }} spacing={2}>
              <Alert severity="success" onClose={() => setNotFoundCategory(false)}>Items Not Found.</Alert>
      
            </Stack>
              }
              {
              emptyCategory && <Stack sx={{ width: '90%' }} spacing={2}>
              <Alert severity="warning" onClose={() => setEmptyCategory(false)}>Please, select a category.</Alert>
      
            </Stack>
                }
          </div>
          
          
            <div>
              <form style={{backgroundColor:"black"}} onSubmit={handleSearch}>
                <input type="text" id="search" placeholder='Search by name'
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              <button style={{backgroundColor:"#000080", color:"white"}} type="submit">
                  <SearchIcon sx={{fontSize:"18px"}} />
                </button>
              </form>
              {
              notFound && <Stack sx={{ width: '90%' }} spacing={2}>
              <Alert severity="success" onClose={() => setNotFound(false)}>Item Not Found</Alert>
      
            </Stack>
              }
              {
              emptySearch && <Stack sx={{ width: '90%' }} spacing={2}>
              <Alert severity="warning" onClose={() => setEmptySearch(false)}>Search cannot be empty.</Alert>
      
            </Stack>
                }
            </div>
        </div>

        <div style={{ marginBottom: "10px", borderBottom:`${searchResult.length>0?"2px solid #023c3f":""}`}} className="row center">
          {searchLoading && <LoadingBox></LoadingBox>}
          {searchError && <MessageBox variant="danger">Failed to load search</MessageBox>}
            {searchResult?.map((product) => (
             !product.isBanned && <Product key={product._id} product={product} showStoreButton={true}></Product>
            ))}
        </div>
        

        <div style={{ marginBottom: "10px", borderBottom:`${categoryResult.length>0?"2px solid #023c3f":""}`}} className="row center">
          {loadingCategory && <LoadingBox></LoadingBox>}
          {errorCategory && <MessageBox variant="danger">Failed to load category</MessageBox>}
            {categoryResult?.map((product) => (
             !product.isBanned && <Product key={product._id} product={product} showStoreButton={true}></Product>
            ))}
        </div>
        
        <div className="row center">
          {loading && <LoadingBox></LoadingBox>}
          {error && <MessageBox variant="danger">Failed to load products</MessageBox>}
            {products?.map((product) => (
              !product.isBanned && <Product key={product._id} product={product} showStoreButton={true}></Product>
            ))}
          </div>
        
      </div>
    );
}

export default HomePage
