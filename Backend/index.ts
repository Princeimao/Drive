import "dotenv/config";

import { app } from "./app";
import { dbConnection } from "./src/config/db.connection";
import { PORT } from "./src/config/env";

const connection = async () => {
  try {
    await dbConnection();
    app.listen(PORT, () => {
      console.log(`server is running on port: ${PORT}`);
    });
  } catch (error) {
    console.log("something went wrong while connecting to server");
  }
};

connection();
