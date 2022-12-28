import { FastifyInstance } from "fastify";
import db from "@api/plugins/db";
import logger from "@api/plugins/logger";

import { IParamsId, userSchema, User } from "@api/plugins/interfaces";

import { getUsers, getUser } from "./get";
import newUser from "./insert";
import deleteUser from "./deleteUser";
import updateUser from "./update";

export default function users(
    server: FastifyInstance,
    _opts: object,
    done: any
) {
    server.get("/", async () => {

        return await getUsers(db, logger);
    });

    server.get<{ Params: IParamsId }>("/:id", async (req) => {
        try {
            const userId = userSchema.required({ id: true }).parse(req.params.id).id;

            return await getUser(userId, db, logger);
        } catch (error: any) {
            return { error: error.flatten() }
        }

    });

    server.delete<{ Params: IParamsId }>("/:id", async (req) => {

        try {
            const userId = userSchema.required({ id: true }).parse(req.params.id).id;

            return await deleteUser(userId, db, logger);
        } catch (error: any) {
            return { error: error.flatten() }
        }

    })

    server.patch<{ Params: IParamsId, Body: User }>("/:id", async (req) => {
        try {
            const userId = userSchema.required({ id: true }).parse(req.params.id).id;

            const newData = userSchema.omit({ id: true }).parse(req.body);

            return await updateUser(userId, newData, db, logger);
        } catch (error: any) {
            return { error: error.flatten() }
        }
    });

    server.post("/", async (req) => {

        try {
            const newData = userSchema.omit({ id: true }).required({
                first_name: true,
                last_name: true,
                DOB: true,
                gender: true,
                account_type: true
            }).parse(req.body);

            return await newUser(newData, db, logger);
        } catch (error: any) {
            return { error: error.flatten() }
        }
    });

    done();
}

