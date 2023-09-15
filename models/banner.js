import db from "../dbConfig/dbConfig.js";
import { DataTypes } from "sequelize";

const Banner = db.define(
  "Banner",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    banner: {
      type: DataTypes.TEXT('long'),
      allowNull: true,
    },
  }
);

export default Banner;
