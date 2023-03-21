import db from "../dbConfig/dbConfig.js"
import DataTypes from "sequelize";

  const User = db.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    }
  );

  export default User;