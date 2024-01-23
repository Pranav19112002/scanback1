
const express=require("express")
const app=express();
const cors = require('cors');



const dbconfig=require('./db')
const adminsRouter = require('./routes/adminRouter')

app.use(cors());
app.use(express.json())

app.use('/api/admins', adminsRouter ) 


app.listen(3005,()=>

    console.log("connected")
)