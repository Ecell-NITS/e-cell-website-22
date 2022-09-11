const express=require('express')
const router=express.Router();

router.get('/',(req,res)=>{
    // res.send('hello!! this is express from node js')
    const params={'title':'home'}
    res.render('index',params);
});
router.get('/gallery',(req,res)=>{
    // res.send('hello!! this is express from node js')
    const params={'title':'gallery'}
    res.render('gallery',params)
});
router.get('/Ecell-Teams',(req,res)=>{
    // res.send('hello!! this is express from node js')
    const params={'title':'contact'}
    res.render('our-team',params)
});

module.exports=router;