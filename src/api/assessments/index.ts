import { FastifyInstance } from "fastify";

import db from "@api/plugins/db";
import logger from "@api/plugins/logger";

import {
    IParamsId,
    IParamsIdSchema,
    Assessment,
    assessmentSchema,
} from "@api/plugins/interfaces";

import { getAssessments, getAssessment } from "./get";
import { updateAssessment } from "./update";
import insertAssessment from "./insert";
import deleteAssessment from "./delete";

export default function assessments(
    server: FastifyInstance,
    _opts: object,
    done: any
) {
    server.get("/", async () => {
        return await getAssessments(db, logger);
    });

    server.get<{ Params: IParamsId }>("/:id", async (req) => {
        try {
            const id = IParamsIdSchema.parse(req.params).id;
            return await getAssessment(id, db, logger);
        } catch (error: any) {
            return { error: error.flatten() };
        }
    });

    server.patch<{ Params: IParamsId; Body: Assessment }>(
        "/:id",
        async (req) => {
            try {
                const assessmentId = IParamsIdSchema.parse(req.params).id;
                const newData = assessmentSchema
                    .omit({ id: true })
                    .parse(req.body);

                return await updateAssessment(
                    assessmentId,
                    newData,
                    db,
                    logger
                );
            } catch (error: any) {
                return { error: error.flatten() };
            }
        }
    );

    server.post<{ Params: IParamsId; Body: Assessment }>("/", async (req) => {
        try {
            const newData = assessmentSchema
                .omit({ id: true })
                .required({
                    subject_id: true,
                    type: true,
                })
                .parse(req.body);

            return await insertAssessment(newData, db, logger);
        } catch (error: any) {
            return { error: error.flatten() };
        }
    });

    server.delete<{ Params: IParamsId }>("/:id", async (req) => {
        try {
            const assessmentId = IParamsIdSchema.parse(req.params).id;

            return await deleteAssessment(assessmentId, db, logger);
        } catch (error: any) {
            return { error: error.flatten() };
        }
    });

    done();
}
