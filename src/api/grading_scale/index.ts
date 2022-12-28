import { FastifyInstance } from "fastify";

import db from "@api/plugins/db";
import logger from "@api/plugins/logger";

import { IParamsId, IParamsIdSchema, gradingScaleSchema, GradingScale } from "@api/plugins/interfaces"

import { getGradingscales, getGradingscale } from "./get";
import deletegrading_scale from "./delete";
import newGradingscale from "./insert";
import updateGradingscale from "./update";


export default function gradingScale(
    server: FastifyInstance,
    _opts: object,
    done: any
) {
    server.get("/", async () => {

        return await getGradingscales(db, logger)
    });

    server.get<{ Params: IParamsId }>("/:id", async (req) => {
        try {
            const id = IParamsIdSchema.parse(req.params).id;

            return await getGradingscale(id, db, logger);
        } catch (error: any) {
            return { error: error.flatten() }
        }

    });
    server.delete<{ Params: IParamsId }>("/:id", async (req) => {

        try {
            const id = IParamsIdSchema.parse(req.params).id;

            return await deletegrading_scale(id, db, logger);
        } catch (error: any) {
            return { error: error.flatten() }
        }
    })
    server.post<{ Params: IParamsId, Body: GradingScale }>("/", async (req) => {
        try {
            const newData = gradingScaleSchema.omit({ id: true }).required({
                school_id: true,
                max: true,
                min: true,
                gpa: true,
                grade: true,
            }).parse(req.body);

            return await newGradingscale(newData, db, logger);

        } catch (error: any) {
            return { error: error.flatten() }
        }
    });
    server.patch<{ Params: IParamsId, Body: GradingScale }>("/:id", async (req) => {
        try {
            const id = IParamsIdSchema.parse(req.params).id;

            const newData = gradingScaleSchema.omit({ id: true }).parse(req.body);

            return await updateGradingscale(id, newData, db, logger);

        } catch (error: any) {
            return { error: error.flatten() }
        }

    });
    done();
}