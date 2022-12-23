import db from "@api/plugins/db";
import logger from "@api/plugins/logger";

import { getSchools, getSchool } from "./get";
import { updateSchool } from "./update";

import { FastifyInstance } from "fastify";
import deleteSchool from "./delete";
import newSchool from "./insert";

interface SchoolId {
    id: number;
}

export default function schools(
    server: FastifyInstance,
    _opts: object,
    done: any
) {
    server.get("/", async () => {
        return await getSchools(db, logger);

    });

    server.get<{ Params: SchoolId }>("/:id", async (req) => {
        const schoolId = Number(req.params.id);

        return await getSchool(schoolId, db, logger);
    });

    server.delete("/:id", async (req) => {
        const schoolId = Number(req.params.id);

        return await deleteSchool(schoolId, db, logger);
    })

    server.patch("/:id", async (req) => {

        const schoolId = Number(req.params.id);
        const newData = req.body;

        return await updateSchool(schoolId, newData, db, logger);

    });

    server.post("/", async (req, res) => {

        const newData = req.body;

        return await newSchool(newData, db, logger);

    });

    done();
}

