import { FastifyInstance } from "fastify";
import db from "@api/plugins/db";
import logger from "@api/plugins/logger";

import {
  IParamsId,
  IParamsIdSchema,
  AcademicPeriod,
  academicPeriodSchema,
  academicPeriodSelect,
} from "@api/plugins/interfaces";

import { getUnique, getMany, deleteRows, updateRows, insertRows } from "@api/lib";

export default function academicPeriods(
  server: FastifyInstance,
  _opts: object,
  done: any
) {
  server.get("/", async () => {
    return await getMany(academicPeriodSelect, db.academic_periods, logger);
  });

  server.get<{ Params: IParamsId }>("/:id", async (req) => {
    try {
      const id = IParamsIdSchema.parse(req.params).id;
      return await getUnique(id, academicPeriodSelect, db.academic_periods, logger);
    } catch (error: any) {
      return { error: error.flatten() };
    }
  });

  server.delete("/:id", async (req) => {
    try {
      const periodId = IParamsIdSchema.parse(req.params).id;

      return await deleteRows(periodId, db.academic_periods, logger);
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

        return await updateRows(
          periodId,
          newData,
          db.academic_periods,
          logger
        );
      } catch (error: any) {
        return { error: error.flatten() };
      }
    }
  );

  server.post("/", async (req, _res) => {
    try {
      const newData = academicPeriodSchema
        .omit({ id: true })
        .required({
          start_date: true,
          end_date: true,
        })
        .parse(req.body);

      return await insertRows(newData, db.academic_periods, logger);
    } catch (error: any) {
      return { error: error.flatten() };
    }
  });

  done();
}
