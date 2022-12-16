import db from "@api/plugins/db";
import logger from "@api/plugins/logger";


import { FastifyInstance } from "fastify";

import { getMark, getMarks } from "./get";
import updateMark from "./update";

import deleteMark from "./delete";

import newMark from "./insert";

interface MarkId {
    id: number;
}

export default function marks(
    server: FastifyInstance,
    _opts: object,
    done: any
) {
    server.get("/", async (_req, res) => {

        return await getMarks(db, logger);
    });

    server.get<{ Params: MarkId }>("/:id", async (req, res) => {
        const markId = Number(req.params.id);

        return await getMark(MarkId, db, logger);
    });

    server.delete("/:id", async (req, res) => {
        const markId = Number(req.params.id);

        return await deleteMark(markId, db, logger);
    })

    server.patch("/:id", async (req, res) => {
        //get the params
        const markId = Number(req.params.id);
        const newData = req.body;

        return await updateMark(markId, newData, db, logger);

    });


    done();
}
