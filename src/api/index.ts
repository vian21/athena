import users from "@api/users";
import db from "@api/plugins/db";

export default function api(server, opts: any, done: any) {
    server.get("/", async (req, res) => {
        const [result] = await db
            .query("SELECT * FROM students")
            .catch((): any => {
                res.send("Hello");
            });
        return result;
    });

    server.register(users, { prefix: "/users" });

    done();
}
