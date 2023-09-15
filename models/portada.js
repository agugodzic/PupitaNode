import db from "../dbConfig/dbConfig.js";
import { DataTypes } from "sequelize";

const Portada = db.define(
  "portada",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    portada: {
      type: DataTypes.TEXT('long'),
      allowNull: true,
    },
  }
);

export default Portada;
