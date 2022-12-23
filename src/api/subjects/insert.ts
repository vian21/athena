import { Logger } from "@api/plugins/interfaces";
import { PrismaClient } from "@prisma/client";



export default async function insertSubject(newData: any, db: PrismaClient, logger: Logger) {
    try {
        await db.subjects.create({
            data: newData,
        })

        return { success: true }
    }
    catch (error: any) {
        logger.log(error.message)
        return { error: "cannot create an subject" }
    }

}
