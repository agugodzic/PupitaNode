import { Router } from "express";
import Filtro from "../models/filtro.js"; // Importa el modelo "Filtro" adecuadamente

const filtroRouter = Router();

filtroRouter.get('/filtros/id/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const dato = await Filtro.findAll({
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

filtroRouter.get('/filtros/listar', async (req, res) => {
  try {
    const dato = await Filtro.findAll();
    res.status(200).send(dato);
  } catch (error) {
    console.log("Error: " + error);
    res.status(400).send(error);
  }
});

filtroRouter.post('/filtros/agregar', async (req, res) => {
  try {
    const add = await Filtro.create(req.body);
    res.status(200).json(add);
  } catch (err) {
    res.status(400).json({ error: "Error:" + err });
  }
});

filtroRouter.put('/filtros/editar', async (req, res) => {
  try {
    await Filtro.update(req.body, {
      where: {
        id: req.body.id
      }
    });
    res.status(200).json(Filtro);
  } catch (err) {
    console.log("Error: " + err);
    res.status(400).end(err);
  }
});

filtroRouter.delete('/filtros/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const dato = await Filtro.destroy({
      where: {
        id: id
      }
    });
    res.send("Elemento eliminado:" + dato);
  } catch (err) {
    res.send(err);
  }
});

export default filtroRouter;
