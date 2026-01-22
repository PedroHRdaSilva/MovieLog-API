import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { router } from "./routes";

const server = express();

server.use(express.json());

// apenas para debug (pode tirar depois)
console.log("📦 server.ts carregado");

server.use(router);

export { server };
