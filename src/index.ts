import server from "./app"
import * as dotenv from "dotenv";

dotenv.config();

const PORT = Number(process.env.PORT); //get server port number

// Run server
server.listen({ port: PORT }, (err, address) => {
    if (err != null) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});
