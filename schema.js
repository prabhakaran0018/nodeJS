const mongoose = require('mongoose')
const expenseschema = new mongoose.Schema({
    amount:{
        type : Number
    },
    category : {
        type : String
    },
    date:{
        type : String
    }
})
const Expense = mongoose.model('Expense_Details',expenseschema) 
module.exports = {Expense}