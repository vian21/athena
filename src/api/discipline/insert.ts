import { Logger } from "@api/plugins/interfaces";
import { PrismaClient } from "@prisma/client";

export default async function newDiscipline(disciplineObject: any, db: PrismaClient, logger: Logger) {
    try {

        const discipline = await db.discipline.create({
            data: disciplineObject,
        })
        return { success: true }
    }
    catch (error: any) {
        return { error: "cannot Create discipline" }
    }

}