export default function users(server, opts, done) {
    server.get("/", async (req, res) => {
        res.send("I am a user");
    });

    server.get("/:id", async (req, res) => {
        res.send("I am a user");
    });

    done();
}
