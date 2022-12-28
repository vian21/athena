import { FastifyInstance } from "fastify";

import db from "@api/plugins/db";
import logger from "@api/plugins/logger";

import { IParamsId, IParamsIdSchema, academicEnrollmentSchema, AcademicPeriod, assessmentSchema } from "@api/plugins/interfaces";

import { getAcademicEnrollments, getAcademicEnrollment } from "./get";
import updateAcademicEnrollment from "./update";
import deleteAcademicEnrollment from "./delete";
import newAcademicEnrollment from "./insert";

export default function academicEnrollments(
    server: FastifyInstance,
    _opts: object,
    done: any
) {
    server.get("/", async () => {

        return await getAcademicEnrollments(db, logger);
    });

    server.get<{ Params: IParamsId }>("/:id", async (req) => {
        try {
            const enrollmentId = IParamsIdSchema.parse(req.params).id;

            return await getAcademicEnrollment(enrollmentId, db, logger);

        } catch (error: any) {
            return { error: error.flatten() }
        }
    });

    server.delete<{ Params: IParamsId }>("/:id", async (req) => {
        try {
            const enrollmentId = IParamsIdSchema.parse(req.params).id;

            return await deleteAcademicEnrollment(enrollmentId, db, logger);

        } catch (error: any) {
            return { error: error.flatten() }
        }
    })

    server.patch<{ Params: IParamsId, Body: AcademicPeriod }>("/:id", async (req) => {
        try {
            const enrollmentId = IParamsIdSchema.parse(req.params).id;
            const newData = assessmentSchema.omit({ id: true }).parse(req.body);

            return await updateAcademicEnrollment(enrollmentId, newData, db, logger);

        } catch (error: any) {
            return { error: error.flatten() }
        }
    });

    server.post<{ Params: IParamsId, Body: AcademicPeriod }>("/", async (req) => {
        try {
            const newData = assessmentSchema.omit({ id: true }).required({
                subject_id: true,
                type: true
            }).parse(req.body);

            return await newAcademicEnrollment(newData, db, logger);

        } catch (error: any) {
            return { error: error.flatten() }
        }
    })

    done();
}
