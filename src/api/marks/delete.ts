import { PrismaClient } from "@prisma/client";
import { Id, Logger } from "@api/plugins/interfaces";

export default async function deleteMark(
    markId: Id,
    db: PrismaClient,
    logger: Logger
) {
    try {
        await db.marks.delete({
            where: {
                id: markId,
            },
        });
        return { success: true };
    } catch (error: any) {
        logger.log(error.message);
        return { error: "Error deleting mark" };
    }
}
