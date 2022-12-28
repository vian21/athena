import { Logger } from "@api/plugins/interfaces";
import { PrismaClient } from "@prisma/client";

export default async function newGrade(GradeObject: object, db: PrismaClient, logger: Logger) {
    try {

        await db.grades.create({
            data: GradeObject,
        })
        return { success: true }
    }
    catch (error: any) {
        return { error: "cannot Create Grade" }
    }

}