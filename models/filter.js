import db from "../dbConfig/dbConfig.js";
import { DataTypes } from "sequelize";

const Filter = db.define(
  "filtro",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imagen: {
      type: DataTypes.TEXT('long'),
      allowNull: true,
    },
    categoria: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  }
);

export default Filter;
