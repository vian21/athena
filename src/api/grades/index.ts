import { FastifyInstance } from "fastify";

import db from "@api/plugins/db";
import logger from "@api/plugins/logger";

import {
  IParamsId,
  IParamsIdSchema,
  gradeSchema,
  Grade,
  gradeSelect,
} from "@api/plugins/interfaces";

import { getUnique, getMany, deleteRows, updateRows, insertRows } from "@api/lib";

export default function Grades(
  server: FastifyInstance,
  _opts: object,
  done: any
) {
  server.get("/", async () => {
    return await getMany(gradeSelect, db.grades, logger);
  });

  server.get<{ Params: IParamsId }>("/:id", async (req) => {
    try {
      const gradeId = IParamsIdSchema.parse(req.params).id;

      return await getUnique(gradeId, gradeSelect, db.grades, logger);
    } catch (error: any) {
      return { error: error.flatten() };
    }
  });

  server.delete<{ Params: IParamsId }>("/:id", async (req) => {
    try {
      const gradeId = IParamsIdSchema.parse(req.params).id;

      return await deleteRows(gradeId, db.grades, logger);
    } catch (error: any) {
      return { error: error.flatten() };
    }
  });

  server.patch<{ Params: IParamsId; Body: Grade }>("/:id", async (req) => {
    try {
      const gradeId = IParamsIdSchema.parse(req.params).id;
      const newData = gradeSchema.omit({ id: true }).parse(req.body);

      return await updateRows(gradeId, newData, db.grades, logger);
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

      return await insertRows(newData, db.grades, logger);
    } catch (error: any) {
      return { error: error.flatten() };
    }
  });

  done();
}
