import { Id, Logger } from "@api/plugins/interfaces";
import { PrismaClient } from "@prisma/client";

export default async function updateSubject(subjectId: Id, newData: object, db: PrismaClient, logger: Logger) {
    try {
        await db.subjects.update({
            where: {
                id: subjectId
            },
            data: newData
        });

        return { success: true };
    } catch (error: any) {
        logger.log(error.message);

        return { Error: "cannot update a subject" };
    }
}

