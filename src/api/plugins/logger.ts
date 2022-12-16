import fastify from "fastify";

const app = fastify({ logger: true });

class logger {
    log(message: string): void {
        app.log.info(message); //Use pino logger
    }
}

export default new logger();
