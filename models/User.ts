import { DataTypes, Model } from "sequelize";
import sequelize from "../lib/sequelize";

class User extends Model {
  declare id: number;
  declare name: string;
  declare email: string;
  declare password: string;
  declare role: "USER" | "ADMIN";
}

User.init(
  {
    name: DataTypes.STRING,
    email: { type: DataTypes.STRING, unique: true },
    password: DataTypes.STRING,
    role: {
      type: DataTypes.ENUM("USER", "ADMIN"),
      defaultValue: "USER"
    }
  },
  { sequelize, modelName: "User" }
);

export default User;
