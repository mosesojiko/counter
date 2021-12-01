// eslint-disable-next-line no-undef
const bcrypt = require('bcryptjs');
const data = {
    users: [
        {
            name: 'Moses',
            email: 'moses@gmail.com',
            password: bcrypt.hashSync('1234', 8),
            isAdmin: true,
            isSeller: true,
        },
        {
            name: 'Ojiko',
            email: 'ojiko@gmail.com',
            password: bcrypt.hashSync('1234', 8),
            isAdmin: false,
            isSeller: false,
        }
    ],
    products: [
        {
           
            name: "Iphone 1",
            image: "/images/phone-1.jpg",
            price: 150000,
            category: "Phones",
            countInStock: 10,
            brand: "Nokia",
            rating: 1.5,
            numReviews: 10,
            description: "High quality phone."

        },
        {
          
            name: "Iphone 2",
            image: "/images/phone-2.jpg",
            price: 200000,
            category: "Phones",
            countInStock: 5,
            brand: "Nokia",
            rating: 3.5,
            numReviews: 10,
            description: "High quality phone."

        },
        {
            
            name: "Car 3",
            image: "/images/car-3.jpg",
            price: 3000000,
            category: "Cars",
            countInStock: 15,
            brand: "Toyota",
            rating: 4.0,
            numReviews: 7,
            description: "High quality car."

        },
        {
         
            name: "Car 4",
            image: "/images/car-4.jpg",
            price: 7200000,
            category: "Cars",
            countInStock: 5,
            brand: "Toyota",
            rating: 2.0,
            numReviews: 4,
            description: "High quality car."

        },
        {
          
            name: "Furniture 5",
            image: "/images/furniture-5.jpg",
            price: 40000,
            category: "Furniture",
            countInStock: 2,
            brand: "Furniture",
            rating: 2.5,
            numReviews: 6,
            description: "High quality furniture."

        },
        {
           
            name: "Furniture 6",
            image: "/images/furniture-6.jpg",
            price: 15000,
            category: "Furniture",
            countInStock: 11,
            brand: "Furniture",
            rating: 3.5,
            numReviews: 5,
            description: "High quality furniture."

        },
        {
           
            name: "Shoe 7",
            image: "/images/shoe-7.jpg",
            price: 5000,
            category: "Shoes",
            countInStock: 8,
            brand: "Nike",
            rating: 1.5,
            numReviews: 26,
            description: "High quality shoe."

        },
        {
           
            name: "Shoe 8",
            image: "/images/shoe-8.jpg",
            price: 3000,
            category: "Shoes",
            countInStock: 5,
            brand: "Nike",
            rating: 3.5,
            numReviews: 10,
            description: "High quality shoe."

        },
    ],
    stores: [
        {
            _id: "1",
            name: "Clothing store",
            address: "No 5, Ibusa Road",
            city: "Asaba",
            image: "/stores/store1.jpg",
            description: "We sell all types of women clothes."
        },
        {
            _id: "2",
            name: "Shoe store",
            address: "No 25, Isoko Road",
            city: "Ughelli",
            image: "/stores/store2.jpg",
            description: "We sell all types of footwares."
        },
        {
            _id: "3",
            name: "Electronic store",
            address: "No 10 Airport Road",
            city: "Warri",
            image: "/stores/store3.jpg",
            description: "We sell all types of Television sets."
        },
        {
            _id: "4",
            name: "Food store",
            address: "No 45 new road",
            city: "Sapele",
            image: "/stores/store4.jpg",
            description: "This is a supermarket"
        },
        {
            _id: "5",
            name: "John's Pharmacy",
            address: "No 20 Sapele road",
            city: "Benin",
            image: "/stores/store5.jpg",
            description: "We sell all types of drugs"
        },
        {
            _id: "6",
            name: "Elo's Bakery",
            address: "No 23 1 Amekpa road",
            city: "Ughelli",
            image: "/stores/store6.jpg",
            description: "We produce bread"
        }
    ],
    
}

// eslint-disable-next-line no-undef
module.exports =  data
