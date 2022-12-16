import db from "@api/plugins/db";
import logger from "@api/plugins/logger";

import { getSubjects, getSubject } from "./get";
import { updateSubject } from "./update";

import { FastifyInstance } from "fastify";
import deleteSubject from "./delete";
import insertSubject from "./insert";

interface SubjectId {
    id: number;
}

export default function subjects(
    server: FastifyInstance,
    _opts: object,
    done: any
) {
    server.get("/", async (_req, res) => {

        return await getSubjects(db, logger);
    });

    server.get<{ Params: SubjectId }>("/:id", async (req, res) => {
        const subjectId = Number(req.params.id);

        return await getSubject(subjectId, db, logger);
    });

    server.patch("/:id", async (req, res) => {
        //get the params
        const subjectId = Number(req.params.id);
        const newData = req.body;

        return await updateSubject(subjectId, newData, db, logger);
    });

    server.post("/", async (req) => {
        //get params
        const newData = req.body;

        return await insertSubject(newData, db, logger)
    })

    server.delete("/:id", async (req, res) => {
        // get params
        const subjectId = Number(req.params.id)

        return await deleteSubject(subjectId, db, logger)
    })

    done();
}

