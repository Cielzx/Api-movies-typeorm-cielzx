import "dotenv/config";
import { DataSource, DataSourceOptions } from "typeorm";
import path from "path";

const dataSourceConfig = (): DataSourceOptions => {
  const entPath: string = path.join(__dirname, "./entities/**.{ts,js}");
  const migPath: string = path.join(__dirname, "./migrations/**.{ts,js}");

  const baseUrl: string | undefined = process.env.DB_URL;

  const nodeEnv: string | undefined = process.env.NODE_ENV;

  if (!baseUrl) {
    throw new Error("Database_URL not exists");
  }

  if (nodeEnv === "teste") {
    return {
      type: "sqlite",
      database: "memory",
      synchronize: true,
      entities: [entPath],
    };
  }

  return {
    type: "postgres",
    url: baseUrl,
    synchronize: false,
    logging: true,
    migrations: [migPath],
    entities: [entPath],
  };
};

const AppDataSource = new DataSource(dataSourceConfig());

export { AppDataSource };
