import { PrismaClient } from "@prisma/client";
import { Logger } from "@api/plugins/interfaces";

export default async function deleteSubject(subjectId: number, db: PrismaClient, logger: Logger) {
    try {
        const subject = await db.subjects.delete({
            where: {
                id: subjectId
            }
        });
        return { success: true };
    } catch (error: any) {
        logger.log(error.message);
        return { error: "Error deleting subject" };
    }
}