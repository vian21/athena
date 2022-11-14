import "module-alias/register";
import { fastify } from "fastify";
import * as dotenv from "dotenv";

import api from "@api";

dotenv.config();
const PORT = Number(process.env.PORT); //get server port number

/********************
 * Fastify plugins
 * ******************
 */
const server = fastify({ logger: false });
server.register(import("@fastify/compress"), { global: true });

server.get("/", async (req, res) => {
    res.status(200).send("It works");
});

/********************
 * Application Routes
 * ******************
 */
server.register(api, { prefix: "/api" });

// Run server
server.listen({ port: PORT }, (err, address) => {
    if (err != null) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});
