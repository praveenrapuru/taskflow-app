import { DataTypes, Model } from "sequelize";
import sequelize from "../lib/sequelize";
import User from "./User";

class Task extends Model {
  declare id: number;
  declare title: string;
  declare status: string;
  declare userId: number;
}

Task.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("TODO", "IN_PROGRESS", "DONE"),
      defaultValue: "TODO",
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { sequelize, modelName: "Task" }
);

Task.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Task, { foreignKey: "userId" });

export default Task;
