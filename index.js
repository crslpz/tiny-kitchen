const express = require('express')
const mongoose = require('mongoose')
import { MONGO_URI } from "./config/keys.js";
import {orders} from "./routes/orders.js"

const app = express();

mongoose.connect(MONGO_URI, {useNewUrlParser: true, useUnifiedTopology:true})
    .then(()=> console.log('MongoDB connected'))
    .catch((err) => console.log(err));

app.use(express.json());
// this assures that our resquests are always in json

app.get('/',(req,res) => res.send('Hello world'));
app.use("/api/orders", orders);
//2. more specifics as to where they can go and limits their ability 

const port = process.env.PORT || 5001;
//1. opening the door of the kitchen if something wanted to come in they can 
const callback = () => console.log(`Server is running on port ${port}`)
app.listen(port, callback)
// we use the variable just in case the port isn't the default

// express/Rails/Flash:
// listens to requests that are coming in (will get the name of something in the get request)
// looks to see if we have a route associated with the request
// returns the result of the route