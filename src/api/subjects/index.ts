import { FastifyInstance } from "fastify";

import db from "@api/plugins/db";
import logger from "@api/plugins/logger";

import { IParamsId, subjectSchema, Subject, subjectSelect } from "@api/plugins/interfaces";

import { getUnique, getMany, deleteRows, updateRows, insertRows } from "@api/lib";

export default function subjects(
  server: FastifyInstance,
  _opts: object,
  done: any
) {
  server.get("/", async () => {
    return await getMany(subjectSelect, db.subjects, logger);
  });

  server.get<{ Params: IParamsId }>("/:id", async (req) => {
    try {
      const subjectId = subjectSchema
        .required({ id: true })
        .parse(req.params).id;

      return await getUnique(subjectId, subjectSelect, db.subjects, logger);
    } catch (error: any) {
      return { error: error.flatten() };
    }
  });

  server.patch<{ Params: IParamsId; Body: Subject }>("/:id", async (req) => {
    try {
      const subjectId = subjectSchema
        .required({ id: true })
        .parse(req.params).id;

      //parse the body to make sure it matches the schema
      const newData = subjectSchema.parse(req.body);

      return await updateRows(subjectId, newData, db.subjects, logger);
    } catch (error: any) {
      return { error: error.flatten() };
    }
  });

  server.post<{ Params: IParamsId; Body: Subject }>("/", async (req) => {
    try {
      const newData = subjectSchema
        .omit({ id: true })
        .required({
          school_id: true,
          teacher_id: true,
          name: true,
          subject_code: true,
        })
        .parse(req.body);

      return await insertRows(newData, db.subjects, logger);
    } catch (error: any) {
      return { error: error.flatten() };
    }
  });

  server.delete<{ Params: IParamsId }>("/:id", async (req) => {
    try {
      const subjectId = subjectSchema
        .required({ id: true })
        .parse(req.params).id;

      return await deleteRows(subjectId, db.subjects, logger);
    } catch (error: any) {
      return { error: error.flatten() };
    }
  });

  done();
}
