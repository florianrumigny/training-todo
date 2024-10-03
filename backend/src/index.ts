import app from "./app";
require("dotenv").config();
import { dataSource } from "./config/db";

const port = process.env.PORT || 3000;

app.listen(port, async () => {
  await dataSource.initialize();
  console.log(`Server is running at http://localhost:${port}`);
});
