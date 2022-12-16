import { Logger } from "@api/plugins/interfaces";
import { PrismaClient } from "@prisma/client";

async function updateMark(markId: number, newData: object, db: PrismaClient, logger: Logger) {
    try {
        const updateMark = await db.marks.update({
            where: {
                id: markId
            },
            data: newData
        });

        return { success: true };
    } catch (error: any) {
        logger.log(error.message);

        return {};
    }
}
export {
    updateMark
}