import { FastifyInstance } from "fastify";

import db from "@api/plugins/db";
import logger from "@api/plugins/logger";

import { IParamsId, subjectSchema, Subject } from "@api/plugins/interfaces";
import { getSubjects, getSubject } from "./get";
import updateSubject from "./update";
import deleteSubject from "./delete";
import insertSubject from "./insert";

const errorMessage = { error: "Invalid subject id" };

export default function subjects(
    server: FastifyInstance,
    _opts: object,
    done: any
) {
    server.get("/", async () => {

        return await getSubjects(db, logger);
    });

    server.get<{ Params: IParamsId }>("/:id", async (req) => {
        const subjectId = Number(req.params.id);
        if (isNaN(subjectId)) return errorMessage

        return await getSubject(subjectId, db, logger);
    });

    server.patch<{ Params: IParamsId, Body: Subject }>("/:id", async (req) => {
        const subjectId = Number(req.params.id);

        if (isNaN(subjectId)) return errorMessage

        try {
            //parse the body to make sure it matches the schema
            const newData = subjectSchema.parse(req.body);

            return await updateSubject(subjectId, newData, db, logger);
        } catch (error: any) {
            return { error: error.flatten() }
        }

    });

    server.post<{ Params: IParamsId, Body: Subject }>("/", async (req) => {

        try {
            const newData = subjectSchema.required({
                school_id: true,
                teacher_id: true,
                name: true,
                subject_code: true,
            }).parse(req.body);

            return await insertSubject(newData, db, logger)
        } catch (error: any) {
            return { error: error.flatten() }
        }
    })

    server.delete<{ Params: IParamsId }>("/:id", async (req) => {
        const subjectId = Number(req.params.id)

        if (isNaN(subjectId)) return errorMessage

        return await deleteSubject(subjectId, db, logger)
    })

    done();
}

