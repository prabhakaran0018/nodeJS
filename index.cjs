
const express= require('express')
const mongoose = require('mongoose')
const{ Expense }=require('./schema')
const bodyParser = require('body-parser')
const cors = require('cors')
app.use(cors())
const app= express()
app.use(bodyParser.json())
async function connectToDB(){
  try{
  await  mongoose.connect('mongodb+srv://prabhakarans2022cse:Prabha45@prabha.9ofmsu3.mongodb.net/NODEJS?retryWrites=true&w=majority&appName=prabha')
  console.log('nodejs connected to db')


const port =process.env.port||8100
app.listen(port,function(){
    console.log(`listening on port ${port}...`)
})

}catch(error){
  console.log('error')
}
}
connectToDB()

app.post('/add-expense', async function(request,response){
    // console.log(request.body)
    // response.json({
    //   'status':"create"
    // })
    try{
    await Expense.create({
      "amount": request.body.amount,
      "category" : request.body.category,
      "date": request.body.date
    })
    response.status(201).json({
      "status": "success"
      , "message":"added new entry"
    })
  }catch(error){
    response.status(500).json({
      'status':'failure',
      "message":"entry not added"
    })
  }
})
app.get('/get-expense', async function(request,response){
  try{
  const Expensedata = await Expense.find()
  response.status(200).json(Expensedata)
  
}catch(error){
  response.status(500).json({
    'status':'failure',
    "message":"entry not added"
  })
}
})
app.delete('/delete-expense/:id',async function(request,response){
 try{
  const ExpenseEntry = await Expense.findById(request.params.id)
 if(ExpenseEntry){
  await Expense.findByIdAndDelete(request.params.id)
  response.status(200).json({
    'status':"entry has deleted successfully"
  })
 }else{
  response.status(404).json({
    'status': 'file could not found'
  })
}

 }catch(error){
  response.status(500).json({
    'status': 'file could not found',
    "error" : error
  })
 }
})
app.patch("/edit-expense/:id",async function(request,response){
  try{
const ExpenseEntry = await Expense.findById(request.params.id)
if(ExpenseEntry){
  await ExpenseEntry.updateOne({
    'amount':request.body.amount,
    "category":request.body.category,
    "date":request.body.date
  })
  response.status(200).json({
    'status':"updated successfully"
  })
}else{
  response.status(404).json({
    'status': 'file could not found'
  })
}
  }catch(error){
    response.status(500).json({
      'status': 'file could not found',
      "error" : error})
  }
})