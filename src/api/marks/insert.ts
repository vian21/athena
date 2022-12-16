import { Logger } from "@api/plugins/interfaces";
import { PrismaClient } from "@prisma/client";

export default async function newMark(MarkObject: any, db: PrismaClient, logger: Logger) {
    try {

        const mark = await db.marks.create({
            data: markObject,
        })
        return { success: true }
    }
    catch (error: any) {
        return { error: "cannot Create mark" }
    }

}