const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')
const { error } = require('console')

const port=process.env.PORT || 3000
const app=express()
// console.log(__dirname)
// console.log(path.join(__dirname,'../source'))

const viewPath=path.join(__dirname,'../template/views')
const partialPath=path.join(__dirname,'../template/partials')


//define to express config
app.set('view engine','hbs')//letting express know that we want use hbs for engine view
app.set('views',viewPath)
hbs.registerPartials(partialPath)


//setup static directory to serve
app.use(express.static(path.join(__dirname,'../public')))

app.get('',(req,res)=>{
   res.render('index',{
      title:"Weather app",
      name:"Sourav"
   })
})


app.get('/help',(req,res)=>{
   res.render('help',{
      title:"Help ",
      message:"this the help page",
      name:"Sourav"
   })
 })
 app.get('/about',(req,res)=>{
   res.render('about',{
      title:"About me",
      name:"Sourav"
   })
 })
 app.get('/product',(req,res)=>{
    if(!req.query.search){
      return  res.send({
          error:'please provide a search item'
       })
    }
    console.log(req.query)
    res.send({//we cannot use two htttp request in a single block
       product:[]
    })
 })

 app.get('/weather',(req,res)=>{
    if(!req.query.address){
       res.send({
          error:"please provide the address"
       })
    }
    else{
       geocode(req.query.address,(error,update={})=>{
          forecast(update,(error,data={})=>{
             res.send(data)
          })
       })
    }
 })

 app.get('/help/*',(req,res)=>{
    res.render('error',{
       message:"help Page doen't exists",
       name:"Sourav"
    })
 })
 app.use((req,res)=>{
   res.render('error',{
      message:"Page doen't exists",
      name:"Sourav"
   })
 })
app.listen(port,()=>{
    console.log("Server is up on port ",port)
})