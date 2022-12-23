import { PrismaClient } from "@prisma/client";
import { Logger } from "@api/plugins/interfaces";

export default async function deleteGrades(school_id: number, db: PrismaClient, logger: Logger) {
    try {
        await db.grade.delete({
            where: {
                id: school_id
            }
        });
        return { success: true };
    } catch (error: any) {
        logger.log(error.message);
        return { error: "Error deleting the Grades" };
    }
}