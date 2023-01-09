import db from "@api/plugins/db";
import logger from "@api/plugins/logger";

import {
    IParamsId,
    IParamsIdSchema,
    AcademicPeriod,
    academicPeriodSchema,
} from "@api/plugins/interfaces";

import { getAcademicPeriods, getAcademicPeriod } from "./get";
import { updateAcademicPeriod } from "./update";

import deleteAcademicPeriod from "./delete";

import newAcademicPeriod from "./insert";

import { FastifyInstance } from "fastify";

export default function academicPeriods(
    server: FastifyInstance,
    _opts: object,
    done: any
) {
    server.get("/", async () => {
        return await getAcademicPeriods(db, logger);
    });

    server.get<{ Params: IParamsId }>("/:id", async (req) => {
        try {
            const id = IParamsIdSchema.parse(req.params).id;
            return await getAcademicPeriod(id, db, logger);
        } catch (error: any) {
            return { error: error.flatten() };
        }
    });

    server.delete("/:id", async (req) => {
        try {
            const periodId = IParamsIdSchema.parse(req.params).id;

            return await deleteAcademicPeriod(periodId, db, logger);
        } catch (error: any) {
            return { error: error.flatten() };
        }
    });

    server.patch<{ Params: IParamsId; Body: AcademicPeriod }>(
        "/:id",
        async (req) => {
            try {
                const periodId = IParamsIdSchema.parse(req.params).id;
                const newData = academicPeriodSchema
                    .omit({ id: true })
                    .parse(req.body);

                return await updateAcademicPeriod(
                    periodId,
                    newData,
                    db,
                    logger
                );
            } catch (error: any) {
                return { error: error.flatten() };
            }
        }
    );

    server.post("/", async (req, res) => {
        try {
            const newData = academicPeriodSchema
                .omit({ id: true })
                .required({
                    start_date: true,
                    end_date: true,
                })
                .parse(req.body);

            return await newAcademicPeriod(newData, db, logger);
        } catch (error: any) {
            return { error: error.flatten() };
        }
    });

    done();
}
