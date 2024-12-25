import { config } from "dotenv";
import { bot } from "./bot.js";
import express from "express";
config();

const app = express();
bot.start();
const PORT = process.env.PORT || 4000; 
app.listen(PORT, () => {
  console.log(`Server running: ${PORT}`);
});
