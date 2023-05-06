import { FastifyInstance } from "fastify";

import db from "@api/plugins/db";
import logger from "@api/plugins/logger";

import {
  IParamsId,
  IParamsIdSchema,
  schoolSchema,
  School,
  schoolSelect,
} from "@api/plugins/interfaces";


import { getUnique, getMany, deleteRows, updateRows, insertRows } from "@api/lib";
export default function schools(
  server: FastifyInstance,
  _opts: object,
  done: any
) {
  server.get("/", async () => {
    return await getMany(schoolSelect, db.schools, logger);
  });

  server.get<{ Params: IParamsId }>("/:id", async (req) => {
    try {
      const schoolId = IParamsIdSchema.parse(req.params).id;
      return await getUnique(schoolId, schoolSelect, db.schools, logger);
    } catch (error: any) {
      return { error: error.flatten() };
    }
  });

  server.delete<{ Params: IParamsId }>("/:id", async (req) => {
    try {
      const schoolId = IParamsIdSchema.parse(req.params).id;
      return await deleteRows(schoolId, db.schools, logger);
    } catch (error: any) {
      return { error: error.flatten() };
    }
  });

  server.patch<{ Params: IParamsId; Body: School }>("/:id", async (req) => {
    try {
      const schoolId = IParamsIdSchema.parse(req.params).id;
      const newData = schoolSchema.omit({ id: true }).parse(req.body);

      return await updateRows(schoolId, newData, db.schools, logger);
    } catch (error: any) {
      return { error: error.flatten() };
    }
  });

  server.post<{ Params: IParamsId; Body: School }>("/", async (req) => {
    try {
      const newData = schoolSchema.omit({ id: true }).parse(req.body);

      return await insertRows(newData, db.schools, logger);
    } catch (error: any) {
      return { error: error.flatten() };
    }
  });

  done();
}
