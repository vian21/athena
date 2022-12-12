import users from "@api/users";
// import { logger } from "@api/plugins/logger";
import { FastifyInstance } from "fastify";

export default function api(server: FastifyInstance, opts: any, done: any) {
    server.get("/", async () => {
        return "Welcome to the api";
    });

    server.register(users, { prefix: "/users" });

    done();
}
