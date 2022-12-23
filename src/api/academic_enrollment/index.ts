import db from "@api/plugins/db";
import logger from "@api/plugins/logger";

import { getAcademicEnrollments, getAcademicEnrollment } from "./get";
import { updateAcademicEnrollment } from "./update";

import { deleteAcademicEnrollment } from "./delete";

import newAcademicEnrollment from "./insert";

import { FastifyInstance } from "fastify";

interface EnrollmentId {
    id: number;
}

export default function academicEnrollments(
    server: FastifyInstance,
    _opts: object,
    done: any
) {
    server.get("/", async () => {

        return await getAcademicEnrollments(db, logger);
    });

    server.get<{ Params: EnrollmentId }>("/:id", async (req) => {
        const enrollmentId = Number(req.params.id);
        if (isNaN(enrollmentId)) return {}

        return await getAcademicEnrollment(enrollmentId, db, logger);
    });

    server.delete("/:id", async (req) => {
        const enrollmentId = Number(req.params.id);
        if (isNaN(enrollmentId)) return {}

        return await deleteAcademicEnrollment(enrollmentId, db, logger);
    })

    server.patch("/:id", async (req, res) => {

        const enrollmentId = Number(req.params.id);
        const newData = req.body;
        if (isNaN(enrollmentId)) return {}
        return await updateAcademicEnrollment(enrollmentId, newData, db, logger);

    });

    server.post("/", async (req) => {

        const newData = req.body;

        return await newAcademicEnrollment(newData, db, logger)
    })



    done();
}
