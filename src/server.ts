import app from "./app";
import { AppDataSource } from "./data-source";

AppDataSource.initialize()
  .then(() => {
    console.log("Database is working");

    app.listen(3000, () => {
      console.log("Server Started");
    });
  })
  .catch((error) => {
    console.log(error);
  });
