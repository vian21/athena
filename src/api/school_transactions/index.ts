import { FastifyInstance } from "fastify";

import db from "@api/plugins/db";
import logger from "@api/plugins/logger";

import { IParamsId, IParamsIdSchema, schoolTransactionSchema, schoolTransaction } from "@api/plugins/interfaces"
import { getSchoolTransactions, getSchoolTransaction } from "./get";
import { updateSchoolTransaction } from "./update";
import deleteSchoolTransactions from "./delete";
import newschoolTransaction from "./insert";

export default function schoolTransactions(
    server: FastifyInstance,
    _opts: object,
    done: any
) {
    server.get("/", async () => {

        return await getSchoolTransactions(db, logger);
    });

    server.get<{ Params: IParamsId }>("/:id", async (req) => {
        try {
            const transactionId = IParamsIdSchema.parse(req.params).id;

            return await getSchoolTransaction(transactionId, db, logger);
        } catch (error: any) {
            return { error: error.flatten() }
        }

    });

    server.delete<{ Params: IParamsId }>("/:id", async (req) => {
        try {
            const transactionId = IParamsIdSchema.parse(req.params).id;

            return await deleteSchoolTransactions(transactionId, db, logger);
        } catch (error: any) {
            return { error: error.flatten() }
        }
    })

    server.patch<{ Params: IParamsId, Body: schoolTransaction }>("/:id", async (req) => {


        try {
            const transactionId = schoolTransactionSchema.required({ id: true }).parse(req.params).id;
            const newData = schoolTransactionSchema.omit({ id: true }).parse(req.body);

            return await updateSchoolTransaction(transactionId, newData, db, logger);
        } catch (error: any) {
            return { error: error.flatten() }
        }
    });

    server.post<{ Body: schoolTransaction }>("/", async (req) => {



        try {
            const newData = schoolTransactionSchema.omit({ id: true }).parse(req.body);

            return await newschoolTransaction(newData, db, logger);
        } catch (error: any) {
            return { error: error.flatten() }
        }

    });

    done();
}