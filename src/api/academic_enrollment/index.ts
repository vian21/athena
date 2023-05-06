import { FastifyInstance } from "fastify";

import db from "@api/plugins/db";
import logger from "@api/plugins/logger";

import {
  IParamsId,
  IParamsIdSchema,
  academicEnrollmentSchema,
  AcademicPeriod,
  academicEnrollmentSelect,
} from "@api/plugins/interfaces";

import { getUnique, getMany, deleteRows, updateRows, insertRows } from "@api/lib";

export default function academicEnrollments(
  server: FastifyInstance,
  _opts: object,
  done: any
) {
  server.get("/", async () => {
    return await getMany(academicEnrollmentSelect, db.academic_enrollments, logger);
  });

  server.get<{ Params: IParamsId }>("/:id", async (req) => {
    try {
      const enrollmentId = IParamsIdSchema.parse(req.params).id;

      return await getUnique(enrollmentId, academicEnrollmentSelect, db.academic_enrollments, logger);
    } catch (error: any) {
      return { error: error.flatten() };
    }
  });

  server.delete<{ Params: IParamsId }>("/:id", async (req) => {
    try {
      const enrollmentId = IParamsIdSchema.parse(req.params).id;

      return await deleteRows(enrollmentId, db.academic_enrollments, logger);
    } catch (error: any) {
      return { error: error.flatten() };
    }
  });

  server.patch<{ Params: IParamsId; Body: AcademicPeriod }>(
    "/:id",
    async (req) => {
      try {
        const enrollmentId = IParamsIdSchema.parse(req.params).id;
        const newData = academicEnrollmentSchema
          .omit({ id: true })
          .parse(req.body);

        return await updateRows(
          enrollmentId,
          newData,
          db.academic_enrollments,
          logger
        );
      } catch (error: any) {
        return { error: error.flatten() };
      }
    }
  );

  server.post<{ Params: IParamsId; Body: AcademicPeriod }>(
    "/",
    async (req) => {
      try {
        const newData = academicEnrollmentSchema
          .omit({ id: true })
          .required({
            student_id: true,
            academic_period_id: true,
            grade: true,
          })
          .parse(req.body);

        return await insertRows(newData, db.academic_enrollments, logger);
      } catch (error: any) {
        return { error: error.flatten() };
      }
    }
  );

  done();
}
