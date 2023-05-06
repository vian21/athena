import { FastifyInstance } from "fastify";
import db from "@api/plugins/db";
import logger from "@api/plugins/logger";

import { IParamsId, userSchema, User } from "@api/plugins/interfaces";
import { userSelect } from "@api/plugins/interfaces";

import { getUnique, getMany, deleteRows, updateRows, insertRows } from "@api/lib";

export default function users(
  server: FastifyInstance,
  _opts: object,
  done: any
) {
  server.get("/", async () => {
    return await getMany(userSelect, db.users, logger);
  });

  server.get<{ Params: IParamsId }>("/:id", async (req) => {
    try {
      const userId = userSchema
        .required({ id: true })
        .parse(req.params).id;
      return await getUnique(userId, userSelect, db.users, logger);
    } catch (error: any) {
      return { error: error.flatten() };
    }
  });

  server.delete<{ Params: IParamsId }>("/:id", async (req) => {
    try {
      const userId = userSchema
        .required({ id: true })
        .parse(req.params).id;

      return await deleteRows(userId, db.users, logger);
    } catch (error: any) {
      return { error: error.flatten() };
    }
  });

  server.patch<{ Params: IParamsId; Body: User }>("/:id", async (req) => {
    try {
      const userId = userSchema
        .required({ id: true })
        .parse(req.params).id;

      const newData = userSchema.omit({ id: true }).parse(req.body);

      return await updateRows(userId, newData, db.users, logger);
    } catch (error: any) {
      return { error: error.flatten() };
    }
  });

  server.post("/", async (req) => {
    try {
      const newData = userSchema
        .omit({ id: true })
        .required({
          first_name: true,
          last_name: true,
          DOB: true,
          gender: true,
          account_type: true,
        })
        .parse(req.body);

      return await insertRows(newData, db.users, logger);
    } catch (error: any) {
      return { error: error.flatten() };
    }
  });

  done();
}
