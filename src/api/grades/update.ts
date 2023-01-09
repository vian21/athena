import { Id, Logger } from "@api/plugins/interfaces";
import { PrismaClient } from "@prisma/client";

async function updateGrade(
    gradeId: Id,
    newData: object,
    db: PrismaClient,
    logger: Logger
) {
    try {
        await db.grades.update({
            where: {
                id: gradeId,
            },
            data: newData,
        });

        return { success: true };
    } catch (error: any) {
        logger.log(error.message);

        return { error: "Error updating Grades" };
    }
}
export { updateGrade };
