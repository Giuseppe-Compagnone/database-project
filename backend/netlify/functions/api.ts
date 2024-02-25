import express, { Router } from "express";
import serverless from "serverless-http";
import http from "http";

const api = express();

const router = Router();
router.get("/hello", (req, res) => res.send("Hello World!"));

api.use("/api/", router);

http
  .createServer((req, res) => {
    if (req.url === "/") {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end("Welcome to the homepage!");
    }
  })
  .listen(8081, "localhost");

export const handler = serverless(api);
