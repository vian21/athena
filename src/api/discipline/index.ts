import { FastifyInstance } from "fastify";

import db from "@api/plugins/db";
import logger from "@api/plugins/logger";

import {
    IParamsId,
    IParamsIdSchema,
    disciplineSchema,
    Discipline,
} from "@api/plugins/interfaces";

import { getDisciplineRecord, getDisciplineRecords } from "./get";
import updateDiscipline from "./update";
import deleteDiscipline from "./delete";
import newDiscipline from "@api/accounting/insert";

export default function discipline(
    server: FastifyInstance,
    _opts: object,
    done: any
) {
    server.get("/", async () => {
        return await getDisciplineRecords(db, logger);
    });

    server.get<{ Params: IParamsId }>("/:id", async (req) => {
        try {
            const id = IParamsIdSchema.parse(req.params).id;

            return await getDisciplineRecord(id, db, logger);
        } catch (error: any) {
            return { error: error.flatten() };
        }
    });

    server.patch<{ Params: IParamsId }>("/:id", async (req) => {
        try {
            const id = IParamsIdSchema.parse(req.params).id;
            const newData = disciplineSchema.omit({ id: true }).parse(req.body);

            return await updateDiscipline(id, newData, db, logger);
        } catch (error: any) {
            return { error: error.flatten() };
        }
    });

    server.delete<{ Params: IParamsId }>("/:id", async (req) => {
        try {
            const id = IParamsIdSchema.parse(req.params).id;

            return await deleteDiscipline(id, db, logger);
        } catch (error: any) {
            return { error: error.flatten() };
        }
    });

    server.post<{ Params: IParamsId; Body: Discipline }>("/", async (req) => {
        try {
            const newData = disciplineSchema
                .omit({ id: true })
                .required({
                    student_id: true,
                    academic_period_id: true,
                    points: true,
                    infraction: true,
                    invigilator: true,
                })
                .parse(req.body);

            return await newDiscipline(newData, db, logger);
        } catch (error: any) {
            return { error: error.flatten() };
        }
    });

    done();
}
