const express=require('express')
const app=express();
const port=process.env.PORT || 3000;
const mainROuter=require('./routes/index');

// Middle ware

app.use(express.static('public'));
app.use(express.urlencoded());
app.use("/",mainROuter)
app.set('view engine','ejs');

app.listen(port,()=>{
    console.log(`the app is listening at port ${port}`)
})