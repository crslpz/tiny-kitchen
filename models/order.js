// const mongoose = require('mongoose');
import mongoose from 'mongoose'
const Schema = mongoose.Schema;
// singular name because all orders will use this single order formula
// ODM non relational DB

const OrderSchema = Schema({
    items: {
        type: String,
        required: true,

    },
    isComplete: {
        type: Boolean,
        default: false,
    },
    name: {
        type: String,
        required: true,
    },
    address:{
        type: String,
        required: true,
    }

}, {timestamps: true});
// this makes things explicit and clean instead of the calling the mongoose.Schema directly
// we want timestamps to see when the order came in


export const Order = mongoose.model("Order", OrderSchema);
//we are gonna create a new model using the schema and export the saved model