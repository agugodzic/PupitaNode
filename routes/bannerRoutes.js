import { Router } from "express";
import Banner from "../models/banner.js"; // Importa el modelo "Portada" adecuadamente

const portadaRouter = Router();

portadaRouter.get('/banner/id/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const dato = await Banner.findAll({
      where: {
        id: id
      }
    });
    res.status(200).json(dato);
  } catch (error) {
    console.log("Error: " + error);
    res.status(400).send(error);
  }
});

portadaRouter.get('/banner/ids', async (req, res) => {
  try {
    const ids = await Banner.findAll({ attributes: ['id'] });
    const idList = ids.map(idObj => idObj.id);
    res.status(200).json(idList);
  } catch (error) {
    console.log("Error: " + error);
    res.status(400).send(error);
  }
});

portadaRouter.get('/banner/listar', async (req, res) => {
  try {
    const dato = await Banner.findAll();
    res.status(200).send(dato);
  } catch (error) {
    console.log("Error: " + error);
    res.status(400).send(error);
  }
});

portadaRouter.post('/banner/agregar', async (req, res) => {
  try {
    const add = await Banner.create(req.body);
    res.status(200).json(add);
  } catch (err) {
    res.status(400).json({ error: "Error:" + err });
  }
});

portadaRouter.put('/banner/editar', async (req, res) => {
  try {
    await Banner.update(req.body, {
      where: {
        id: req.body.id
      }
    });
    res.status(200).json(Banner);
  } catch (err) {
    console.log("Error: " + err);
    res.status(400).end(err);
  }
});

portadaRouter.delete('/banner/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const dato = await Banner.destroy({
      where: {
        id: id
      }
    });
    res.status(200).json({delete:true});
  } catch (err) {
    res.send(err);
  }
});

export default portadaRouter;
