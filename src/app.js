const express = require('express')
const path=require('path')
const hbs=require('hbs')
const app = express()
const port = process.env.PORT ||3000
const {weather}=require('./weather')

const pathDir=path.join(__dirname,'../public')
const viewPath=path.join(__dirname,'../views')
const partialsPath=path.join(__dirname,'../partials')


app.set('view engine', 'hbs');
app.set('views',viewPath)
hbs.registerPartials(partialsPath)
app.use(express.static(pathDir))


app.get('/',(req,res)=>res.render('index',{title:'Index',name:'Richard'}))
app.get('/help',(req,res)=>res.render('help',{title:'Help',name:'Richard'}))
app.get('/about',(req,res)=>res.render('about',{title:'About',name:'Richard'}))
app.get('/weather',({query}={},res)=> {
    weather(query.place,res,(climate,time,error)=>{
        if(error)
            {
                return res.send([{error:`couldn't connect to weatherstack`}]);
            } 
            else if(!(climate && time))
            {
                return res.send([{error:`Enter valid location`}])
            }
            else
            {
                return res.send([{place:query.place,time,climate:`${climate}`}]);
            }
    })
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))