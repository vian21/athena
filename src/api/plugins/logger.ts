import fastify from "fastify";

const app = fastify({ logger: true });

class logger {
    log(message: string): void {
        app.log.info(message);
    }
}

export default new logger();
