import { Logger } from "@api/plugins/interfaces";
import { PrismaClient } from "@prisma/client";

export default async function newMark(MarkObject: any, db: PrismaClient, logger: Logger) {
    try {

        await db.marks.create({
            data: MarkObject,
        })
        return { success: true }
    }
    catch (error: any) {
        return { error: "cannot Create mark" }
    }

}