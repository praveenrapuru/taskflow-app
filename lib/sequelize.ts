import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false
  }
);

let isInitialized = false;

export async function initDB() {
  if (isInitialized) return;

  await sequelize.sync();
  isInitialized = true;
}

export default sequelize;
