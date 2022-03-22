const express = require('express');
const cors = require('cors');
const app=express()
var routes=require('./routes/routes')
var {server,repository}=require('./graphdb/initConnection')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use('/',routes)
app.listen(8000)
console.log('App is listening on port 8000')
