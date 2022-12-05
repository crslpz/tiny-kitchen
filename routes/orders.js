const express = require('express');
import {Order} from '../models/order.js';
const router = express.Router();
//list of orders
// post an order
// delete and edit orders

router.get('/', (_,res) =>{ //_ because req is not used
    // res.json('GET Success');
    // get our Orders
    Order.find() //without args will FETCH all orders 
        .then(orders => res.json(orders))
            .catch(err => res.status(404).json(err)) //status is set by convention(error with the query(400) not a server error(500))
}); //dont need to pass any data in the url; 
router.post('/', (req, res) => { 
    //request in with some data: could use req.body 
    //Order is a class so we can create a new order by passing an object
    const newOrder = new Order({
        items: req.body.items,
        name: req.body.name,
        address: req.body.address,
    });
    newOrder.save()
        .then((order) => res.json('Your Order is in the Works!'))
        .catch((err) => res.status(422).json(err)); //unprocessible entity 
}); //dont need to pass any data in the url
// to test: curl -X POST -H 'Content-Type: application/json' 'http://localhost:5001/api/orders" -d "{"items": "pizza", 'name': 'chris', 'address': 'abc street'}'
router.patch('/', (req, res) => { 
    res.json('PATCH Success');
}); //dont need to pass any data in the url
router.delete('/:order_id', (req,res)=>{
    const id = req.params.order_id;
    Order.findOneAndDelete(id) // by default returns the entire deleted object
        .then(order => res.json({id: order._id})) // this will limit the info we are receiving. Also in mongoose ids are written with _ 
        .catch((err) => res.status().json(err))
}); // you can use the url to show the id of the page.
// we will keep the body of the request clear, but will extract it from the url

export const orders = router

// we are defining what our clients can do, but still can restrict what info they receive back
// the response of the db depends on who is making the request(client or restuarant)