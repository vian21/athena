import { FastifyInstance } from "fastify";

import db from "@api/plugins/db";
import logger from "@api/plugins/logger";

import {
  IParamsId,
  IParamsIdSchema,
  schoolTransactionSchema,
  schoolTransaction,
  schoolTransactionSelect,
} from "@api/plugins/interfaces";

import { getUnique, getMany, deleteRows, updateRows, insertRows } from "@api/lib";
export default function schoolTransactions(
  server: FastifyInstance,
  _opts: object,
  done: any
) {
  server.get("/", async () => {
    return await getMany(schoolTransactionSelect, db.school_transactions, logger);
  });

  server.get<{ Params: IParamsId }>("/:id", async (req) => {
    try {
      const transactionId = IParamsIdSchema.parse(req.params).id;

      return await getUnique(transactionId, schoolTransactionSelect, db.school_transactions, logger);
    } catch (error: any) {
      return { error: error.flatten() };
    }
  });

  server.delete<{ Params: IParamsId }>("/:id", async (req) => {
    try {
      const transactionId = IParamsIdSchema.parse(req.params).id;

      return await deleteRows(transactionId, db.school_transactions, logger);
    } catch (error: any) {
      return { error: error.flatten() };
    }
  });

  server.patch<{ Params: IParamsId; Body: schoolTransaction }>(
    "/:id",
    async (req) => {
      try {
        const transactionId = schoolTransactionSchema
          .required({ id: true })
          .parse(req.params).id;
        const newData = schoolTransactionSchema
          .omit({ id: true })
          .parse(req.body);

        return await updateRows(
          transactionId,
          newData,
          db.school_transactions,
          logger
        );
      } catch (error: any) {
        return { error: error.flatten() };
      }
    }
  );

  server.post<{ Body: schoolTransaction }>("/", async (req) => {
    try {
      const newData = schoolTransactionSchema
        .omit({ id: true })
        .parse(req.body);

      return await insertRows(newData, db.school_transactions, logger);
    } catch (error: any) {
      return { error: error.flatten() };
    }
  });

  done();
}
