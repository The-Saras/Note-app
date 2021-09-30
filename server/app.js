const express=require("express");
const app = express();
const connectToMongo = require("./db");
const cors = require("cors")

connectToMongo();
const PORT = 5000;


app.use(cors())
app.use(express.json())

app.use("/api/auth",require("./routes/auth"))
app.use("/api/notes",require("./routes/notes"))

app.listen(PORT,()=>{
    console.log("up on 3000 port")
})