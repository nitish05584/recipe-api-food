const express=require("express");
const color=require("colors")

const cors=require("cors")

const cookiParser=require("cookie-parser")

const dotenv=require("dotenv")

const connectDB=require("./config/db");

const authRouter = require("./routes/auth.routes");

const userRouter = require("./routes/user.routes");





const app=express();
dotenv.config()
connectDB();


app.use(express.json());

app.use(express.urlencoded({extended:true}))

app.use(cookiParser())

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));


app.use("/api/auth",authRouter)

app.use("/api/user",userRouter)








const port=process.env.port||8000

app.listen(port,()=>{
    console.log(`server is running on ${port}`.bgGreen)
})