import db from "@api/plugins/db";
import logger from "@api/plugins/logger";
import { accountingSchema, Accounting, IParamsId, accountingSelect } from "@api/plugins/interfaces";
import { FastifyInstance } from "fastify";

import { getUnique, getMany, deleteRows, updateRows, insertRows } from "@api/lib";

export default function accounting(
  server: FastifyInstance,
  _opts: object,
  done: any
) {
  server.get("/", async () => {
    return await getMany(accountingSelect, db.accounting, logger);
  });

  server.get<{ Params: IParamsId }>("/:id", async (req) => {
    const accountingId = Number(req.params.id);
    if (isNaN(accountingId)) return {};

    return await getUnique(accountingId, accountingSelect, db.accounting, logger);
  });

  server.patch<{ Params: IParamsId, Body: Accounting }>("/:id", async (req) => {
    const accountingId = Number(req.params.id);
    const newData = req.body;
    if (isNaN(accountingId)) return {};

    return await updateRows(accountingId, newData, db.accounting, logger);
  });

  server.delete<{ Params: IParamsId }>("/:id", async (req) => {
    const accountingId = Number(req.params.id);
    if (isNaN(accountingId)) return {};

    return await deleteRows(accountingId, db.accounting, logger);
  });
  server.post<{ Body: Accounting }>("/", async (req) => {
    const newData = req.body;

    return await insertRows(newData, db.accounting, logger);
  });

  done();
}
