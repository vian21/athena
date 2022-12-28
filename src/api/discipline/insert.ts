import { Logger } from "@api/plugins/interfaces";
import { PrismaClient } from "@prisma/client";

export default async function newDiscipline(disciplineObject: object, db: PrismaClient, logger: Logger) {
    try {

        await db.discipline.create({
            data: disciplineObject,
        })

        return { success: true }
    }
    catch (error: any) {
        return { error: "Cannot Create discipline" }
    }

}