import db from "@api/plugins/db";
import logger from "@api/plugins/logger";

import { getSubjectEnrollments, getSubjectEnrollment } from "./get";
import { updatesubjectEnrollments } from "./update";

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
    server.get("/", async (_req, res) => {

        res.send(await getSubjectEnrollments(db, logger));
    });

    server.get<{ Params: subject_id }>("/:id", async (req, res) => {
        const subject_id = Number(req.params.id);

        res.send(await getSubjectEnrollment(subject_id, db, logger));
    });

    server.delete("/:id", async (req, res) => {
        const subject_id = Number(req.params.id);

        return await deleteSubjectEnrollment(subject_id, db, logger);
    });

    server.patch("/:id/:name", async (req, res) => {
        //get the params
        const subject_id = Number(req.params.id);
        const body = req.body;

    });

    server.post("/", async (req, res) => {
        //get the params
        const newData = req.body;

        return await newsubjectEnrollments(newData, db, logger);

    });

    done();
}