import db from "@api/plugins/db";
import logger from "@api/plugins/logger";


import { FastifyInstance } from "fastify";

import { getMark, getMarks } from "./get";
import { updateMark } from "./update";

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
    server.get("/", async () => {

        return await getMarks(db, logger);
    });

    server.get<{ Params: MarkId }>("/:id", async (req) => {
        const markId = Number(req.params.id);
        if (isNaN(markId)) return {}

        return await getMark(markId, db, logger);
    });

    server.delete("/:id", async (req) => {
        const markId = Number(req.params.id);
        if (isNaN(markId)) return {}

        return await deleteMark(markId, db, logger);
    })

    server.patch("/:id", async (req) => {

        const markId = Number(req.params.id);
        const newData = req.body;
        if (isNaN(markId)) return {}

        return await updateMark(markId, newData, db, logger);

    });
    server.post("/", async (req) => {
        const newData = req.body

        return await newMark(newData, db, logger)
    })


    done();
}
