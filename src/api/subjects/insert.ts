import { Logger } from "@api/plugins/interfaces";
import { PrismaClient } from "@prisma/client";



export default async function insertSubject(subjectObject, db: PrismaClient, logger: Logger) {
    try {
        console.log(subjectObject)
        const subject = await db.subjects.create({
            data: subjectObject,
        })
        return { success: true }
    }
    catch (error: any) {
        logger.log(error.message)
        return { error: "cannot create an subject" }
    }

}


