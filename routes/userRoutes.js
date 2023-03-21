import { Router } from "express";
import User from "../models/user.js";
import jwt from "jsonwebtoken"

const { sign } = jwt
const userRouter = Router();
const user = User;

userRouter.post('/usuario/agregar', async(req,res)=>{
  try{
    const add = await user.create(req.body);
  res.json(add);
  }catch(err){
    res.status(400).json({error:"Error:" + err})
  }
})

userRouter.post('/login', async(req,res)=>{
  const userCredentials = req.body;
  const users  = await user.findAll({
    where:{
      user:req.body.user,
      password:req.body.password
    }}
  )
  if(users.length = 1){
    try{
      sign({user:userCredentials},'secretKey', (err,token)=>{
        res.json({accessToken:token})
      })

    }catch(err){
      res.status(400).json({error:"Error:" + err})
    }
  }else{
    res.send("Usuario no registrado.")
  }

})

export default userRouter;

