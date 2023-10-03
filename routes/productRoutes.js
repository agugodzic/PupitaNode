import { Router } from "express";
import Sequelize, {Op } from "sequelize";
import Product from "../models/product.js";
import previewGenerate from "../controller/productController.js";
import sharp from 'sharp';

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

productRouter.get('/productos/listarInfo', async(req,res)=>{
  try{
    const dato = await product.findAll(
      {attributes: ['id', 'nombre','precio','descripcion','categoria','descripcioncorta','marca']}
    );
    res.status(200).send(dato);
  }catch(error){
    console.log(error);
    res.status(400).send(error);
  }
})


productRouter.get('/productos/rango/:rango', async(req,res)=>{
  /*
productos/rango || Devuelve 10 productos en total, el valor pasado como parametro define que rango de diez productos se envia de forma que:
    *si rango = 1 se devuelven los primeros 10 productos.
    *si rango = 2 se devuelven los segundos 10 productos

*/
  try{
    const { rango } = req.params;
    const offset = (rango - 1) * 10;
    const limit = 10;

    const items = await product.findAll(
      {
        order: [['id', 'DESC']],
        attributes: ['id', 'nombre','precio','categoria','descripcioncorta','cantidadmaxima','preview'],
        offset: offset,
        limit: limit
      }
    );
    const cantidad = await product.count();

    res.status(200).send(
      {
        productos:items,
        cantidad:cantidad
      });

  }catch(error){
    console.log(error);
    res.status(400).send(error);
  }
})

productRouter.get('/productos/filter/:rango/:categoria/:orden', async(req,res)=>{
  try{
    const { rango , categoria, orden } = req.params;
    const offset = (rango - 1) * 10;
    const limit = 10;
    const attributes = ['id', 'nombre','precio','categoria','descripcioncorta','cantidadmaxima','preview'];
    var cantidad = 0;

    var filters = {
      order: [['id', 'DESC']],
      attributes: attributes,
      offset: offset,
      limit: limit
    }

    if(categoria != 'all' && categoria != 'Todos los productos'){
      filters = {
        ...filters, where:{categoria:categoria}
      };
      
      cantidad = await product.count({
        where:{categoria:categoria}
      });
      
    }else{
      cantidad = await product.count();
    }

    if(orden == 'asc'){
      filters = {
        ...filters, order:[['precio', 'ASC']]
      };
    }else if(orden == 'desc'){
      filters = {
        ...filters, order:[['precio', 'DESC']]
      };
    };

    const items = await product.findAll(filters);
 

    res.status(200).send(
      {
        productos:items,
        cantidad:cantidad,
        limit:limit,
        offset:offset,
        categoria:categoria,
        orden:orden
      });

  }catch(error){
    console.log(error);
    res.status(400).send(error);
  }
})

productRouter.get('/productos/relacionados/:categoria/:cantidad', async(req,res)=>{
  try{
    const {categoria,cantidad} = req.params;
    const offset = 0;
    const limit = parseInt(cantidad);

    var filters = {
      order: [['id', 'DESC']],
      attributes: ['id', 'nombre','precio','categoria','descripcioncorta','cantidadmaxima','preview'],
      offset: offset,
      limit: limit
    }

    if(categoria != 'all' || categoria != 'Todos los productos'){
      filters = {
        where:{categoria:categoria},
        order: [['id', 'DESC']],
        attributes: ['id', 'nombre','precio','categoria','descripcioncorta','cantidadmaxima','preview'],
        offset: offset,
        limit: limit
      }
    };

    const items = await product.findAll(filters);

    res.status(200).send(items);

  }catch(error){
    console.log(error);
    res.status(400).send(error);
  }
})

productRouter.post('/productos/agregar', async(req,res)=>{
  try{
    let prod;
    let add;

    if(req.body.imagen1){
      const base64Data = req.body.imagen1.split(',')[1]; // Extraer la parte de base64
      const originalImageBuffer = Buffer.from(base64Data, 'base64');
  
      // Redimensionar la imagen a un máximo de 180x180px
      const previewImageBuffer = await sharp(originalImageBuffer)
        .resize({ width: 170, height: 170, fit: 'inside' }) // Ajustar dentro de 180x180
        .toBuffer();
  
      // Convertir la vista previa redimensionada a base64
      const previewImageBase64 = `data:image/jpeg;base64,${previewImageBuffer.toString('base64')}`;
  
      // Actualizar la fila actual con la vista previa en la columna 'preview'
      prod = {...req.body, preview: previewImageBase64};
      add = await product.create(prod);
    }else{
      prod = {...req.body};
      add = await product.create(prod);
    }

    res.status(200).json(add);

  }catch(err){
    res.status(400).json({error:"Error:" + err})
  }

})

