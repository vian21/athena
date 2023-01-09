import { FastifyInstance } from "fastify";

import db from "@api/plugins/db";
import logger from "@api/plugins/logger";

import {
    IParamsId,
    IParamsIdSchema,
    schoolSchema,
    School,
} from "@api/plugins/interfaces";

import { getSchools, getSchool } from "./get";
import { updateSchool } from "./update";
import deleteSchool from "./delete";
import newSchool from "./insert";

export default function schools(
    server: FastifyInstance,
    _opts: object,
    done: any
) {
    server.get("/", async () => {
        return await getSchools(db, logger);
    });

    server.get<{ Params: IParamsId }>("/:id", async (req) => {
        try {
            const schoolId = IParamsIdSchema.parse(req.params).id;
            return await getSchool(schoolId, db, logger);
        } catch (error: any) {
            return { error: error.flatten() };
        }
    });

    server.delete<{ Params: IParamsId }>("/:id", async (req) => {
        try {
            const schoolId = IParamsIdSchema.parse(req.params).id;
            return await deleteSchool(schoolId, db, logger);
        } catch (error: any) {
            return { error: error.flatten() };
        }
    });

    server.patch<{ Params: IParamsId; Body: School }>("/:id", async (req) => {
        try {
            const schoolId = IParamsIdSchema.parse(req.params).id;
            const newData = schoolSchema.omit({ id: true }).parse(req.body);

            return await updateSchool(schoolId, newData, db, logger);
        } catch (error: any) {
            return { error: error.flatten() };
        }
    });

    server.post<{ Params: IParamsId; Body: School }>("/", async (req) => {
        try {
            const newData = schoolSchema.omit({ id: true }).parse(req.body);

            return await newSchool(newData, db, logger);
        } catch (error: any) {
            return { error: error.flatten() };
        }
    });

    done();
}
