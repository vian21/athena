import { Logger } from "@api/plugins/interfaces";
import { PrismaClient } from "@prisma/client";

export default async function newSchool(schoolObject: any, db: PrismaClient, logger: Logger) {
    try {

        await db.schools.create({
            data: schoolObject,
        })

        return { success: true }
    }
    catch (error: any) {
        return { error: "Cannot Create school" }
    }

}