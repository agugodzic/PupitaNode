import { Router } from "express";
import Portada from "../models/portada.js"; // Importa el modelo "Portada" adecuadamente

const portadaRouter = Router();

portadaRouter.get('/portada/id/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const dato = await Portada.findAll({
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

portadaRouter.get('/portada/listar', async (req, res) => {
  try {
    const dato = await Portada.findAll();
    res.status(200).send(dato);
  } catch (error) {
    console.log("Error: " + error);
    res.status(400).send(error);
  }
});

portadaRouter.post('/portada/agregar', async (req, res) => {
  try {
    const add = await Portada.create(req.body);
    res.status(200).json(add);
  } catch (err) {
    res.status(400).json({ error: "Error:" + err });
  }
});

portadaRouter.put('/portada/editar', async (req, res) => {
  try {
    await Portada.update(req.body, {
      where: {
        id: req.body.id
      }
    });
    res.status(200).json(Portada);
  } catch (err) {
    console.log("Error: " + err);
    res.status(400).end(err);
  }
});

portadaRouter.delete('/portada/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const dato = await Portada.destroy({
      where: {
        id: id
      }
    });
    res.send("Elemento eliminado:" + dato);
  } catch (err) {
    res.send(err);
  }
});

export default portadaRouter;
