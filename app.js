const express = require("express");
const app = express();
const bookroute = require("./routes/bookroutes");
const cors = require('cors');
const PORT = process.env.PORT || 8000;
require('dotenv').config();
require("./connection/conncetion");

app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5000', 'https://chimerical-puffpuff-55489b.netlify.app'],
  credentials: true,
}));

app.use(express.json());
app.use("/api/v1/", bookroute);

app.listen(PORT, () => {
  console.log("CONNECTED at", PORT);
});
