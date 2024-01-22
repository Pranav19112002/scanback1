
const express=require("express")
const app=express();
const cors = require('cors');



const studmodel=require('./db')
const scanRouter=require('./routes/scanRouter')
const AdminRouter=require('./routes/adminRouter')

app.use(cors());
app.use(express.json())

app.use('/api/scans', scanRouter)
app.use('/api/admin', AdminRouter)

app.listen(3005,()=>

    console.log("connected")
)