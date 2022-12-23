import { Logger } from "@api/plugins/interfaces";
import { PrismaClient } from "@prisma/client";

async function updateGrades(gradeId: number, newData: object, db: PrismaClient, logger: Logger) {
    try {
        await db.grade.update({
            where: {
                id: gradeId
            },
            data: newData
        });

        return { success: true };
    } catch (error: any) {
        logger.log(error.message);

        return { error: "Error updating Grades" };
    }
}
export {
    updateGrades
}