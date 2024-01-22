const mongoose=require("mongoose")
var mongoUrl="mongodb+srv://pranavunnikrishnan56:pranav@cluster0.girnpve.mongodb.net/Scan?retryWrites=true&w=majority"
mongoose.connect(mongoUrl)
.then(()=>{
    console.log("Database Connected")

})

.catch(err =>
    {
        console.log(err)
    })

    module.exports=mongoose