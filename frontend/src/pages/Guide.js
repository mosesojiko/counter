import React from 'react'
import { Link } from 'react-router-dom';
import Button from "@mui/material/Button";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './Guide.css'

function Guide() {
    return (
        <div style={{backgroundColor:"#f5f5f5", maxWidth:"100%"}}>
        <h1 style={{ textAlign: "center" }}>How to use this website</h1>
        
        <div>
          <Link to="/">
              <Button sx={{margin:"10px"}} variant="contained" color="success" size="small">
                Back to homepage
              </Button>
            </Link>
          <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
            >
          <Typography><h2 className='guide-h2'>What is Mosganda about?</h2></Typography>
        </AccordionSummary>
        <AccordionDetails>
              
                <h4>Mosganda</h4>
                <p>Mosganda is an online marketplace for buying and selling goods and services. Mosganda is a platform that allows you to bring your business online and make unlimited sales. Mosganda is also a great place to start a new business.</p>
                <h4>Why Mosganda?</h4>
                <p>Every business today wants to have its presence online to increase its sales, and generate more income. This means that business owners will need a website for their business. But many small and medium businesses cannot afford the cost of building and maintaining a website. Mosganda solves this problem by creating a platform that allows a seller to create an online store, where he can interact with his/her customers and make sales.</p>
                <h4>What can I do on Mosganda?</h4>
                <ul className='guide-ul'>
                <li>Create your online store fully controlled by you.</li>
                <li>Sell your goods and services.</li>
                <li>Buy goods from the comfort of your home.</li>
                  <li>A great place to start your new business online.</li>
                  <li>Connect with customers and establish effective communication through our chat feature. One can chat privately with customers or create business groups with Mosganda chat. </li>
                  <li>Find stores around you with ease, and save the stress of working along the streets looking for what to buy.</li>
                  
              </ul>
              <h4>Do I need a designer to create my store?</h4>
              <p>No, you do not need a designer or programmer to create your store on Mosganda. The online store has been created already. What you will do, is to fill in the information about your store. </p>
          
        </AccordionDetails>
          </Accordion>
          <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography><h2 className='guide-h2'>How does Mosganda work?</h2></Typography>
        </AccordionSummary>
        <AccordionDetails>
          
                <p>At Mosganda, the seller places his goods for sale. When the buyer pays for an item, Mosganda holds the payment. The seller gets his money when he has delivered the good(s) to the buyer. Mosganda monitors the whole process from buying to delivery of goods. Mosganda will take up the delivery of goods by itself when it lunches the city-master. The city-master will be responsible for picking the item(s) from the seller and delivering same to the buyer.</p>
         
        </AccordionDetails>
      </Accordion>
          <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography><h2 className='guide-h2'>How to register, Login, and Logout</h2></Typography>
        </AccordionSummary>
        <AccordionDetails>
          
                <h4>Register</h4>
                <ul className='guide-ul'>
                  <li>Visit mosganda.com, click on <q>Register</q> at the top-right of the page.</li>
                  <li>Enter your name, email, and password.</li>
                  <li>Click on the <q>Register</q> button. You will be redirected to the home page.</li>
                </ul>
                <h4>Login</h4>
                <ul className='guide-ul'>
                  <li>At the top of the page, click on <q>Login</q>. Enter your email and password.</li>
                  <li>Click on <q>Login</q></li>
                </ul>
              <p>Congratulations! you have successfully registered and logged in to Mosganda.</p>
              
              <h4>Logout</h4>
              <p>If you are logged in, but want to logout.</p>
              <ul className='guide-ul'>
                <li>Move the mouse to your name at the top of the page.</li>
                <li>In the dropdown, click on <q>Logout</q></li>
              </ul>
          
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography><h2 className='guide-h2'>How do I buy a product/item?</h2></Typography>
        </AccordionSummary>
        <AccordionDetails>
          
                            <p>When you visit mosganda, you see a lot of items. Take the steps below to purchase a product/item.</p>
                            <ul className='guide-ul'>
                  <li>Click on the image or name of the product or click on the <q>Details</q> button. This will take you to the product detail page where you get more information about the product, the store from which the item is listed, and also the name of the seller. Here, you can also select the quantity if you are buying in bulk.</li>
                  <li>Click on the <q>Add to Shopping Basket</q> button. This will take you to the shopping basket page.</li>
                  <li>Click on <q>Proceed to Checkout</q> button. Here, if you are not logged in, you will be required to log in before going to the next page. If you have not registered, then you need to both register and log in. If you are already logged in, continue.</li>
                  <li>Fill the <q>Shipping Address</q> form so that the seller can send you your items. Click on <q>Continue</q>.</li>
                  <li>Select your preferred payment method, and click on <q>Continue</q>. This will take you to the summary of your order.</li>
                  <li>Click on <q>Place Order</q>. This will take you to the Payment Page. Fill the Receipt Form so you can get a receipt of payment.</li>
                  <li>Click on <q>Pay Now (PayStack)</q> button. In the pop-up, select either to pay with card or bank or USSD and enter your private/payment information.</li>
                  <li>Click on <q>Pay</q>. If payment is successful. That is all. Check your email for payment receipt.</li>
                </ul>
                <p>Mosganda will notify the seller, and he is going to send you your items.</p>
              <p>To always view your order, at the top of the screen, move your mouse to your name. In the dropdown menu, click on <q>My Orders</q>.</p>
              <h4>What to do when your goods are sent to you.</h4>
              <p>Login to Mosganda, move the mouse to your name at the top of the screen. In the dropdown, click on <q>My Orders</q>.</p>
              <p>Here, you see the <q>Comfirm Delivered</q> button, and the <q>Customer Complain Form</q> button.</p>
              <ul className='guide-ul'>
                <li>Click on the <q>Confirm Delivered</q> button to let Mosganda know that you have received the item(s).</li>
              <li>If you have a complain, maybe you were sent a different item from the one you ordered, click on the <q>Customer Complain Form</q> button, fill and submit your complain. Mosganda will pick it up.</li>
             </ul>

          
        </AccordionDetails>
          </Accordion>
          <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography><h2 className='guide-h2'>How can I buy two or more items from a seller at once?</h2></Typography>
            </AccordionSummary>
            <AccordionDetails>
              <h4>Buy two or more items</h4>
              <p>Register and login</p>
              <ul className='guide-ul'>
                  <li>Click on the image or name of the product or click on the <q>Details</q> button. This will take you to the product detail page where you get more information about the product, the store that is selling the product, and also the name of the seller. Here, you can also select the quantity if you are buying in bulk.</li>
                <li>Click on the <q>Add to Shopping Basket</q> button. This will take you to the shopping basket page.</li>
                <li>Click on the <q>view-store</q> button.</li>
                <li>In the seller store, click on the image or name of the product or click on the <q>Details</q> button. This will take you again to the product detail page.</li>
                <li>Click on the <q>Add to Shopping Basket</q> button. This will take you again to the shopping basket page. Now, if you look at the <q>Basket</q> button on top of the screen, you will see an increase in number of items you have added to the basket.
                  <p>If you still need to shop more, click on the <q>view-store</q> button again and repeat the process. When you have added all your products/items to the basket, continue with the steps below.</p>
                </li>

                  <li>Click on <q>Proceed to Checkout</q> button. Here, if you are not logged in, you will be required to log in before going to the next page. If you have not registered, then you need to both register and log in. If you are already logged in, continue.</li>
                  <li>Fill the <q>Shipping Address</q> form so that the seller can send you your items. Click on <q>Continue</q></li>
                  <li>Select your preferred payment method, and click on <q>Continue</q>. This will take you to the summary of your order.</li>
                  <li>Click on <q>Place Order</q>. This will take you to the Payment Page. Fill the Receipt Form so you can get a receipt of payment.</li>
                  <li>Click on <q>Pay Now (PayStack)</q> button. In the pop-up, select either to pay with card or bank or USSD and enter your private information</li>
                  <li>Click on <q>Pay</q>. If payment is successful. That is all. Check your email for payment receipt</li>
                </ul>
                <p>Mosganda will notify the seller, and he is going to send you your items.</p>
              <p>To always view your order, at the top of the screen, move your mouse to your name. In the dropdown menu, click on <q>My Orders</q>.</p>
              <h4>What to do when your goods are sent to you.</h4>
              <p>Login to Mosganda, move the mouse to your name at the top of the screen. In the dropdown, click on <q>My Orders</q>.</p>
              <p>Here, you see the <q>Comfirm Delivered</q> button, and the <q>Customer Complain Form</q> button.</p>
              <ul className='guide-ul'>
                <li>Click on the <q>Confirm Delivered</q> button to let Mosganda know that you have received the item(s).</li>
              <li>If you have a complain, maybe you were sent a different item from the one you ordered, click on the <q>Customer Complain Form</q> button, fill and submit your complain. Mosganda will pick it up.</li>
             </ul>
            </AccordionDetails>
      </Accordion>
          <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography><h2 className='guide-h2'>How do I know the seller of a particular item?</h2></Typography>
            </AccordionSummary>
            <AccordionDetails>
              <h4>Know the seller</h4>
              <p>For every product, there is a <q>View-store</q> button. This button takes you to the user-store where you find details of the seller.</p>
              <p>When you click on a product or <q>Detail</q> button, you will see the seller of that product.</p>
              <p> You can also click on the <q>Stores</q> button on the home page, then click on a store to get details of the seller, and also to access all products from that store.</p>
            </AccordionDetails>
          </Accordion>
          <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography><h2 className='guide-h2'>Can I buy from two or more sellers at once?</h2></Typography>
            </AccordionSummary>
            <AccordionDetails>
              <p>No, we do not allow buying from two or more sellers at once. To buy from two or more sellers, pay for the item(s) from one seller, then buy from the second seller, and so on. </p>
              <p>But you can buy as many items/products from one seller at once.</p>
            </AccordionDetails>
          </Accordion>
          
          
          <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography><h2 className='guide-h2'>How do I sell on Mosganda?</h2></Typography>
        </AccordionSummary>
        <AccordionDetails>
          
              <h4>Steps</h4>
              <p>To sell on Mosganda, you just need three steps.</p>
                <p>(1) Register and log in. This has been discussed above.</p>
                <p>(2) Create a store</p>
                <p>(3) Add items you want to sell, and post them to the homepage.</p>
                <h3>Create A Store</h3>
                <p>Once you have logged in to your account.</p>
                <ul className='guide-ul'>
                  <li>Click on <q>Create Store</q> button at the top of the screen. You can also find <q>Create Store</q> link from the dropdown that appears when you move the mouse over your name, at the top of the screen.</li>
                  <li>Fill the <q>Create Store</q> form with information about your store</li>
                  <li>Click <q>Create</q>. Your store has been created.</li>
                  <li>Kindly, log out and log in again to access your store.</li>
                  <li>Move the mouse over your name at the top of the screen.</li>
                  <li>In the dropdown, click on the <q>Userstore</q> button</li>
                </ul>
                <h4>Edit Profile</h4>
                <p>Click on the <q>Edit Profile</q> button to edit your profile.</p>
                <h3>Edit Store</h3>
                <p>Click on the <q>Edit</q> button under the store details card, to edit your store.</p>

                <h4>Add Items To Your Store</h4>
                <p>Now that you have created your store, you can start adding items you want to sell.</p>
                <ul className='guide-ul'>
                  <li>Click on the <q>Add items for sale</q> button.</li>
                  <li>Enter the information about the item and click <q>Create Product</q>. Repeat this step to add more items for sale.</li>
                </ul>
                
                <h4>Post and Unpost Store</h4>
                <p>Click on the <q>Post</q> button to make your store visible. This will share your store to the store's page. When you post your store, you will see it among other stores on the store page.</p>
                <p>Click on the <q>Unpost</q> button to remove your store from the store's pages</p>

                <h4>Post and Unpost Products/Items</h4>
                <p>Click on the <q>Post</q> button to make your products visible. This will share your products from your store to the products page. When you post your product(s), you will see them among other products on the products page.</p>
                <p>Click on the <q>Unpost</q> button to remove your product from the products page.</p>
                <p>You are all set, anyone can buy your products.</p>

                <h4>When should you <q>Unpost</q> your store or products?</h4>
                <p>Whenever you will not be available to process customer orders, you should Unpost your store. e.g when you traveled.</p>
                


                <h4>Store URL</h4>
                <p>Store URL is the address or link to your store. You can copy it, and paste it on WhatsApp, Facebook, and other social media, to move customers to your store.</p>
                <p>Click on the <q>Click to copy store url</q> button to copy the store URL.</p>

          
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography><h2 className='guide-h2'>What can I sell on Mosganda?</h2></Typography>
        </AccordionSummary>
        <AccordionDetails>
        
                <p>Mosganda allows you to sell whatever you can sell in a physical shop/store. As long as the item is not banned by the government.</p>
                <p>Fashion e.g Clothing, Jewelry and Accessories, Shoes, Handbags, Traditional Wears, Maternity Gowns, Underwears, and Sleepwear, T-Shirts and Polos, Jeans, Corporate Suites, Watches, etc.</p>
                <p>Electronics e.g LED TVs, Smart TVs, Televisions, DVD players, PlayStation, Home theatre, Bluetooth speakers, sound bars, Camcorders, digital cameras, video surveillance, projectors, etc</p>
                <p>Baby Products e.g Baby food, food storage, bottle feeding, bibs, Shampoo, skin care, washcloths and towels baby gifts, pregnancy, and maternity Baby toddler toys.</p>
                <p>Health and Beauty e.g Skincare, Haircare, Oral care, Deodorants and Antiseptics, Makeup, Personal care, shave and hair removal, etc</p>
                <p>Home and Office equipment, Computer Accessories, Laptops, Phones, and Accessories, cosmetics, etc</p>
                <p>Just anything you can sell freely. Even the Meat seller, Fish sellers in the market can sell on Mosganda.</p>
          
        </AccordionDetails>
          </Accordion>
          <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography><h2 className='guide-h2'>How do I create a store on Mosganda?</h2></Typography>
            </AccordionSummary>
            <AccordionDetails>
              <h4>Create a store</h4>
              <p>First, you need to register and log in to your account. For Information on how to register, visit the <q>How to register and login</q> button above. Once you have logged in to your account.</p>
                <ul className='guide-ul'>
                  <li>Click on <q>Create Store</q> button. You can also find <q>Create Store</q> link from the dropdown that appears when you move the mouse over your name, at the top of the screen.</li>
                  <li>Fill the <q>Create Store</q> form with information about your store.</li>
                  <li>Click <q>Create</q>. This will create your store in a minute.</li>
                  <li>Kindly, logout and login again to access your store.</li>
                  <li>Move the mouse over your name at the top of the screen.</li>
                  <li>Click on <q>Userstore</q>.</li>
                </ul>
                <h4>Edit Profile</h4>
                <p>Click on the <q>Edit Profile</q> button to edit your profile.</p>
                <h4>Edit Store</h4>
              <p>Click on the <q>Edit</q> button under the store details card, to edit your store.</p>
              <p>Click on the <q>Post</q> button to post your store to the store's page. But your store is still empty. You need to add items to your store. </p>

            </AccordionDetails>
          </Accordion>
          <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography><h2 className='guide-h2'>How do I add items I want to sell?</h2></Typography>
            </AccordionSummary>
            <AccordionDetails>
              <p>Before adding items/products for sale, you need to do two things.</p>
              <p>(a) Register and Login</p>
              <p>(b) Create a store.</p>
              <p>If you have not done so, follow the procedure to Register, Login, Create store above.</p>

              <h4>Add Items To Your Store</h4>
                <p>If you have created your store, you can start adding items you want to sell. Move the mouse to your name, at the top of the page. Click on <q>Userstore</q>.</p>
                <ul className='guide-ul'>
                  <li>Click on the <q>Add items for sale</q> button.</li>
                <li>Enter the information about the item and click <q>Create Product</q>.</li>
                <li>If successful, you will be redirected to your store. Repeat the steps to add more items for sale. At this point, you are still the only one seeing your product(s).</li>
                <li>Click on the <q>Post</q> button to display your product on the product page for sale.</li>
                </ul>
            </AccordionDetails>
          </Accordion>
           <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography><h2 className='guide-h2'>I can't find my items/products on the products page and my store, what happened?</h2></Typography>
            </AccordionSummary>
            <AccordionDetails>
              <p>Two things may be involved</p>
              <h4>Items have been paid for</h4>
              <p>If you are not seeing your items on the products page and in your store. It means your item(s) have been paid for. They are on your <q>Sold items</q> page.</p>
              <p>Move the mouse to your name at the top of the page, in the dropdown, click on <q>Sold Items</q> to see the items. Send them across to the buyer.</p>
              <h4>Items have not been posted.</h4>
              <p>If you are seeing the items in your store but not on the product's page, it means you have not posted the item(s).</p>
              <p>Click on the <q>Post</q> button to post the item(s).</p>

            </AccordionDetails>
      </Accordion> 
          <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography><h2 className='guide-h2'>What is Post and Unpost in my store?</h2></Typography>
            </AccordionSummary>
            <AccordionDetails>
              <p>When you create a store on Mosganda. Your store is protected and only accessible by you. Use the <q>Add items for sale</q> button to add items you want to sell. Now that you have items in your store. You can now post your store to the store's page so that customers can access your items/products.</p>
              <h4>Post</h4>
              <p>The <q>Post</q> button is used to move your store or products to where customers can access them. If you post your store, it will be available on the <q>Stores</q> page. When you post your products/items, they will be available on the <q>Products</q> page.</p>
              <h4>Unpost</h4>
              <p>The <q>Unpost</q> button is used to remove your store/items. If you <q>Unpost</q> your store, it removes it from the <q>Stores</q> page. If you <q>Unpost</q> your product/item, it will be removed from the <q>Products</q> page.</p>

              <h4>When should you <q>Unpost</q> your store or products?</h4>
                <p>Whenever you will not be available to process customer orders, you should <q>Unpost</q> your store. e.g when you traveled.</p>
                

            </AccordionDetails>
          </Accordion>
          <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography><h2 className='guide-h2'>What is store URL?</h2></Typography>
            </AccordionSummary>
            <AccordionDetails>
              <h4>Store URL</h4>
              <p>Your store URL is the link/address to your store. If you have added items you want to sell, you can copy your store URL and share it with customers, friends, and family.</p>
              <p>When they click on the store URL, it will take them to your store, where they can see what you are selling, and buy from you.</p>
              <h4>How to share my store URL</h4>
              <p>At the top of the page, move the mouse to your name. In the dropdown, click on <q>User store</q>.</p>
              <p>In your store, click on the <q>click to copy store url</q> button. Now, you can paste it on social media sites like WhatsApp, Facebook, etc for customers to visit your store.</p>
            </AccordionDetails>
          </Accordion>
          <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography><h2 className='guide-h2'>How do I know if a customer has placed an order or paid for my item/product?</h2></Typography>
            </AccordionSummary>
            <AccordionDetails>
              <h4>Items ordered and paid for</h4>
              <p>If a customer has paid for your item/product, such item(s) will be moved to your <q>Sold Items</q>. You will not see them on the product's page or your store. To get your sold items:</p>
              <p>Move the mouse to your name at the top of the screen.  In the dropdown, click on <q>Sold Items</q>. There you will find the list of your items paid for and the buyer information on every sold item.</p>
              <p>Package the goods and send them across to the buyer.</p>
              <p>Once you have successfully send the goods to the buyer, click on the <q>Pay Me</q> button.</p>
              <p>In the withdrawal form that appears, enter your account details, and click on <q>Submit</q> to get your money within 48 hours.</p>
              <h4>Items ordered but not yet paid for</h4>
              <p>These item(s) will still be available on the product's page as well as in your store. But to know these items, you need to check your <q>Customer Orders</q>.</p>
              <p>Move the mouse to your name at the top of the screen.</p>
              <p>In the dropdown, click on <q>Customer Orders</q>. If there are orders, check the order status and you will see the potential buyer information.</p>
              <p>Do not send goods for orders that are not yet paid for. Instead, chat with the customer to complete the order by paying for it.</p>
              <p>To chat with the potential buyer, visit <q>How to chat with a buyer</q> below.</p>
            </AccordionDetails>
          </Accordion>
          <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography><h2 className='guide-h2'>How do I get my money for items I sell?</h2></Typography>
            </AccordionSummary>
            <AccordionDetails>
              <p>Note that your account name must correspond with your registered name on Mosganda, and your name on your Bank Verification Number (BVN), to avoid payment issues.</p>
              <h4>Withdraw from Mosganda</h4>
              <p>To withdraw from Mosganda, two things must be in place</p>
              <p>(a) Your item/product has been ordered and paid for by your customer/buyer.</p>
              <p>(b) You have delivered the product/item to the customer.</p>
              <p>Once the above is in place, move the mouse to your name, at the top of the page.</p>
              <p>In the dropdown, click on <q>Sold Items</q>, click on the <q>Pay me</q> button</p>
              <p>In the withdrawal form that appears, fill in your account information and click on <q>Submit</q></p>
              <p>Mosganda will pay you within 48 hours.</p>
              
            </AccordionDetails>
          </Accordion>
          <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography><h2 className='guide-h2'>What is Chat on Mosganda?</h2></Typography>
            </AccordionSummary>
            <AccordionDetails>
              <h4>Chat</h4>
              <p>The chat feature allows buyers and sellers to have real-time communication through messages. This is similar to social media chats like WhatsApp.</p>
              <p>The chat button is only visible to logged-in users, so you will have to be logged in before you can chat with a seller/user.</p>
              <p>To chat with a seller, you find the seller by name. There are many ways you can get the name of the seller.</p>
              <p>(a) When you click on a product or <q>detail</q> button of a product, you will see the name of the seller.</p>
              <p>(b) For every product, there is a <q>View-store</q> button. This button takes you to the user-store where you find details of the seller.</p>
              <p>(c) You can also click on the <q>stores</q> button on the home page, then click on a store to get details of the seller.</p>
              <h4>How to chat</h4>
              <ul className='guide-ul'>
                <li>Copy the name of the seller, click on the <q>Chat</q> button at the top of the page.</li>
                <li>In the Chat page, click on the <q>Search user</q> text/icon, type/paste the copied name in the popup, and click on the <q>Go</q> button</li>
                <li>If the user is found, click on it and start chatting by sending a message.</li>
              </ul>
            </AccordionDetails>
      </Accordion>
          <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography><h2 className='guide-h2'>How can I chat with a seller on Mosganda?</h2></Typography>
            </AccordionSummary>
            <AccordionDetails>
              <p>You can communicate/chat with a seller on Mosganda using the <q>Chat</q> button at the top of the page.</p>
              <p>Note that the chat button is only visible to logged-in users, so you will have to log in before you can chat with a seller/user.</p>
              <p>To chat with a seller, you find the seller by name. There are many ways you can get the name of the seller.</p>
              <p>(a) When you click on a product or <q>detail</q> button of a product, you will see the name of the seller.</p>
              <p>(b) For every product, there is a <q>View-store</q> button. This button takes you to the user-store where you find details of the seller.</p>
              <p>(c) You can also click on the <q>stores</q> button on the home page, then click on a store to get details of the seller.</p>
              <h4>How to chat</h4>
              <ul className='guide-ul'>
                <li>Copy the name of the seller, click on the <q>Chat</q> button at the top of the page.</li>
                <li>In the Chat page, click on the <q>Search user</q> text/icon, type/paste the copied name in the popup, and click on the <q>Go</q> button</li>
                <li>If the user is found, click on it and start chatting by sending a message.</li>
              </ul>
            </AccordionDetails>
          </Accordion>
           <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography><h2 className='guide-h2'>How can I chat with a buyer on Mosganda?</h2></Typography>
            </AccordionSummary>
            <AccordionDetails>
              <p>You can communicate/chat with a buyer/customer on Mosganda using the <q>Chat</q> button at the top of the page.</p>
              <p>Note that the chat button is only visible to logged-in users, so you will have to logged-in before you can chat with a buyer/customer.</p>
              <p>To chat with a buyer/customer, you find the customer by name. You can get the name of the customer when he places an order to buy from you or when he pays for an item you are selling.</p>
              <p>Move the mouse to your name, at the top of the page. In the dropdown, click on <q>Customer Orders</q> or click on <q>Sold Items</q>. If you have order(s) or sold items, you will see the name of the customer on it.</p>
              <p>Take note of the status of the order to see if it is paid or not yet paid. You are not sending your goods for orders that are not yet paid.</p>

              <h4>How to chat</h4>
              <ul className='guide-ul'>
                <li>Copy the name of the buyer/customer, click on the <q>Chat</q> button at the top of the page.</li>
                <li>In the Chat page, click on the <q>Search user</q> text/icon, type/paste the copied name in the popup, and click on the <q>Go</q> button</li>
                <li>If the user is found, click on it and start chatting by sending a message.</li>
              </ul>
            </AccordionDetails>
      </Accordion>
          
      {/* <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography> Mosganda</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <h4></h4>
            </AccordionDetails>
      </Accordion> */}
    </div>
        </div>
    )
}

export default Guide
