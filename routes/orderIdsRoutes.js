import { Router } from "express";
import OrderId from "../models/orderId.js";

const router = Router();
const orderId = OrderId;


router.get('/orden/id/:id', async(req,res)=>{
  const {id} = req.params;
  const dato = await orderId.getById(id);
  res.json(dato);
})

router.get('/order/listar', async(req,res)=>{
  try{
    const dato = await orderId.findAll();
    res.send(dato);
  }catch(error){
    console.log("Error: "+error);
    res.send(error);
  }
})

router.post('/order/add', async(req,res)=>{
  const order_Id = req.body.orderId;
  const topic = req.body.topic;
  const payment_Id = req.body.paymentId.toString();
  if(!order_Id || !payment_Id){
    return res.status(400).json({error:"req is null"})
  }
  try{
    const add = await orderId.create({
    orderId:order_Id,
    topic:topic,
    paymentId:payment_Id
  });
  res.json(add);
  }catch(err){
    res.status(400).json({error:"Error:" + err})
    throw(err)
  }
})


export default router;