productRouter.put('/productos/editar', async(req,res)=>{
  try {
    let prod;
    const base64Data = req.body.imagen1.split(',')[1]; // Extraer la parte de base64
    const originalImageBuffer = Buffer.from(base64Data, 'base64');

    // Redimensionar la imagen a un máximo de 180x180px
    const previewImageBuffer = await sharp(originalImageBuffer)
      .resize({ width: 170, height: 170, fit: 'inside' }) // Ajustar dentro de 180x180
      .toBuffer();

    // Convertir la vista previa redimensionada a base64
    const previewImageBase64 = `data:image/jpeg;base64,${previewImageBuffer.toString('base64')}`;

    // Actualizar la fila actual con la vista previa en la columna 'preview'
    prod = {...req.body, preview: previewImageBase64};

    await product.update(prod,{
      where: {
      id: req.body.id
    }});
    res.status(200).json(product);
  } catch (err) {
      console.log("Error: "+ err);
      res.status(400).send(err);
  }        
})

productRouter.put('/productos/variar-precios', async(req,res)=>{
  try {
    const porcentaje = req.body.porcentaje;
    await product.update(
      { precio: Sequelize.literal(`precio * (1 + ${porcentaje} / 100)`), },
      { where: {} } // Aquí puedes agregar condiciones para filtrar los productos a actualizar
    );
    res.status(200).json({status:'ok'});
  } catch (err) {
      console.log("Error: "+ err);
      res.status(400).send(err);
  }        
})


productRouter.post('/productos/id-list', async(req,res)=>{
  try {
  const ids = req.body;

  const items = await product.findAll({
    where: {id:ids},
    attributes: ['id', 'nombre','precio','descripcioncorta','cantidadmaxima','preview'],
  });
  res.status(200).send(items);
} catch (err) {
  console.log("Error: "+ err);
  res.status(400).send(err);
}    
})

productRouter.delete('/productos/:id', async(req,res)=>{
  const {id} = req.params;
  const dato = await product.destroy({
    where: {
    id: id
  }});
  res.writeHead(200, {
    'ok': 'true'
 })
})

productRouter.get('/productos/imagenes/:id', async(req,res)=>{
  const {id} = req.params;
  const dato = await product.findAll({
    where:{
      id:id
    },
    attributes: ['imagen2','imagen3','imagen4']
  })
  res.status(200).json(dato);
})


productRouter.get('/generate-previews', async (req, res) => {
  try {
    const products = await product.findAll({
      attributes: ['id', 'imagen1'],
    });
    console.log("productos: " + products.length);

    for (const prod of products) {
      try {
        const base64Data = prod.imagen1.split(',')[1]; // Extraer la parte de base64
        const originalImageBuffer = Buffer.from(base64Data, 'base64');

        // Redimensionar la imagen a un máximo de 180x180px
        const previewImageBuffer = await sharp(originalImageBuffer)
          .resize({ width: 170, height: 170, fit: 'inside' }) // Ajustar dentro de 180x180
          .toBuffer();

        // Convertir la vista previa redimensionada a base64
        const previewImageBase64 = `data:image/jpeg;base64,${previewImageBuffer.toString('base64')}`;

        // Actualizar la fila actual con la vista previa en la columna 'preview'
        await product.update(
          { preview: previewImageBase64 },
          { where: { id: prod.id } }
        );

      } catch (error) {
        console.error(`Error processing product with ID ${prod.id}:`, error);
      }
    }

    res.status(200).send('Vistas previas generadas y guardadas correctamente.');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error al generar las vistas previas.');
  }
});


productRouter.get('/productos/buscar/:parametro', async (req, res) => {
  try {
    const { parametro } = req.params;
    
    // Intenta buscar por ID primero
    const productoPorId = await product.findOne({
      where: {
        id: parametro
      }
    });

    if (productoPorId) {
      res.status(200).json([productoPorId]);
      return; // Sal de la función si se encontró por ID
    }

    const offset = 0;
    const limit = 10;

    // Si no se encontró por ID, busca por nombre
    const productosPorNombre = await product.findAll({
      where: {
        nombre: {
          [Op.like]: `%${parametro}%` // LIKE para MariaDB (MySQL)
        }
      },
      attributes: ['id', 'nombre', 'precio', 'categoria', 'marca', 'descripcioncorta', 'cantidadmaxima', 'preview'],
      offset: offset,
      limit: limit
    });

    if (productosPorNombre.length > 0) {
      res.status(200).json(productosPorNombre);
    } else {
      res.status(404).json({ mensaje: 'No se encontraron productos con ese nombre o ID.' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error al buscar productos.');
  }
});




export default productRouter;

