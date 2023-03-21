import { Router } from "express";
import Order from "../models/order.js";

const orderRouter = Router();
const order = Order;

orderRouter.get('/orden/id/:id', async(req,res)=>{
  const {id} = req.params;
  const dato = await order.findAll({
    where:{
      id:id
    }
  });
  res.json(dato);
})

orderRouter.get('/orden/listar', async(req,res)=>{
  try{
    const dato = await order.findAll();
    res.send(dato);
  }catch(error){
    console.log(error);
    res.send(error);
  }
})

orderRouter.post('/orden/agregar', async(req,res)=>{
  try{
    const add = await order.create(req.body);
  res.json(add);
  }catch(err){
    res.status(400).json({error:"Error:" + err})
  }
})

orderRouter.put('/orden/editar', async(req,res)=>{
  try {
    await order.update(req.body,{
      where: {
      id: req.body.id
    }});
    res.status(200).json(order);
  } catch (err) {
      console.log("Error: "+ err);
      res.send(err);
  }        
})

orderRouter.delete('/orden/:id', async(req,res)=>{
  try {
    const {id} = req.params;
    const dato = await order.destroy({
      where: {
      id: id
    }
    });
    res.send("Elemento eliminado:" + dato);
  } catch (err) {
      res.send(err)
  }        
})


export default orderRouter;