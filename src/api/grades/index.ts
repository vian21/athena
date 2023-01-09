import { FastifyInstance } from "fastify";

import db from "@api/plugins/db";
import logger from "@api/plugins/logger";

import {
    IParamsId,
    IParamsIdSchema,
    gradeSchema,
    Grade,
} from "@api/plugins/interfaces";

import { getGrades, getGrade } from "./get";
import { updateGrade } from "./update";
import newGrade from "./insert";
import deleteGrades from "./delete";

export default function Grades(
    server: FastifyInstance,
    _opts: object,
    done: any
) {
    server.get("/", async () => {
        return await getGrades(db, logger);
    });

    server.get<{ Params: IParamsId }>("/:id", async (req) => {
        try {
            const gradeId = IParamsIdSchema.parse(req.params).id;

            return await getGrade(gradeId, db, logger);
        } catch (error: any) {
            return { error: error.flatten() };
        }
    });

    server.delete<{ Params: IParamsId }>("/:id", async (req) => {
        try {
            const gradeId = IParamsIdSchema.parse(req.params).id;

            return await deleteGrades(gradeId, db, logger);
        } catch (error: any) {
            return { error: error.flatten() };
        }
    });

    server.patch<{ Params: IParamsId; Body: Grade }>("/:id", async (req) => {
        try {
            const gradeId = IParamsIdSchema.parse(req.params).id;
            const newData = gradeSchema.omit({ id: true }).parse(req.body);

            return await updateGrade(gradeId, newData, db, logger);
        } catch (error: any) {
            return { error: error.flatten() };
        }
    });

    server.post<{ Params: IParamsId; Body: Grade }>("/", async (req) => {
        try {
            const newData = gradeSchema
                .omit({ id: true })
                .required({
                    school_id: true,
                    academic_period_id: true,
                })
                .parse(req.body);

            return await newGrade(newData, db, logger);
        } catch (error: any) {
            return { error: error.flatten() };
        }
    });

    done();
}
