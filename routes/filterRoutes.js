import { Router } from "express";
import Filter from "../models/filter.js"; 

const filtroRouter = Router();

filtroRouter.get('/filtros/id/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const dato = await Filter.findAll({
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
    const dato = await Filter.findAll();
    res.status(200).send(dato);
  } catch (error) {
    console.log("Error: " + error);
    res.status(400).send(error);
  }
});

filtroRouter.post('/filtros/agregar', async (req, res) => {
  try {
    const add = await Filter.create(req.body);
    res.status(200).json(add);
  } catch (err) {
    console.log("Error: " + err);
    res.status(400).json({ error: "Error:" + err });
  }
});

filtroRouter.put('/filtros/editar', async (req, res) => {
  try {
    await Filter.update(req.body, {
      where: {
        id: req.body.id
      }
    });
    res.status(200).json(Filter);
  } catch (err) {
    console.log("Error: " + err);
    res.status(400).end(err);
  }
});

filtroRouter.delete('/filtros/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const dato = await Filter.destroy({
      where: {
        id: id
      }
    });
    res.status(200).json({delete:true});
  } catch (err) {
    res.send(err);
  }
}); 

export default filtroRouter;
 