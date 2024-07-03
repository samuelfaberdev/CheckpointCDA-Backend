import { DataSource } from "typeorm";
import { Continent } from "./entities/Continent";
import { Country } from "./entities/Country";

export const dataSource = new DataSource({
  type: "sqlite",
  database: "./countries.sqlite",
  synchronize: true,
  entities: [Country, Continent],
});
