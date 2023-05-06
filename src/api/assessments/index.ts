import { FastifyInstance } from "fastify";

import db from "@api/plugins/db";
import logger from "@api/plugins/logger";

import {
  IParamsId,
  IParamsIdSchema,
  Assessment,
  assessmentSchema,
  assessmentSelect,
} from "@api/plugins/interfaces";

import { getUnique, getMany, deleteRows, updateRows, insertRows } from "@api/lib";

export default function assessments(
  server: FastifyInstance,
  _opts: object,
  done: any
) {
  server.get("/", async () => {
    return await getMany(assessmentSelect, db.assessments, logger);
  });

  server.get<{ Params: IParamsId }>("/:id", async (req) => {
    try {
      const id = IParamsIdSchema.parse(req.params).id;
      return await getUnique(id, assessmentSelect, db.assessments, logger);
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

        return await updateRows(
          assessmentId,
          newData,
          db.assessments,
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

      return await insertRows(newData, db.assessments, logger);
    } catch (error: any) {
      return { error: error.flatten() };
    }
  });

  server.delete<{ Params: IParamsId }>("/:id", async (req) => {
    try {
      const assessmentId = IParamsIdSchema.parse(req.params).id;

      return await deleteRows(assessmentId, db.assessments, logger);
    } catch (error: any) {
      return { error: error.flatten() };
    }
  });

  done();
}
