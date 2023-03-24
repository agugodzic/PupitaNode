import express from "express";
import morgan from "morgan";
import router from "./routes/orderIdsRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
import categorieRouter from "./routes/categorieRoutes.js";
import checkoutRouter from "./routes/checkoutRoutes.js";
import productRouter from "./routes/productRoutes.js";
import userRouter from "./routes/userRoutes.js"
import cors from "cors";
import db from "./dbConfig/dbConfig.js";

const app = express();
const DB = db;

app.use(express.json({limit:'50mb'}));
app.use(morgan('dev'));
app.use(cors({
  origin:"https://pupitapetshop.com.ar"
}));

(async ()=> {
  try{
    await DB.authenticate()
    await DB.sync()
    console.log('DB auth: OK.')}

  catch(error){
    console.log("db conection failed")
    throw("DB conection failed:" + error)
  }
})();

app.get("/",(req,res)=>{
  res.send("Pupita Backend")
});

app.use(router);
app.use(categorieRouter);
app.use(productRouter);
app.use(checkoutRouter);
app.use(orderRouter);
app.use(userRouter);

app.listen(3000,console.log("Server conection: localhost:3000"))
