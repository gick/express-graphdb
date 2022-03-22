const express = require('express');

var router = express.Router();
router.get('/info',(req,res)=>{
    res.send("All is working")
})
module.exports=router