import { FastifyInstance } from "fastify";

import db from "@api/plugins/db";
import logger from "@api/plugins/logger";

import {
    IParamsId,
    IParamsIdSchema,
    markSchema,
    Mark,
} from "@api/plugins/interfaces";

import { getMark, getMarks } from "./get";
import { updateMark } from "./update";

import deleteMark from "./delete";

import newMark from "./insert";

export default function marks(
    server: FastifyInstance,
    _opts: object,
    done: any
) {
    server.get("/", async () => {
        return await getMarks(db, logger);
    });

    server.get<{ Params: IParamsId }>("/:id", async (req) => {
        try {
            const markId = IParamsIdSchema.parse(req.params).id;

            return await getMark(markId, db, logger);
        } catch (error: any) {
            return { error: error.flatten() };
        }
    });

    server.delete<{ Params: IParamsId }>("/:id", async (req) => {
        try {
            const markId = IParamsIdSchema.parse(req.params).id;

            return await deleteMark(markId, db, logger);
        } catch (error: any) {
            return { error: error.flatten() };
        }
    });

    server.patch<{ Params: IParamsId; Body: Mark }>("/:id", async (req) => {
        try {
            const markId = IParamsIdSchema.parse(req.params).id;
            const newData = markSchema.omit({ id: true }).parse(req.body);

            return await updateMark(markId, newData, db, logger);
        } catch (error: any) {
            return { error: error.flatten() };
        }
    });
    server.post<{ Params: IParamsId; Body: Mark }>("/", async (req) => {
        try {
            const newData = markSchema.omit({ id: true }).parse(req.body);

            return await newMark(newData, db, logger);
        } catch (error: any) {
            return { error: error.flatten() };
        }
    });

    done();
}
