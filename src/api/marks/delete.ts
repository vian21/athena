import { PrismaClient } from "@prisma/client";
import { Logger } from "@api/plugins/interfaces";

export default async function deleteMark(markId: number, db: PrismaClient, logger: Logger) {
    try {
        const mark = await db.marks.delete({
            where: {
                id: markId
            }
        });
        return { success: true };
    } catch (error: any) {
        logger.log(error.message);
        return { error: "Error deleting mark" };
    }
}