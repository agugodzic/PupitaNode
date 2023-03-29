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
  res.status(200).json(dato);
})

productRouter.get('/productos/listar', async(req,res)=>{
  try{
    const dato = await product.findAll(
      {attributes: ['id', 'nombre','precio','descripcion','descripcioncorta','marca','imagen1']}
    );
    res.status(200).send(dato);
  }catch(error){
    console.log(error);
    res.status(400).send(error);
  }
})

productRouter.get('/productos/rango/:rango', async(req,res)=>{
  try{
    const { rango } = req.params;
    const dato = await product.findAll(
      {attributes: ['id', 'nombre','precio','descripcion','descripcioncorta','marca','imagen1']}
    );
    const datoRango = 
    res.status(200).send(dato);
  }catch(error){
    console.log(error);
    res.status(400).send(error);
  }
})

productRouter.post('/productos/agregar', async(req,res)=>{
  try{
    const add = await product.create(req.body);
  res.status(200).json(add);
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
      res.status(200).send(err);
  }        
})

productRouter.delete('/productos/:id', async(req,res)=>{
  const {id} = req.params;
  const dato = await product.destroy({
    where: {
    id: id
  }}).then(function(result){
    res.redirect(200,"")
  });        
})

export default productRouter;

