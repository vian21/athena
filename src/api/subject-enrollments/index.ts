import { FastifyInstance } from "fastify";
import db from "@api/plugins/db";
import logger from "@api/plugins/logger";

import {
    IParamsIdSchema,
    IParamsId,
    subjectEnrollmentSchema,
    SubjectEnrollment,
} from "@api/plugins/interfaces";

import { getSubjectEnrollments, getSubjectEnrollment } from "./get";

import deleteSubjectEnrollment from "./delete";
import newsubjectEnrollments from "./insert";
import updateSubjectEnrollment from "./update";

export default function subjectEnrollments(
    server: FastifyInstance,
    _opts: object,
    done: any
) {
    server.get("/", async () => {
        return await getSubjectEnrollments(db, logger);
    });

    server.get<{ Params: IParamsId }>("/:id", async (req) => {
        try {
            const subjectId = IParamsIdSchema.parse(req.params).id;

            return await getSubjectEnrollment(subjectId, db, logger);
        } catch (error: any) {
            return { error: error.flatten() };
        }
    });

    server.delete<{ Params: IParamsId }>("/:id", async (req) => {
        try {
            const subjectId = IParamsIdSchema.required({ id: true }).parse(
                req.params
            ).id;

            return await deleteSubjectEnrollment(subjectId, db, logger);
        } catch (error: any) {
            return { error: error.flatten() };
        }
    });

    server.patch<{ Params: IParamsId; Body: SubjectEnrollment }>(
        "/:id",
        async (req) => {
            try {
                const subjectId = IParamsIdSchema.required({ id: true }).parse(
                    req.params
                ).id;
                const newData = subjectEnrollmentSchema.parse(req.body);

                return await updateSubjectEnrollment(
                    subjectId,
                    newData,
                    db,
                    logger
                );
            } catch (error: any) {
                return { error: error.flatten() };
            }
        }
    );

    server.post<{ Params: IParamsId; Body: SubjectEnrollment }>(
        "/",
        async (req) => {
            try {
                const newData = subjectEnrollmentSchema
                    .omit({ id: true })
                    .required({
                        subject_id: true,
                        student_id: true,
                        academic_period_id: true,
                    })
                    .parse(req.body);

                return await newsubjectEnrollments(newData, db, logger);
            } catch (error: any) {
                return { error: error.flatten() };
            }
        }
    );

    done();
}
