import { Router } from "express";
import Product from "../models/product.js";

const productRouter = Router();
const product = Product;


productRouter.get('/productos/id/:id', async(req,res)=>{
  const {id} = req.params;
  const dato = await product.findAll({
    where:{
      id:id
    }
  });
  res.json(dato);
})

productRouter.get('/productos/listar', async(req,res)=>{
  try{
    const dato = await product.findAll();
    res.send(dato);
  }catch(error){
    console.log(error);
    res.send(error);
  }
})

productRouter.post('/productos/agregar', async(req,res)=>{
  try{
    const add = await product.create(req.body);
  res.json(add);
  }catch(err){
    res.status(400).json({error:"Error:" + err})
  }
})

productRouter.put('/productos/editar', async(req,res)=>{
  try {
    await product.update(req.body,{
      where: {
      id: req.body.id
    }});
    res.status(200).json(product);
  } catch (err) {
      console.log("Error: "+ err);
      res.send(err);
  }        
})

productRouter.delete('/productos/:id', async(req,res)=>{
  try {
    const {id} = req.params;
    const dato = await product.destroy({
      where: {
      id: id
    }
    });
    res.send("Producto eliminado:" + dato);
  } catch (err) {
      res.send(err)
  }        
})

export default productRouter;

