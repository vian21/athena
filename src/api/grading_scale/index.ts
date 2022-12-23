import db from "@api/plugins/db";
import logger from "@api/plugins/logger";
import { getGradingscales, getGradingscale } from "./get";
import deletegrading_scale from "./delete";
import newGradingscale from "./insert";
import updateGradingscale from "./update";

import { FastifyInstance } from "fastify";

interface grading_scaleId {
    id: number;
}

export default function gradingScale(
    server: FastifyInstance,
    _opts: object,
    done: any
) {
    server.get("/", async () => {

        return await getGradingscales(db, logger)
    });

    server.get<{ Params: grading_scaleId }>("/:id", async (req) => {
        const grading_scaleId = Number(req.params.id);
        if (isNaN(grading_scaleId)) return {}

        return await getGradingscale(grading_scaleId, db, logger);
    });
    server.delete("/:id", async (req) => {
        const gradingscaleId = Number(req.params.id);
        if (isNaN(gradingscaleId)) return {}

        return await deletegrading_scale(gradingscaleId, db, logger);
    })
    server.post("/", async (req) => {
        const newData = req.body;

        return await newGradingscale(newData, db, logger);

    });
    server.patch("/:id", async (req) => {
        const grading_scaleId = Number(req.params.id);
        const newData = req.body;
        if (isNaN(grading_scaleId)) return {}

        return await updateGradingscale(grading_scaleId, newData, db, logger);

    });
    done();
}