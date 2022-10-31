const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const categories_model = new Schema({
    type:{type:String, default:"Investment"},
    color:{type:String, default:"#fcbe44"}
})

const transaction_model = new Schema({
    name:{type:String, default:"Miscellanious"},
    type:{type:String, default:"Investment"},
    amount:{type:Number},
    date:{type:Date,default:Date.now}
})


const Categories = mongoose.model('categories',categories_model)
const Transaction = mongoose.model('transaction',transaction_model)

exports.default = Transaction;
module.exports ={
    Categories,
    Transaction
}
