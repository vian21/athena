import { FastifyInstance } from "fastify";

import db from "@api/plugins/db";
import logger from "@api/plugins/logger";

import {
  IParamsId,
  IParamsIdSchema,
  disciplineSchema,
  Discipline,
  disciplineSelect,
} from "@api/plugins/interfaces";

import { getUnique, getMany, deleteRows, updateRows, insertRows } from "@api/lib";

export default function discipline(
  server: FastifyInstance,
  _opts: object,
  done: any
) {
  server.get("/", async () => {
    return await getMany(disciplineSelect, db.discipline, logger);
  });

  server.get<{ Params: IParamsId }>("/:id", async (req) => {
    try {
      const id = IParamsIdSchema.parse(req.params).id;

      return await getUnique(id, disciplineSelect, db.discipline, logger);
    } catch (error: any) {
      return { error: error.flatten() };
    }
  });

  server.patch<{ Params: IParamsId }>("/:id", async (req) => {
    try {
      const id = IParamsIdSchema.parse(req.params).id;
      const newData = disciplineSchema.omit({ id: true }).parse(req.body);

      return await updateRows(id, newData, db.discipline, logger);
    } catch (error: any) {
      return { error: error.flatten() };
    }
  });

  server.delete<{ Params: IParamsId }>("/:id", async (req) => {
    try {
      const id = IParamsIdSchema.parse(req.params).id;

      return await deleteRows(id, db.discipline, logger);
    } catch (error: any) {
      return { error: error.flatten() };
    }
  });

  server.post<{ Params: IParamsId; Body: Discipline }>("/", async (req) => {
    try {
      const newData = disciplineSchema
        .omit({ id: true })
        .required({
          student_id: true,
          academic_period_id: true,
          points: true,
          infraction: true,
          invigilator: true,
        })
        .parse(req.body);

      return await insertRows(newData, db.discipline, logger);
    } catch (error: any) {
      return { error: error.flatten() };
    }
  });

  done();
}
