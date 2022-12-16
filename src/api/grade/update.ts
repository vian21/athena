import { Logger } from "@api/plugins/interfaces";
import { PrismaClient } from "@prisma/client";

async function updateGrades(school_id: number, newData: object, db: PrismaClient, logger: Logger) {
    try {
        const updateGrades = await db.grade.update({
            where: {
                id: school_id
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