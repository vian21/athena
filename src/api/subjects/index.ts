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
    server.get("/", async () => {

        return await getSubjects(db, logger);
    });

    server.get<{ Params: SubjectId }>("/:id", async (req) => {
        const subjectId = Number(req.params.id);
        if (isNaN(subjectId)) return {}

        return await getSubject(subjectId, db, logger);
    });

    server.patch("/:id", async (req) => {
        const subjectId = Number(req.params.id);
        const newData = req.body;
        if (isNaN(subjectId)) return {}

        return await updateSubject(subjectId, newData, db, logger);
    });

    server.post("/", async (req) => {
        const newData = req.body;

        return await insertSubject(newData, db, logger)
    })

    server.delete("/:id", async (req) => {
        const subjectId = Number(req.params.id)
        if (isNaN(subjectId)) return {}
        return await deleteSubject(subjectId, db, logger)
    })

    done();
}

