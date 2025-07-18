import express from "express";
import morgan from "morgan";
import cors from "cors";
import router from "./routes/orderIdsRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
import categorieRouter from "./routes/categorieRoutes.js";
import checkoutRouter from "./routes/checkoutRoutes.js";
import productRouter from "./routes/productRoutes.js";
import portadaRouter from "./routes/portadaRoutes.js";
import bannerRouter from "./routes/bannerRoutes.js";
import userRouter from "./routes/userRoutes.js"
import filtroRouter from "./routes/filterRoutes.js"
import db from "./dbConfig/dbConfig.js";

const app = express();
const DB = db;

app.use(express.json({limit:'50mb'}));
app.use(morgan('dev'));


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


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
  res.send("<p>Pupita Pet Shop - Api</p>")
});

app.use(router);
app.use(categorieRouter);
app.use(productRouter);
app.use(checkoutRouter);
app.use(orderRouter);
app.use(userRouter);
app.use(bannerRouter);
app.use(portadaRouter);
app.use(filtroRouter);


app.listen(3000,console.log("Server conection: localhost:3000 "))