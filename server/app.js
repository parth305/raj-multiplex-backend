import express from "express"
import logger from "morgan"
import connectMongo from "./connector/connectMongo"
import indexRouter from "./routes"
var app = express()

connectMongo()

app.use(logger('dev'))

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use("/",indexRouter)

app.listen(3000,()=>{
    console.log("listening from port 3000")
})