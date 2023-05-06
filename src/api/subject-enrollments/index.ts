import { FastifyInstance } from "fastify";
import db from "@api/plugins/db";
import logger from "@api/plugins/logger";

import {
  IParamsIdSchema,
  IParamsId,
  subjectEnrollmentSchema,
  SubjectEnrollment,
  subjectEnrollmentSelect,
} from "@api/plugins/interfaces";

import { getUnique, getMany, deleteRows, updateRows, insertRows } from "@api/lib";

export default function subjectEnrollments(
  server: FastifyInstance,
  _opts: object,
  done: any
) {
  server.get("/", async () => {
    return await getMany(subjectEnrollmentSelect, db.subject_enrollments, logger);
  });

  server.get<{ Params: IParamsId }>("/:id", async (req) => {
    try {
      const subjectId = IParamsIdSchema.parse(req.params).id;

      return await getUnique(subjectId, subjectEnrollmentSelect, db.subject_enrollments, logger);
    } catch (error: any) {
      return { error: error.flatten() };
    }
  });

  server.delete<{ Params: IParamsId }>("/:id", async (req) => {
    try {
      const subjectId = IParamsIdSchema.required({ id: true }).parse(
        req.params
      ).id;

      return await deleteRows(subjectId, db.subject_enrollments, logger);
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

        return await updateRows(
          subjectId,
          newData,
          db.subject_enrollments,
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

        return await insertRows(newData, db.subject_enrollments, logger);
      } catch (error: any) {
        return { error: error.flatten() };
      }
    }
  );

  done();
}
