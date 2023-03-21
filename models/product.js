import db from "../dbConfig/dbConfig.js"
import DataTypes from "sequelize";

  const Product = db.define(
    "Producto",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      precio: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      categoria: {
        type: DataTypes.STRING,
      },
      marca: {
        type: DataTypes.STRING,
      },
      descripcioncorta: {
        type: DataTypes.STRING,
      },
      descripcion: {
        type: DataTypes.STRING,
      },
      imagen1: {
        type: DataTypes.TEXT('long'),
      },
      imagen2: {
        type: DataTypes.TEXT('long'),
      },
      imagen3: {
        type: DataTypes.TEXT('long'),
      },
      imagen4: {
        type: DataTypes.TEXT('long')
      },
    }
  );

  export default Product;