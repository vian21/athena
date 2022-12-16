import db from "@api/plugins/db";
import logger from "@api/plugins/logger";

import { getGrades, getGrade } from "./get";
import { updateGrades } from "./update";

import { FastifyInstance } from "fastify";
import { PrismaClient, Prisma } from "@prisma/client";
import newGrade from "./insert";
import deleteGrades from "./delete";

interface school_id {
    id: number;
}

export default function Grades(
    server: FastifyInstance,
    _opts: object,
    done: any
) {
    server.get("/", async (_req, res) => {

        res.send(await getGrades(db, logger));
    });

    server.get<{ Params: school_id }>("/:id", async (req, res) => {
        const school_id = Number(req.params.id);

        res.send(await getGrade(school_id, db, logger));
    });

    server.delete("/:id", async (req, res) => {
        //get the params
        const school_id = Number(req.params.id);

        return await deleteGrades(school_id, db, logger);
    })

    server.patch("/:id/:name", async (req, res) => {
        //get the params
        const school_id = Number(req.params.id);
        const newData = req.body;

        return await updateGrades(school_id, newData, db, logger);

    });

    server.post("/", async (req, res) => {
        //get the params
        const newData = req.body;

        return await newGrade(newData, db, logger);

    });

    done();
}

