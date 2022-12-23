import db from "@api/plugins/db";
import logger from "@api/plugins/logger";

import { getSubjectEnrollments, getSubjectEnrollment } from "./get";

import { FastifyInstance } from "fastify";
import deleteSubjectEnrollment from "./delete";
import newsubjectEnrollments from "./insert";

interface subject_id {
    id: number;
}

export default function subjectEnrollments(
    server: FastifyInstance,
    _opts: object,
    done: any
) {
    server.get("/", async () => {

        return await getSubjectEnrollments(db, logger);
    });

    server.get<{ Params: subject_id }>("/:id", async (req) => {
        const subject_id = Number(req.params.id);
        if (isNaN(subject_id)) return {}

        return await getSubjectEnrollment(subject_id, db, logger);
    });

    server.delete("/:id", async (req) => {
        const subject_id = Number(req.params.id);
        if (isNaN(subject_id)) return {}

        return await deleteSubjectEnrollment(subject_id, db, logger);
    });

    server.patch("/:id", async (req) => {

        const subject_id = Number(req.params.id);
        const body = req.body;
        if (isNaN(subject_id)) return {}

        return await updatesubjectEnrollments(subject_id, newData, db, logger);
    });

    server.post("/", async (req) => {
        //get the params
        const newData = req.body;

        return await newsubjectEnrollments(newData, db, logger);

    });

    done();
}