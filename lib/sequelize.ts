import { Sequelize } from "sequelize";

const sequelize = new Sequelize(process.env.DATABASE_URL as string, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  logging: false
});

let isInitialized = false;

export async function initDB() {
  if (isInitialized) return;

  await sequelize.sync();
  isInitialized = true;
}

export default sequelize;
