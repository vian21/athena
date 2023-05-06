import { FastifyInstance } from "fastify";

import db from "@api/plugins/db";
import logger from "@api/plugins/logger";

import {
  IParamsId,
  IParamsIdSchema,
  markSchema,
  Mark,
  markSelect,
} from "@api/plugins/interfaces";

import { getUnique, getMany, deleteRows, updateRows, insertRows } from "@api/lib";
export default function marks(
  server: FastifyInstance,
  _opts: object,
  done: any
) {
  server.get("/", async () => {
    return await getMany(markSelect, db.marks, logger);
  });

  server.get<{ Params: IParamsId }>("/:id", async (req) => {
    try {
      const markId = IParamsIdSchema.parse(req.params).id;

      return await getUnique(markId, markSelect, db.marks, logger);
    } catch (error: any) {
      return { error: error.flatten() };
    }
  });

  server.delete<{ Params: IParamsId }>("/:id", async (req) => {
    try {
      const markId = IParamsIdSchema.parse(req.params).id;

      return await deleteRows(markId, db.marks, logger);
    } catch (error: any) {
      return { error: error.flatten() };
    }
  });

  server.patch<{ Params: IParamsId; Body: Mark }>("/:id", async (req) => {
    try {
      const markId = IParamsIdSchema.parse(req.params).id;
      const newData = markSchema.omit({ id: true }).parse(req.body);

      return await updateRows(markId, newData, db.marks, logger);
    } catch (error: any) {
      return { error: error.flatten() };
    }
  });
  server.post<{ Params: IParamsId; Body: Mark }>("/", async (req) => {
    try {
      const newData = markSchema.omit({ id: true }).parse(req.body);

      return await insertRows(newData, db.marks, logger);
    } catch (error: any) {
      return { error: error.flatten() };
    }
  });

  done();
}
