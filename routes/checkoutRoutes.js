import { Router } from "express";
import { newOrder, notificationOrder, findPaymentById} from "../controller/preferenciasController.js";

const checkoutRouter = Router();

checkoutRouter.post('/new-order',newOrder);
checkoutRouter.post('/notification',notificationOrder);
checkoutRouter.get('/find-paymeny-by-id',findPaymentById);

checkoutRouter.post('/test',(req,res)=>{
  console.log(req.body)
  res.status(200).send(req.body);
});



export default checkoutRouter;

