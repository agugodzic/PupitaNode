import mercadopago  from "mercadopago";
//import env from "../env.js";
import OrderId from "../models/orderId.js";

const order = OrderId;
//const config = env;
const config =process.env;
mercadopago.configure({
  access_token:config.TEST_TOKEN
});

function preferenceGenerator(preference){
  var pref = {
    back_urls:{
      success: config.SUCCESS
 },
    items: preference.items,
    metadata:preference.metadata,
    notificationUrl:config.NOTIFICATION_URL
  };
  return pref;
};

export const newOrder = async(req,res)=>{
  var preference = preferenceGenerator(req.body);

  mercadopago.preferences.create(preference)
  .then((r)=>res.json(r))
  .catch((r)=>console.log(r))
}

export const notificationOrder = async(req,res)=>{
  const paymentId = req.body.data.id;
  const topic = req.body.type;

  var merchantOrder;

  switch(topic){
    case "payment":
      const payment = await mercadopago.payment.findById(paymentId);
      console.log("Topic: " , topic , 'Payment: ', payment);
      merchantOrder = await mercadopago.merchant_orders.findById(payment.body.order.id);
      var orderId = payment.body.metadata.order_id;
      break;

    case "merchant_order":
      console.log("Topic: " , topic, 'Order id: ', paymentId)
      merchantOrder = await mercadopago.merchant_orders.findById(paymentId);
      console.log('Merchant order: ', merchantOrder)
      break;
  }
  if(!orderId || !paymentId || !topic){
    //return res.status(400).json({error:"null element into req"})
    orderId = 0;
    paymentId = 0;
    topic="0";
  }
  try{
    const add = await order.create({
      orderId:orderId,
      topic:topic,
      paymentId:paymentId
  });
  res.status(200).send(add);
  }catch(err){
    res.status(400).json({error:"Error al almacenar datos."});
    throw(err)
  }

}

export const findPaymentById = async(req,res) => {
const paymentId = req.paymentId;
const topic = req.topic;
var merchantOrder;

switch(topic){
  case "payment":
    payment = await mercadopago.payment.findById(paymentId);
    console.log("Topic: " , topic , 'Payment: ', payment);
    merchantOrder = await mercadopago.merchant_orders.findById(payment.body.order.id);
    console.log('Merchant order:', merchantOrder)
    break;

  case "merchant_order":
    const orderId = paymentId;
    console.log("Topic: " , topic, 'Order id: ', orderId)
    merchantOrder = await mercadopago.merchant_orders.findById(orderId);
    console.log('Merchant order: ', merchantOrder)
    break;
}
}