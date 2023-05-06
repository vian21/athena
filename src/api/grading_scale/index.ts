import { FastifyInstance } from "fastify";

import db from "@api/plugins/db";
import logger from "@api/plugins/logger";

import {
  IParamsId,
  IParamsIdSchema,
  gradingScaleSchema,
  GradingScale,
  gradingScaleSelect,
} from "@api/plugins/interfaces";

import { getUnique, getMany, deleteRows, updateRows, insertRows } from "@api/lib";
export default function gradingScale(
  server: FastifyInstance,
  _opts: object,
  done: any
) {
  server.get("/", async () => {
    return await getMany(gradingScaleSelect, db.grading_scales, logger);
  });

  server.get<{ Params: IParamsId }>("/:id", async (req) => {
    try {
      const id = IParamsIdSchema.parse(req.params).id;

      return await getUnique(id, gradingScaleSelect, db.grading_scales, logger);
    } catch (error: any) {
      return { error: error.flatten() };
    }
  });
  server.delete<{ Params: IParamsId }>("/:id", async (req) => {
    try {
      const id = IParamsIdSchema.parse(req.params).id;

      return await deleteRows(id, db.grading_scales, logger);
    } catch (error: any) {
      return { error: error.flatten() };
    }
  });
  server.post<{ Params: IParamsId; Body: GradingScale }>("/", async (req) => {
    try {
      const newData = gradingScaleSchema
        .omit({ id: true })
        .required({
          school_id: true,
          max: true,
          min: true,
          gpa: true,
          grade: true,
        })
        .parse(req.body);

      return await insertRows(newData, db.grading_scales, logger);
    } catch (error: any) {
      return { error: error.flatten() };
    }
  });
  server.patch<{ Params: IParamsId; Body: GradingScale }>(
    "/:id",
    async (req) => {
      try {
        const id = IParamsIdSchema.parse(req.params).id;

        const newData = gradingScaleSchema
          .omit({ id: true })
          .parse(req.body);

        return await updateRows(id, newData, db.grading_scales, logger);
      } catch (error: any) {
        return { error: error.flatten() };
      }
    }
  );
  done();
}
