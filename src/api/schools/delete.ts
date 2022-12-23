import { PrismaClient } from "@prisma/client";
import { Logger } from "@api/plugins/interfaces";

export default async function deleteSchool(schoolId: number, db: PrismaClient, logger: Logger) {
    try {
        await db.schools.delete({
            where: {
                id: schoolId
            }
        });
        return { success: true };
    } catch (error: any) {
        logger.log(error.message);
        return { error: "Error deleting school" };
    }
}